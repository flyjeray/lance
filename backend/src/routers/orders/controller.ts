import { VerifiedUserLocals } from '@lance/shared/models/api/auth';
import {
  APIResponse,
  PaginatedAPIResponse,
  SingleEntityGetPayload,
  SingleEntityGetPayloadSchema,
} from '@lance/shared/models/api/general';
import {
  CreateOrderPayload,
  ChangeOrdersClientPayload,
  GetFilteredOrdersPayload,
  ChangeOrdersStatusPayload,
  UpdateOrderPayload,
  GetFilteredOrdersPayloadSchema,
  CreateOrderPayloadSchema,
  UpdateOrderPayloadSchema,
  ChangeOrdersClientPayloadSchema,
  ChangeOrdersStatusPayloadSchema,
} from '@lance/shared/models/api/orders';
import { ClientModel } from '@lance/shared/models/client';
import { OrderBase, OrderModel } from '@lance/shared/models/order';
import { StatusModel } from '@lance/shared/models/status';
import { Request, Response } from 'express';
import { FilterQuery, Types } from 'mongoose';

export class OrdersController {
  static create = async (
    req: Request<object, object, CreateOrderPayload>,
    res: Response<APIResponse<OrderBase>, VerifiedUserLocals>
  ) => {
    try {
      const { title, description, client, price, status } =
        CreateOrderPayloadSchema.parse(req.body);
      const { user } = res.locals;
      const foundClient = await ClientModel.findOne({
        user_owner_id: user,
        _id: client,
      });

      if (!foundClient) {
        return res.status(404).json({ error: `Client ${client} not found` });
      }

      const order = new OrderModel({
        title,
        description,
        client_id: client,
        user_owner_id: user,
        price,
        status_id: status,
      });
      const saved = await order.save();
      return res.status(200).json({ data: saved });
    } catch (error) {
      return res.status(400).json({ error });
    }
  };

  static update = async (
    req: Request<object, object, UpdateOrderPayload>,
    res: Response<APIResponse<OrderBase>, VerifiedUserLocals>
  ) => {
    try {
      const { id, data } = UpdateOrderPayloadSchema.parse(req.body);
      const { user } = res.locals;
      const order = await OrderModel.findOne({
        _id: id,
        user_owner_id: user,
      });

      if (!order) {
        return res.status(404).json({ error: 'Order not found' });
      } else {
        order.description = data.description || order.description;
        order.title = data.title || order.title;
        await order.save();
        return res.status(200).json({ data: order });
      }
    } catch (error) {
      return res.status(400).json({ error });
    }
  };

  static get = async (
    req: Request<GetFilteredOrdersPayload>,
    res: Response<PaginatedAPIResponse<OrderBase[]>, VerifiedUserLocals>
  ) => {
    try {
      const {
        page = 1,
        perPage = 10,
        clientID,
        minPrice,
        maxPrice,
        statusID,
      } = GetFilteredOrdersPayloadSchema.parse(req.query);
      const { user } = res.locals;
      const _page = Number(page);
      const _perPage = Number(perPage);

      const conditions: FilterQuery<OrderBase> = {
        user_owner_id: user,
      };

      if (clientID) {
        conditions.client_id = clientID;
      }

      if (minPrice || maxPrice) {
        conditions.price = {};
        if (minPrice) conditions.price.$gte = Number(minPrice);
        if (maxPrice) conditions.price.$lte = Number(maxPrice);
      }

      if (statusID) {
        conditions.status_id = statusID;
      }

      const orders = await OrderModel.find(conditions)
        .skip((_page - 1) * _perPage)
        .limit(_perPage);
      const totalClients = await OrderModel.countDocuments();

      return res.status(200).json({
        data: orders,
        pagination: {
          total: totalClients,
          page: _page,
          perPage: _perPage,
          totalPages: Math.ceil(totalClients / _perPage),
        },
      });
    } catch (error) {
      return res.status(400).json({ error });
    }
  };

  static getSingle = async (
    req: Request<SingleEntityGetPayload>,
    res: Response<APIResponse<OrderBase>, VerifiedUserLocals>
  ) => {
    try {
      const { id } = SingleEntityGetPayloadSchema.parse(req.query);
      const { user } = res.locals;
      const order = await OrderModel.findOne({ user_owner_id: user, _id: id });

      if (order) {
        return res.status(200).json({
          data: order,
        });
      } else {
        return res.status(404).json({ error: 'Order not found' });
      }
    } catch (error) {
      return res.status(400).json({ error });
    }
  };

  static changeClient = async (
    req: Request<object, object, ChangeOrdersClientPayload>,
    res: Response<APIResponse<OrderBase>, VerifiedUserLocals>
  ) => {
    try {
      const { orderID, newClientID } = ChangeOrdersClientPayloadSchema.parse(
        req.body
      );
      const { user } = res.locals;
      const order = await OrderModel.findOne({
        _id: orderID,
        user_owner_id: user,
      });

      if (!order)
        return res.status(404).json({ error: `Order ${orderID} not found` });

      const client = await ClientModel.findOne({
        _id: newClientID,
        user_owner_id: user,
      });

      if (!client)
        return res
          .status(404)
          .json({ error: `Client ${newClientID} not found` });

      order.client_id = new Types.ObjectId(newClientID);
      const saved = await order.save();

      return res.status(200).json({ data: saved });
    } catch (error) {
      return res.status(400).json({ error });
    }
  };

  static changeStatus = async (
    req: Request<object, object, ChangeOrdersStatusPayload>,
    res: Response<APIResponse<OrderBase>, VerifiedUserLocals>
  ) => {
    try {
      const { orderID, newStatusID } = ChangeOrdersStatusPayloadSchema.parse(
        req.body
      );
      const { user } = res.locals;
      const order = await OrderModel.findOne({
        _id: orderID,
        user_owner_id: user,
      });

      if (!order)
        return res.status(404).json({ error: `Order ${orderID} not found` });

      const status = await StatusModel.findOne({
        _id: newStatusID,
        user_owner_id: user,
      });

      if (!status)
        return res
          .status(404)
          .json({ error: `Status ${newStatusID} not found` });

      order.status_id = new Types.ObjectId(newStatusID);
      const saved = await order.save();

      return res.status(200).json({ data: saved });
    } catch (error) {
      return res.status(400).json({ error });
    }
  };

  static delete = async (
    req: Request<SingleEntityGetPayload>,
    res: Response<APIResponse<string>, VerifiedUserLocals>
  ) => {
    try {
      const { id } = SingleEntityGetPayloadSchema.parse(req.query);
      const { user } = res.locals;
      const order = await OrderModel.findOne({
        _id: id,
        user_owner_id: user,
      });

      if (!order) {
        return res.status(404).json({ error: `Order ${id} not found` });
      }

      await OrderModel.deleteOne({ _id: order._id });

      return res.status(200).json({ data: 'success' });
    } catch (error) {
      return res.status(400).json({ error });
    }
  };
}

import { VerifiedUserLocals } from '@lance/shared/models/api/auth';
import {
  APIResponse,
  PaginatedAPIResponse,
  PaginationPayload,
  SingleEntityGetPayload,
} from '@lance/shared/models/api/general';
import {
  CreateOrderPayload,
  ChangeOrdersClientPayload,
  GetFilteredOrdersPayload,
} from '@lance/shared/models/api/orders';
import { ClientModel } from '@lance/shared/models/client';
import { OrderBase, OrderModel } from '@lance/shared/models/order';
import { Request, Response } from 'express';
import { FilterQuery, Types } from 'mongoose';

export class OrdersController {
  static create = async (
    req: Request<object, object, CreateOrderPayload>,
    res: Response<APIResponse<OrderBase>, VerifiedUserLocals>
  ) => {
    const { title, description, client, price } = req.body;
    const { user } = res.locals;

    try {
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
      });
      const saved = await order.save();
      return res.status(200).json({ data: saved });
    } catch (error) {
      return res.status(400).json({ error });
    }
  };

  static get = async (
    req: Request<GetFilteredOrdersPayload & PaginationPayload>,
    res: Response<PaginatedAPIResponse<OrderBase[]>, VerifiedUserLocals>
  ) => {
    const { page = 1, perPage = 10, clientID, minPrice, maxPrice } = req.query;
    const { user } = res.locals;

    try {
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
    const { id } = req.query;
    const { user } = res.locals;

    try {
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
    const { orderID, newClientID } = req.body;
    const { user } = res.locals;

    try {
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
}

import {
  APIResponse,
  PaginatedAPIResponse,
  PaginationPayload,
  SingleEntityGetPayload,
} from '@lance/shared/models/api/general';
import {
  CreateOrderPayload,
  ExtendedOrder,
} from '@lance/shared/models/api/orders';
import { ClientModel } from '@lance/shared/models/client';
import { OrderBase, OrderModel } from '@lance/shared/models/order';
import { Request, Response } from 'express';

export class OrdersController {
  static create = async (
    req: Request<object, object, CreateOrderPayload>,
    res: Response<APIResponse<OrderBase>>
  ) => {
    const { title, description, client } = req.body;

    try {
      const foundClient = await ClientModel.findById(client);

      if (!foundClient) {
        return res.status(404).json({ error: `Client ${client} not found` });
      }

      const order = new OrderModel({ title, description, client });
      const saved = await order.save();
      return res.status(200).json({ data: saved });
    } catch (error) {
      return res.status(400).json({ error });
    }
  };

  static get = async (
    req: Request<PaginationPayload>,
    res: Response<PaginatedAPIResponse<OrderBase[]>>
  ) => {
    const { page = 1, perPage = 10 } = req.query;

    try {
      const _page = Number(page);
      const _perPage = Number(perPage);

      const orders = await OrderModel.find()
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
    res: Response<APIResponse<ExtendedOrder>>
  ) => {
    const { id } = req.query;

    try {
      const order = await OrderModel.findById(id);

      if (order) {
        const client = await ClientModel.findById(order.client_id);

        if (!client) {
          return res
            .status(500)
            .json({ error: 'Order has no client bound to it' });
        }

        return res.status(200).json({
          data: {
            ...order.toObject(),
            client_data: {
              name: client.name,
            },
          },
        });
      } else {
        return res.status(404).json({ error: 'Order not found' });
      }
    } catch (error) {
      return res.status(400).json({ error });
    }
  };
}

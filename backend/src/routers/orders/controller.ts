import {
  APIResponse,
  PaginatedAPIResponse,
  PaginationPayload,
} from '@lance/shared/models/api/general';
import { CreateOrderPayload } from '@lance/shared/models/api/orders';
import { ClientModel } from '@lance/shared/models/client';
import { Order, OrderModel } from '@lance/shared/models/order';
import { Request, Response } from 'express';

export class OrdersController {
  static create = async (
    req: Request<object, object, CreateOrderPayload>,
    res: Response<APIResponse<Order>>
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
    req: Request<object, object, PaginationPayload>,
    res: Response<PaginatedAPIResponse<Order[]>>
  ) => {
    const { page = 1, perPage = 10 } = req.body;

    try {
      const clients = await OrderModel.find()
        .skip((page - 1) * perPage)
        .limit(perPage);
      const totalClients = await OrderModel.countDocuments();

      return res.status(200).json({
        data: clients,
        pagination: {
          total: totalClients,
          page: page,
          perPage: perPage,
          totalPages: Math.ceil(totalClients / perPage),
        },
      });
    } catch (error) {
      return res.status(400).json({ error });
    }
  };
}

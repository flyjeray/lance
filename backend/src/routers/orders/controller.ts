import {
  CreateOrderPayload,
  CreateOrderResponse,
} from '@lance/shared/models/api/orders';
import { ClientModel } from '@lance/shared/models/client';
import { OrderModel } from '@lance/shared/models/order';
import { Request, Response } from 'express';

export class OrdersController {
  static create = async (
    req: Request<object, object, CreateOrderPayload>,
    res: Response<CreateOrderResponse>
  ) => {
    const { title, description, client } = req.body;

    try {
      const foundClient = await ClientModel.findById(client);

      if (!foundClient) {
        return res
          .status(404)
          .json({ success: false, error: `Client ${client} not found` });
      }

      const order = new OrderModel({ title, description, client });
      const saved = await order.save();
      return res.status(200).json({ success: true, data: saved });
    } catch (error) {
      return res.status(400).json({ success: false, error });
    }
  };
}

import {
  CreateOrderPayload,
  CreateOrderResponse,
} from '@lance/shared/models/api/orders';
import { OrderModel } from '@lance/shared/models/order';
import { Request, Response } from 'express';

export class OrdersController {
  static create = async (
    req: Request<object, object, CreateOrderPayload>,
    res: Response<CreateOrderResponse>
  ) => {
    const { title, description } = req.body;

    try {
      const order = new OrderModel({ title, description });
      const saved = await order.save();
      return res.status(200).json({ success: true, data: saved });
    } catch (error) {
      return res.status(400).json({ success: false, error });
    }
  };
}

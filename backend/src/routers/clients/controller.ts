import {
  CreateClientPayload,
  CreateClientResponse,
} from '@lance/shared/models/api/clients';
import { ClientModel } from '@lance/shared/models/client';
import { Request, Response } from 'express';

export class ClientsController {
  static create = async (
    req: Request<object, object, CreateClientPayload>,
    res: Response<CreateClientResponse>
  ) => {
    const { name } = req.body;

    try {
      const client = new ClientModel({ name });
      const saved = await client.save();
      return res.status(200).json({ success: true, data: saved });
    } catch (error) {
      return res.status(400).json({ success: false, error });
    }
  };
}

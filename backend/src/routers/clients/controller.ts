import { CreateClientPayload } from '@lance/shared/models/api/clients';
import {
  APIResponse,
  PaginatedAPIResponse,
  PaginationPayload,
} from '@lance/shared/models/api/general';
import { Client, ClientModel } from '@lance/shared/models/client';
import { Request, Response } from 'express';

export class ClientsController {
  static create = async (
    req: Request<object, object, CreateClientPayload>,
    res: Response<APIResponse<Client>>
  ) => {
    const { name } = req.body;

    try {
      const client = new ClientModel({ name });
      const saved = await client.save();
      return res.status(200).json({ data: saved });
    } catch (error) {
      return res.status(400).json({ error });
    }
  };

  static get = async (
    req: Request<object, object, PaginationPayload>,
    res: Response<PaginatedAPIResponse<Client[]>>
  ) => {
    const { page = 1, perPage = 10 } = req.body;

    try {
      const clients = await ClientModel.find()
        .skip((page - 1) * perPage)
        .limit(perPage);
      const totalClients = await ClientModel.countDocuments();

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

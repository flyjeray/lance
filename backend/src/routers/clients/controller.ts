import { CreateClientPayload } from '@lance/shared/models/api/clients';
import {
  APIResponse,
  PaginatedAPIResponse,
  PaginationPayload,
  SingleEntityGetPayload,
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

  static getPaginated = async (
    req: Request<PaginationPayload>,
    res: Response<PaginatedAPIResponse<Client[]>>
  ) => {
    const { page = 1, perPage = 10 } = req.query;

    try {
      const _page = Number(page);
      const _perPage = Number(perPage);

      const clients = await ClientModel.find()
        .skip((_page - 1) * _perPage)
        .limit(_perPage);
      const totalClients = await ClientModel.countDocuments();

      return res.status(200).json({
        data: clients,
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
    res: Response<APIResponse<Client>>
  ) => {
    const { id } = req.query;

    try {
      const client = await ClientModel.findById(id);

      if (client) {
        return res.status(200).json({ data: client });
      } else {
        return res.status(404).json({ error: 'Client not found' });
      }
    } catch (error) {
      return res.status(400).json({ error });
    }
  };
}

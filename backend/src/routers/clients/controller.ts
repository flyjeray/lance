import { VerifiedUserLocals } from '@lance/shared/models/api/auth';
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
    res: Response<APIResponse<Client>, VerifiedUserLocals>
  ) => {
    const { name } = req.body;
    const { user } = res.locals;

    try {
      const client = new ClientModel({ name, user_owner_id: user });
      const saved = await client.save();
      return res.status(200).json({ data: saved });
    } catch (error) {
      return res.status(400).json({ error });
    }
  };

  static getPaginated = async (
    req: Request<PaginationPayload>,
    res: Response<PaginatedAPIResponse<Client[]>, VerifiedUserLocals>
  ) => {
    const { page = 1, perPage = 10 } = req.query;
    const { user } = res.locals;

    try {
      const _page = Number(page);
      const _perPage = Number(perPage);

      const clients = await ClientModel.find({ user_owner_id: user })
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
    res: Response<APIResponse<Client>, VerifiedUserLocals>
  ) => {
    const { id } = req.query;
    const { user } = res.locals;

    try {
      const client = await ClientModel.findOne({
        user_owner_id: user,
        _id: id,
      });

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

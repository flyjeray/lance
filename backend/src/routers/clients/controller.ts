import { VerifiedUserLocals } from '@lance/shared/models/api/auth';
import {
  ClientNameDictionary,
  CreateClientPayload,
  CreateClientPayloadSchema,
  GetClientOrdersPayload,
  GetClientOrdersPayloadSchema,
  UpdateClientPayload,
} from '@lance/shared/models/api/clients';
import {
  APIResponse,
  PaginatedAPIResponse,
  PaginationPayload,
  PaginationPayloadSchema,
  SingleEntityGetPayload,
  SingleEntityGetPayloadSchema,
} from '@lance/shared/models/api/general';
import { Client, ClientModel } from '@lance/shared/models/client';
import { OrderBase, OrderModel } from '@lance/shared/models/order';
import { Request, Response } from 'express';

export class ClientsController {
  static create = async (
    req: Request<object, object, CreateClientPayload>,
    res: Response<APIResponse<Client>, VerifiedUserLocals>
  ) => {
    try {
      const { name } = CreateClientPayloadSchema.parse(req.body);
      const { user } = res.locals;
      const client = new ClientModel({ name, user_owner_id: user });
      const saved = await client.save();
      return res.status(200).json({ data: saved });
    } catch (error) {
      return res.status(400).json({ error });
    }
  };

  static update = async (
    req: Request<object, object, UpdateClientPayload>,
    res: Response<APIResponse<Client>, VerifiedUserLocals>
  ) => {
    const { id, data } = req.body;
    const { user } = res.locals;

    try {
      const client = await ClientModel.findOne({
        _id: id,
        user_owner_id: user,
      });

      if (!client) {
        return res.status(404).json({ error: 'Client not found' });
      } else {
        client.description = data.description || client.description;
        client.name = data.name || client.name;
        await client.save();
        return res.status(200).json({ data: client });
      }
    } catch (error) {
      return res.status(400).json({ error });
    }
  };

  static getPaginated = async (
    req: Request<PaginationPayload>,
    res: Response<PaginatedAPIResponse<Client[]>, VerifiedUserLocals>
  ) => {
    try {
      const { page = 1, perPage = 10 } = PaginationPayloadSchema.parse(
        req.query
      );
      const { user } = res.locals;
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
    try {
      const { id } = SingleEntityGetPayloadSchema.parse(req.query);
      const { user } = res.locals;
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

  static getNameDictionary = async (
    _: Request,
    res: Response<APIResponse<ClientNameDictionary>, VerifiedUserLocals>
  ) => {
    try {
      const { user } = res.locals;

      const clients = await ClientModel.find({ user_owner_id: user });

      const names: Record<string, string> = {};
      clients.forEach((c) => {
        names[c._id.toString()] = c.name;
      });

      return res.status(200).json({ data: names });
    } catch (error) {
      return res.status(400).json({ error });
    }
  };

  static getOrders = async (
    req: Request<GetClientOrdersPayload>,
    res: Response<PaginatedAPIResponse<OrderBase[]>, VerifiedUserLocals>
  ) => {
    try {
      const { id, page, perPage } = GetClientOrdersPayloadSchema.parse(
        req.query
      );
      const { user } = res.locals;
      const _page = Number(page);
      const _perPage = Number(perPage);

      const orders = await OrderModel.find({
        user_owner_id: user,
        client_id: id,
      })
        .skip((_page - 1) * _perPage)
        .limit(_perPage);
      const totalOrders = await OrderModel.countDocuments();

      return res.status(200).json({
        data: orders,
        pagination: {
          total: totalOrders,
          page: _page,
          perPage: _perPage,
          totalPages: Math.ceil(totalOrders / _perPage),
        },
      });
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
      const client = await ClientModel.findOne({
        _id: id,
        user_owner_id: user,
      });

      if (!client) {
        return res.status(404).json({ error: `Client ${id} not found` });
      }

      await OrderModel.deleteMany({ client_id: client._id });
      await ClientModel.deleteOne({ _id: client._id });

      return res.status(200).json({ data: 'success' });
    } catch (error) {
      return res.status(400).json({ error });
    }
  };
}

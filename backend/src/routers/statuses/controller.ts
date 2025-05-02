import { Request, Response } from 'express';
import {
  CreateStatusPayload,
  DeleteStatusPayload,
} from '@lance/shared/models/api/statuses';
import { Status, StatusModel } from '@lance/shared/models/status';
import { APIResponse } from '@lance/shared/models/api/general';
import { VerifiedUserLocals } from '@lance/shared/models/api/auth';
import { OrderModel } from '@lance/shared/models/order';

export class StatusesController {
  static create = async (
    req: Request<object, object, CreateStatusPayload>,
    res: Response<APIResponse<Status>, VerifiedUserLocals>
  ) => {
    const { label } = req.body;
    const { user } = res.locals;

    try {
      const status = new StatusModel({
        label,
        user_owner_id: user,
      });

      const saved = await status.save();

      return res.status(200).json({ data: saved });
    } catch (error) {
      return res.status(400).json({ error });
    }
  };

  static get = async (
    _: Request,
    res: Response<APIResponse<Status[]>, VerifiedUserLocals>
  ) => {
    const { user } = res.locals;

    try {
      const list = await StatusModel.find({ user_owner_id: user });
      return res.status(200).json({ data: list });
    } catch (error) {
      return res.status(400).json({ error });
    }
  };

  static delete = async (
    req: Request<DeleteStatusPayload>,
    res: Response<APIResponse<string>, VerifiedUserLocals>
  ) => {
    const { id, replacement_id } = req.query;
    const { user } = res.locals;

    if (id === replacement_id) {
      return res
        .status(422)
        .json({ error: 'IDs of statuses cannot be the same' });
    }

    try {
      const status = await StatusModel.findOne({
        _id: id,
        user_owner_id: user,
      });

      if (!status) {
        return res.status(404).json({ error: `Status ${id} not found` });
      }

      const replacement_status = await StatusModel.findOne({
        _id: replacement_id,
        user_owner_id: user,
      });

      if (!replacement_status) {
        return res
          .status(404)
          .json({ error: `Replacement status ${replacement_id} not found` });
      }

      await OrderModel.updateMany(
        { status_id: id },
        { status_id: replacement_id }
      );

      await StatusModel.deleteOne({ _id: status._id });

      return res.status(200).json({ data: 'success' });
    } catch (error) {
      return res.status(400).json({ error });
    }
  };
}

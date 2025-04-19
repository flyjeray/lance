import { Request, Response } from 'express';
import { CreateStatusPayload } from '@lance/shared/models/api/statuses';
import { Status, StatusModel } from '@lance/shared/models/status';
import { APIResponse } from '@lance/shared/models/api/general';
import { VerifiedUserLocals } from '@lance/shared/models/api/auth';

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
}

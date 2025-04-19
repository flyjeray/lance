import { Document, Schema, Types, model } from 'mongoose';

export type Status = {
  _id: Types.ObjectId;
  label: string;
  user_owner_id: Types.ObjectId;
};

type StatusDocument = Document & Status;

const statusSchema = new Schema<StatusDocument>({
  label: {
    type: String,
    required: true,
  },
  user_owner_id: {
    type: Schema.Types.ObjectId,
    ref: 'users',
    required: true,
  },
});

const StatusModel = model<StatusDocument>('statuses', statusSchema);

export { StatusModel };

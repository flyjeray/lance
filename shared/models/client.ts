import { Document, Schema, Types, model } from 'mongoose';

export type Client = {
  _id: Types.ObjectId;
  name: string;
  description: string;
  user_owner_id: Types.ObjectId;
};

type ClientDocument = Document & Client;

const clientSchema = new Schema<ClientDocument>({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  user_owner_id: {
    type: Schema.Types.ObjectId,
    ref: 'users',
    required: true,
  },
});

const ClientModel = model<ClientDocument>('clients', clientSchema);

export { ClientModel };

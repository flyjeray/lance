import { Document, Schema, Types, model } from 'mongoose';

export type Client = {
  _id: Types.ObjectId;
  name: string;
  description: string;
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
});

const ClientModel = model<ClientDocument>('clients', clientSchema);

export { ClientModel };

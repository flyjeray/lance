import { Document, Schema, model } from 'mongoose';

export type Client = {
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

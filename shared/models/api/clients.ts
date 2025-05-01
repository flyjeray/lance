import { Client } from '../client';
import { SingleEntityGetPayload } from './general';

export type CreateClientPayload = {
  name: string;
};

export type ClientNameDictionary = Record<string, string>;

export type UpdateClientPayload = SingleEntityGetPayload & {
  data: Partial<Omit<Client, '_id' | 'user_owner_id'>>;
};

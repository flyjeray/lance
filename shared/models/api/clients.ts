import { APIResponse } from './general';
import { Client } from '../client';

export type CreateClientPayload = {
  name: string;
};

export type CreateClientResponse = APIResponse<Order>;

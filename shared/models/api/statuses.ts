import { SingleEntityGetPayload } from './general';

export type CreateStatusPayload = {
  label: string;
};

export type DeleteStatusPayload = SingleEntityGetPayload & {
  replacement_id: string;
};

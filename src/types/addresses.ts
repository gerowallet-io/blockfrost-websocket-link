import { Responses } from '@blockfrost/blockfrost-js';

export interface Balance {
  unit: string;
  quantity: string;
}

export type Type = 1 | 0;

export type Bundle = {
  address: string;
  promise: Promise<Responses['address_content']>;
}[];

import { Balance, AddressData } from './address';
import { TxIdsToTransactionsResponse } from './transactions';

export interface ServerInfo {
  name: string;
  shortcut: string;
  testnet: boolean;
  version: string;
  decimals: number;
  blockHeight: number;
  blockHash: string;
}

export type BlockHash = string;

type Transactions = TxIdsToTransactionsResponse[];
export interface AssetBalance extends Balance {
  fingerprint?: string; // lovelace has no fingerprint
  decimals: number;
}

export interface AccountInfo {
  balance: string;
  addresses?: {
    change: AddressData[];
    used: AddressData[];
    unused: AddressData[];
  };
  empty: boolean;
  availableBalance: string;
  descriptor: string;
  tokens?: AssetBalance[];
  history: {
    total: number; // total transactions
    tokens?: number; // tokens transactions
    unconfirmed: number; // unconfirmed transactions
    transactions?: Transactions; // list of transactions
    txids?: string[];
  };
  page: {
    size: number;
    total: number;
    index: number;
  };
  misc: {
    staking: {
      address: string;
      isActive: boolean;
      rewards: string;
      poolId: string | null;
    };
  };
}

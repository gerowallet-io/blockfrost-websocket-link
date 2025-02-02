export const REPOSITORY_URL = 'https://github.com/blockfrost/websocket-link';

export const MESSAGES = {
  GET_SERVER_INFO: 'GET_SERVER_INFO',
  GET_ACCOUNT_INFO: 'GET_ACCOUNT_INFO',
  GET_ACCOUNT_UTXO: 'GET_ACCOUNT_UTXO',
  GET_TRANSACTION: 'GET_TRANSACTION',
  GET_BALANCE_HISTORY: 'GET_BALANCE_HISTORY',
  GET_BLOCK: 'GET_BLOCK',
  GET_LATEST_BLOCK: 'GET_LATEST_BLOCK',
  ESTIMATE_FEE: 'ESTIMATE_FEE',

  SUBSCRIBE_BLOCK: 'SUBSCRIBE_BLOCK',
  UNSUBSCRIBE_BLOCK: 'UNSUBSCRIBE_BLOCK',
  SUBSCRIBE_ADDRESS: 'SUBSCRIBE_ADDRESS',
  UNSUBSCRIBE_ADDRESS: 'UNSUBSCRIBE_ADDRESS',

  PUSH_TRANSACTION: 'PUSH_TRANSACTION',

  ERROR: 'ERROR',
  CONNECT: 'CONNECT',
} as const;

export const MESSAGES_RESPONSE = {
  SERVER_INFO: 'SERVER_INFO',
  LATEST_BLOCK: 'LATEST_BLOCK',
  ACCOUNT_INFO: 'ACCOUNT_INFO',
  BALANCE_HISTORY: 'BALANCE_HISTORY',
  ACCOUNT_UTXO: 'ACCOUNT_UTXO',
  TRANSACTION: 'TRANSACTION',
  BLOCK: 'BLOCK',
  NOTIFICATION: 'NOTIFICATION',

  PUSH_TRANSACTION: 'PUSH_TRANSACTION',

  ERROR: 'ERROR',
  CONNECT: 'CONNECT',
} as const;

export const ADDRESS_GAP_LIMIT = 20;

export const WELCOME_MESSAGE = `Hello there! see: <a href="${REPOSITORY_URL}">${REPOSITORY_URL}</a>`;

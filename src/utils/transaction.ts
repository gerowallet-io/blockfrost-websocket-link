import { Responses } from '@blockfrost/blockfrost-js';
import { blockfrostAPI } from '../utils/blockfrostAPI';

export const txIdsToTransactions = async (
  addresses: {
    address: string;
    data: string[];
  }[],
): Promise<{ address: string; data: Responses['tx_content'] }[]> => {
  const promisesBundle: {
    address: string;
    promise: Promise<Responses['tx_content']>;
  }[] = [];

  const result: {
    address: string;
    data: Responses['tx_content'];
  }[] = [];

  addresses.map(item => {
    item.data.map(hash => {
      const promise = blockfrostAPI.txs(hash);
      promisesBundle.push({ address: item.address, promise });
    });
  });

  await Promise.all(
    promisesBundle.map(p =>
      p.promise
        .then(data => {
          result.push({ address: p.address, data });
        })
        .catch(err => {
          if (err.status === 404) {
            return;
          }
          throw Error(err);
        }),
    ),
  );

  const sortedTxs = result.sort(
    (first, second) => first.data.block_height - second.data.block_height,
  );

  return sortedTxs;
};

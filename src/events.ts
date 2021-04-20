import EventEmitter from 'events';
import { blockfrost } from './utils/blockfrostAPI';
import { Responses } from '@blockfrost/blockfrost-js';

const events = new EventEmitter();

let previousBlock: null | Responses['block_content'] = null;

setInterval(async () => {
  const latestBlock = await blockfrost.blocksLatest();

  if (!previousBlock || previousBlock.hash !== latestBlock.hash) {
    previousBlock = latestBlock;
    events.emit('NEW_BLOCK', latestBlock);
  }
}, 1000);

export { events };

import sinon from 'sinon';
import { blockfrostAPI } from 'utils/blockfrostAPI';
import { emitBlock, events, _resetPreviousBlock } from '../../../../src/events';
import * as fixtures from '../../fixtures/events';

describe('events', () => {
  fixtures.emitBlock.forEach(fixture => {
    test(fixture.description, async () => {
      // @ts-ignore
      const mock1 = sinon.stub(blockfrostAPI, 'blocksLatest').resolves(fixture.blocks[0]);
      const callback = jest.fn();
      events.on('newBlock', callback);
      await emitBlock();
      mock1.restore();
      events.removeAllListeners();
      _resetPreviousBlock();
      expect(callback).toBeCalledTimes(1);
      expect(callback).toHaveBeenCalledWith(fixture.blocks[0]);
    });
  });

  fixtures.emitMissedBlock.forEach(fixture => {
    test(fixture.description, async () => {
      const mock1 = sinon.stub(blockfrostAPI, 'blocks');
      mock1
        .onCall(0)
        // @ts-ignore
        .resolves(fixture.missedBlocks[0]);
      mock1
        .onCall(1)
        // @ts-ignore
        .resolves(fixture.missedBlocks[1]);
      const mock2 = sinon.stub(blockfrostAPI, 'blocksLatest');
      mock2
        .onCall(0)
        // @ts-ignore
        .resolves(fixture.latestBlocks[0]);
      mock2
        .onCall(1)
        // @ts-ignore
        .resolves(fixture.latestBlocks[1]);
      const callback = jest.fn();
      events.on('newBlock', callback);

      await emitBlock();
      expect(callback).toBeCalledTimes(1);
      expect(callback).toHaveBeenNthCalledWith(1, fixture.latestBlocks[0]);

      await emitBlock();
      expect(callback).toBeCalledTimes(4); // one time from the first emit, 3 times from 2nd emit (2 missed blocks + latest)
      expect(callback).toHaveBeenNthCalledWith(2, fixture.missedBlocks[0]);
      expect(callback).toHaveBeenNthCalledWith(3, fixture.missedBlocks[1]);
      expect(callback).toHaveBeenNthCalledWith(4, fixture.latestBlocks[1]);
      mock1.restore();
      mock2.restore();
      events.removeAllListeners();
      _resetPreviousBlock();
    });

    test(`${fixture.description} - timeout test`, async () => {
      const blockLatestMock = sinon.stub(blockfrostAPI, 'blocksLatest');
      blockLatestMock
        .onCall(0)
        // @ts-ignore
        .resolves(fixture.latestBlocks[0]);
        blockLatestMock
        .onCall(1)
        // @ts-ignore
        .resolves(fixture.latestBlocks[1]);
      const callback = jest.fn();
      events.on('newBlock', callback);

      const blockMock = sinon.stub(blockfrostAPI, 'blocks');
      blockMock
        .onCall(0)
        // @ts-ignore
        .resolves(fixture.missedBlocks[0]);
        blockMock
        .onCall(1)
        .returns(
          new Promise(resolve => {
            setTimeout(() => {
              // @ts-ignore
              resolve(fixture.missedBlocks[1]);
            }, 5000);
          }),
        ); // delay 2nd response by 5s, which should trigger timeout

      await emitBlock();
      expect(callback).toBeCalledTimes(1);
      expect(callback).toHaveBeenNthCalledWith(1, fixture.latestBlocks[0]);

      await emitBlock({fetchTimeoutMs: 4000});
      expect(callback).toBeCalledTimes(3); // one time from the first emit, 3 times from 2nd emit (2 missed blocks + latest)
      expect(callback).toHaveBeenNthCalledWith(2, fixture.missedBlocks[0]);
      expect(callback).toHaveBeenNthCalledWith(3, fixture.latestBlocks[1]);
      blockLatestMock.restore();
      blockMock.restore();
      events.removeAllListeners();
      _resetPreviousBlock();
    });
  });
});

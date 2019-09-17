import AsyncData from './AsyncData';
import { when } from 'mobx';

function getTestHelper() {
  const ret = {
    resolveVal: 0,
    rejectVal: 0,
    process: () => {
      return new Promise<number>((resolve, reject) => {
        setTimeout(() => (ret.resolveVal ? resolve(ret.resolveVal) : reject(ret.rejectVal)), 10);
      });
    }
  };
  return ret;
}

function expectNoError(d: AsyncData<number>) {
  expect(d.error).toBeUndefined();
  expect(d.errorTimestamp).toBeUndefined();
}

function expectNoResult(d: AsyncData<number>) {
  expect(d.lastSuccessTimestamp).toBeUndefined();
  expect(d.data).toBeUndefined();
}

function expectSuccess(d: AsyncData<number>, helper: ReturnType<typeof getTestHelper>) {
  expect(typeof d.lastSuccessTimestamp).toBe('number');
  expect(Date.now() - Number(d.lastSuccessTimestamp)).toBeLessThan(100);
  expect(d.data).toBe(helper.resolveVal);
}
// This is a one big test to make sure previous calls do not break logic
test('Async data', async () => {
  const helper = getTestHelper();
  const d = new AsyncData<number>();

  //--- Initial data
  expectNoError(d);
  expectNoResult(d);
  expect(d.loading).toBeFalse();
  expect(d.loadedOnce).toBeFalse();

  //--- 1. Regular case
  helper.resolveVal = 1;
  d.load(helper.process);
  // before loading is finished
  expectNoError(d);
  expectNoResult(d);
  expect(d.loading).toBeTrue();
  expect(d.loadedOnce).toBeFalse();

  await when(() => !d.loading);
  // after loading is finished
  expectNoError(d);
  expectSuccess(d, helper);
  expect(d.loading).toBeFalse();
  expect(d.loadedOnce).toBeTrue();
  //--------------------------

  //--- 2. Calling again while already loading
  d.load(helper.process);
  expect(d.loading).toBeTrue();
  d.load(helper.process);
  // before loading is finished
  expectNoError(d);
  expectSuccess(d, helper);
  expect(d.loading).toBeTrue();
  expect(d.loadedOnce).toBeTrue();
  helper.resolveVal = 2;

  await when(() => !d.loading);
  // after loading is finished
  expectNoError(d);
  expectSuccess(d, helper);
  expect(d.loading).toBeFalse();
  expect(d.loadedOnce).toBeTrue();
  expect(d.requestId).toBe(2);
  //---------------------------

  //--- 2. Calling again forced while already loading
  d.load(helper.process);
  expect(d.loading).toBeTrue();
  d.load(helper.process, true);
  // before loading is finished
  expectNoError(d);
  expectSuccess(d, helper);
  expect(d.loading).toBeTrue();
  expect(d.loadedOnce).toBeTrue();
  helper.resolveVal = 3;

  await when(() => !d.loading);
  // after loading is finished
  expectNoError(d);
  expectSuccess(d, helper);
  expect(d.loading).toBeFalse();
  expect(d.loadedOnce).toBeTrue();
  expect(d.requestId).toBe(4);
  //---------------------------

  //--- 4. Error case (process throws non-Error)
  helper.resolveVal = 0;
  helper.rejectVal = 1;
  d.load(helper.process);
  await when(() => !d.loading);

  expect(d.error instanceof Error).toBeTrue();
  expect(typeof d.errorTimestamp).toBe('number');
  expect(Date.now() - Number(d.errorTimestamp)).toBeLessThan(100);
  expect(typeof d.lastSuccessTimestamp).toBe('number');
  expect(Date.now() - Number(d.lastSuccessTimestamp)).toBeLessThan(d.errorTimestamp!);
  expect(d.loading).toBeFalse();
  expect(d.loadedOnce).toBeTrue();
  expect(d.requestId).toBe(5);

  //---------------------------

  //--- 5. Error case (process throws Error instance)
  //@ts-ignore
  helper.rejectVal = new Error('1');
  d.load(helper.process);
  await when(() => !d.loading);

  expect(d.error instanceof Error).toBeTrue();
  expect(typeof d.errorTimestamp).toBe('number');
  expect(Date.now() - Number(d.errorTimestamp)).toBeLessThan(100);
  expect(typeof d.lastSuccessTimestamp).toBe('number');
  expect(Date.now() - Number(d.lastSuccessTimestamp)).toBeLessThan(d.errorTimestamp!);
  expect(d.loading).toBeFalse();
  expect(d.loadedOnce).toBeTrue();
  expect(d.requestId).toBe(6);

  //---------------------------

  //--- 6. success after error case
  helper.rejectVal = 0;
  helper.resolveVal = 1;
  d.load(helper.process);
  await when(() => !d.loading);

  expectNoError(d);
  expectSuccess(d, helper);
  expect(d.loading).toBeFalse();
  expect(d.loadedOnce).toBeTrue();
  //---------------------------

  //--- Finally checking total request count
  expect(d.requestId).toBe(7);
});

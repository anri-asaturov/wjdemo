import * as flags from './runtime';

test('runtime flags', () => {
  expect(flags.isTest).toBe(true);
  expect(flags.isDevBuild).toBe(true);
  expect(flags.isProdBuild).toBe(false);

  expect(flags.isLocalDevRuntime).toBe(true);
  expect(flags.isDevRuntime).toBe(false);
  expect(flags.isProdRuntime).toBe(false);
  expect(flags.isUATRuntime).toBe(false);
});

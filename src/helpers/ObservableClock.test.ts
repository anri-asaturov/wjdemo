import ObservableClock from './ObservableClock';
import { autorun } from 'mobx';

jest.mock('../config');
const config = require('../config');
config.clockUpdateInterval = 100;

test('Observable clock', () => {
  let resolve: () => void;
  const ret = new Promise(r => (resolve = r));
  const clock = new ObservableClock();
  expect(Date.now() - clock.timestamp).toBeLessThan(config.clockUpdateInterval); // this tests unobserved clock
  let callCount = 0;
  const dispose = autorun(() => {
    expect(Date.now() - clock.timestamp).toBeLessThan(config.clockUpdateInterval);
    if (callCount++ == 3) {
      dispose();
      resolve();
    }
  });
  return ret;
});

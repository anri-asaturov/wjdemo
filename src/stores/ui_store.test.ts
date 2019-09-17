import App from '../app';
import { ScreenClassType } from '../ui/grid/media';

test('screenClass property and related computeds', () => {
  const store = new App().stores.ui;
  expect(store.screenClass).toBe('md');
  expect(store.isMobileScreen).toBe(false);
  expect(store.isDesktopScreen).toBe(true);
  [['xs', true], ['sm', false], ['md', false], ['lg', false], ['xl', false]].forEach(testCase => {
    store.screenClass = testCase[0] as ScreenClassType;
    expect(store.screenClass).toBe(testCase[0]);
    expect(store.isMobileScreen).toBe(testCase[1]);
    expect(store.isDesktopScreen).toBe(!store.isMobileScreen);
  });
});

test('clocks', () => {
  const store = new App().stores.ui;
  expect(store.websiteClock.zoneName).toBe('America/Los_Angeles');
  expect(store.userClock.offset).toBe(-new Date().getTimezoneOffset() || 0);
});

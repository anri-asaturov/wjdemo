import App from '../app';

test('window reload', async () => {
  const app = new App();
  const fnMock = jest.fn();
  window.location.reload = fnMock;
  app.effects.browser.reloadWindow();
  expect(fnMock.mock.calls.length).toBe(1);
});

test('local storage', () => {
  const app = new App();
  const browser = app.effects.browser;
  expect(browser.getLocalStorageItem('prefix', 'test')).toBeNull();
  browser.setLocalStorageItem('prefix', 'test', { a: 1 });
  expect(browser.getLocalStorageItem('prefix', 'test')).toEqual({ a: 1 });
  browser.setLocalStorageItem('prefix', 'test', { a: 2 });
  expect(browser.getLocalStorageItem('prefix', 'test')).toEqual({ a: 2 });
});

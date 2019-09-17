import App from '../app';

beforeEach(() => {
  window.history.replaceState(null, '', '/');
});

test('sync location with history', () => {
  const app = new App();
  const store = app.stores.router;
  expect(store.location.pathname).toBe('/');
  store.history.push('/test');
  expect(store.location.pathname).toBe('/');
  app.actions.router.syncLocationWithHistory();
  expect(store.location.pathname).toBe('/test');
});

test('go to route', () => {
  const app = new App();
  const store = app.stores.router;
  expect(store.history.location.pathname).toBe('/');
  store.history.push('/test');
  expect(store.history.location.pathname).toBe('/test');

  app.actions.router.goToHomepage();
  expect(store.history.location.pathname).toBe('/');
});

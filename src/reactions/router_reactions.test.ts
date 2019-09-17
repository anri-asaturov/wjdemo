import App from '../app';

test('location property', () => {
  const app = new App();
  const store = app.stores.router;
  expect(store.location.pathname).toBe('/');
  app.reactions.router.urlLocationTracker.start();
  expect(store.location.pathname).toBe('/');
  store.history.push('/test');
  expect(store.location.pathname).toBe('/test');
  store.history.push('/test1');
  expect(store.location.pathname).toBe('/test1');
  app.reactions.router.urlLocationTracker.stop();
  store.history.push('/test2');
  expect(store.location.pathname).toBe('/test1');
  app.reactions.router.urlLocationTracker.start();
  expect(store.location.pathname).toBe('/test2');
});

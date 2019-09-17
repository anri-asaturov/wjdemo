import App from '../app';

test('computed `isAuthenticated`', () => {
  const app = new App();
  const store = app.stores.auth;

  expect(store.isAuthenticated).toBe(false);
});

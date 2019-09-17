import App from '../app';

test('is created', () => {
  const app = new App();
  expect(app.stores.account).toBeDefined();
});

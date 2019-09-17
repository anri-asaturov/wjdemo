import App from '../app';

test('default values', () => {
  const { router: routerStore } = new App().stores;
  expect(routerStore.history).toBeDefined();
  expect(routerStore.location.pathname).toBe('/');
});

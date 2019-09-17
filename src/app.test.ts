import App from './app';

test('start()', async () => {
  const app = new App();
  await app.start();
});

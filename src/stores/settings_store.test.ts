import App from '../app';
import { darkTheme, lightTheme } from '../style/themes';

test('serialize settings', () => {
  const app = new App();
  let actual = app.stores.settings.serialize();
  let expected = JSON.stringify({ theme: 'light' });
  expect(actual).toBe(expected);
  app.stores.settings.theme = darkTheme;
  actual = app.stores.settings.serialize();
  expected = JSON.stringify({ theme: 'dark' });
  expect(actual).toBe(expected);
});

test('deserialize settings', () => {
  const app = new App();
  expect(app.stores.settings.theme).toBe(lightTheme);
  app.stores.settings.deserialize(JSON.stringify({ theme: 'dark' }));
  expect(app.stores.settings.theme).toBe(darkTheme);
});

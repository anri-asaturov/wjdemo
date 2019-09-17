import App from '../app';
import { darkTheme, lightTheme } from '../style/themes';

jest.mock('../config');
const config = require('../config');
config.settingsPersistDelay = 0;

test('settings persist reaction', () => {
  const app = new App();
  const store = app.stores.settings;
  expect(localStorage.getItem('guest:settings')).toBe(null);
  app.reactions.settings.persistReaction.start();

  store.theme = darkTheme;
  expect(localStorage.getItem('guest:settings')).toBe(
    JSON.stringify(JSON.stringify({ theme: 'dark' }))
  );

  store.theme = lightTheme;
  expect(localStorage.getItem('guest:settings')).toBe(
    JSON.stringify(JSON.stringify({ theme: 'light' }))
  );

  app.reactions.settings.persistReaction.stop();

  store.theme = darkTheme;
  expect(localStorage.getItem('guest:settings')).toBe(
    JSON.stringify(JSON.stringify({ theme: 'light' }))
  );
});

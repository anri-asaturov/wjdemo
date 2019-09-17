import { action } from 'mobx';
import App from '../app';
import { lightTheme, darkTheme } from '../style/themes';

export default class SettingsActions {
  constructor(private app: App) {}

  @action
  loadSettings() {
    const store = this.app.stores.settings;
    const json = this.app.effects.browser.getLocalStorageItem<string>('guest', 'settings');
    if (json !== null) {
      store.deserialize(json);
    }
    console.log('Settings loaded.');
  }

  @action
  toggleTheme() {
    const store = this.app.stores.settings;
    store.theme = store.theme === lightTheme ? darkTheme : lightTheme;
  }
}

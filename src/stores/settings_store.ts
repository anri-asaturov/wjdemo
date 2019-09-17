import { action, observable } from 'mobx';
import App from '../app';
import { WebsiteTheme, darkTheme, lightTheme } from '../style/themes';

interface ISerializedSettings {
  theme: 'light' | 'dark';
}
// everything put to this store will be synced with local storage
export default class SettingsStore {
  constructor(private app: App) {}

  @observable.ref theme: WebsiteTheme = lightTheme;

  serialize() {
    const obj: ISerializedSettings = {
      theme: this.theme === lightTheme ? 'light' : 'dark'
    };
    return JSON.stringify(obj);
  }

  @action
  deserialize(json: string) {
    const obj: ISerializedSettings = JSON.parse(json);
    switch (obj.theme) {
      case 'light':
        this.theme = lightTheme;
        break;
      case 'dark':
        this.theme = darkTheme;
        break;
    }
  }
}

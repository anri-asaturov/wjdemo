import App from '../app';
import { disposableReaction } from '../helpers/reaction';
import { reaction } from 'mobx';
import { settingsPersistDelay } from '../config';

export default class SettingsReactions {
  constructor(private app: App) {}

  persistReaction = disposableReaction('settings persist', () => {
    const store = this.app.stores.settings;

    const disposer = reaction(
      () => store.serialize(),
      val => {
        console.log('persisting settings', val);
        this.app.effects.browser.setLocalStorageItem('guest', 'settings', val);
      },
      { name: `settings save`, delay: settingsPersistDelay }
    );

    return disposer;
  });
}

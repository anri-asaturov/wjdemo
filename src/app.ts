import SettingsActions from './actions/settings_actions';
import LoggingReactions from './reactions/logging_reactions';
import RouterReactions from './reactions/router_reactions';
import SettingsReactions from './reactions/settings_reactions';
import WindowReactions from './reactions/window_reactions';
import BrowserEffects from './side_effects/browser_effects';
import AccountStore from './stores/account_store';
import AuthStore from './stores/auth_store';
import RouterStore from './stores/router_store';
import SettingsStore from './stores/settings_store';
import UIStore from './stores/ui_store';
import RouterActions from './actions/router_actions';
import HomepageActions from './actions/homepage_actions';
import { HttpLink } from 'apollo-link-http';
import UIActions from './actions/ui_actions';

export default class App {
  actions = {
    homepage: new HomepageActions(this),
    ui: new UIActions(this),
    router: new RouterActions(this),
    settings: new SettingsActions(this)
  };

  stores = {
    ui: new UIStore(this),
    router: new RouterStore(this),
    settings: new SettingsStore(this),
    auth: new AuthStore(this),
    account: new AccountStore(this)
  };

  effects = { browser: new BrowserEffects(this) };

  reactions = {
    router: new RouterReactions(this),
    settings: new SettingsReactions(this),
    window: new WindowReactions(this),
    logging: new LoggingReactions(this)
  };

  /**
   * All reactions go here
   */
  async start() {
    this.actions.settings.loadSettings();
    this.reactions.settings.persistReaction.start();
    this.reactions.router.urlLocationTracker.start();
    this.reactions.window.windowSizeTrackingReaction.start();
  }
}

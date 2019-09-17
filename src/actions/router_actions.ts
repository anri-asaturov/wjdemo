import { action } from 'mobx';
import App from '../app';

export const ROUTES = {
  homepage: '/'
};

export default class RouterActions {
  constructor(private app: App) {}

  /**
   * Sets location property in router store to the recent value from router history.
   */
  @action
  syncLocationWithHistory() {
    const store = this.app.stores.router;
    store.location = store.history.location;
    console.log('Location changed to:', JSON.stringify(store.location));
  }

  @action.bound
  goToHomepage() {
    this.app.stores.router.history.push(ROUTES.homepage);
  }
}

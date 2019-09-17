import { createBrowserHistory, History, Location } from 'history';
import { observable } from 'mobx';
import App from '../app';

export default class RouterStore {
  constructor(private app: App) {
    this.history = createBrowserHistory();
    this.location = this.history.location;
  }

  history: History<any>;
  // this can't be a computed from this.history.location because it needs to be observable and history isn't
  @observable location: Location<any>;
}

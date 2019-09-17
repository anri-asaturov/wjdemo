import App from '../app';
import { disposableReaction } from '../helpers/reaction';

export default class RouterReactions {
  constructor(private app: App) {}

  urlLocationTracker = disposableReaction('url location tracker', () => {
    this.app.actions.router.syncLocationWithHistory();
    const dispose = this.app.stores.router.history.listen((_location, _action) => {
      this.app.actions.router.syncLocationWithHistory();
    });
    return dispose;
  });
}

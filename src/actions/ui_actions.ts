import { action } from 'mobx';
import App from '../app';
import { getScreenClass } from '../ui/grid/media';

export default class UIActions {
  constructor(private app: App) {}

  /**
   * Sets screen class property in ui store to the appropriate value based on window size.
   */
  @action.bound
  syncScreenClassWithWindowSize() {
    const actualScreenClass = getScreenClass();
    if (actualScreenClass !== this.app.stores.ui.screenClass) {
      this.app.stores.ui.screenClass = actualScreenClass;
      console.log(`Screen class changed to ${actualScreenClass}`);
    }
  }
}

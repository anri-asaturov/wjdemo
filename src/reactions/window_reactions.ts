import App from '../app';
import { disposableReaction } from '../helpers/reaction';

export default class WindowReactions {
  constructor(private app: App) {}

  windowSizeTrackingReaction = disposableReaction('window size tracking', () => {
    const setScreen = this.app.actions.ui.syncScreenClassWithWindowSize;

    setScreen();

    window.addEventListener('orientationchange', setScreen, false);
    window.addEventListener('resize', setScreen, false);

    return () => {
      window.removeEventListener('orientationchange', setScreen);
      window.removeEventListener('resize', setScreen);
    };
  });
}

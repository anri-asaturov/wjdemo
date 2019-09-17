import { DateTime, LocalZone } from 'luxon';
import { computed, observable } from 'mobx';
import App from '../app';
import ObservableClock from '../helpers/ObservableClock';
import { ScreenClassType } from '../ui/grid/media';
import { websiteTimeZoneName } from '../config';

export default class UIStore {
  constructor(private app: App) {}
  private clock = new ObservableClock();

  @observable screenClass: ScreenClassType = 'md';

  @computed get isMobileScreen() {
    return this.screenClass === 'xs';
  }
  @computed get isDesktopScreen() {
    return !this.isMobileScreen;
  }

  // Returns observable Date that will update every clockUpdateInterval seconds.
  @computed get userClock() {
    //@ts-ignore luxon will be rewritten in TS soon
    return this.websiteClock.setZone(LocalZone.instance.name);
  }

  @computed get websiteClock() {
    return DateTime.fromMillis(this.clock.timestamp, { zone: websiteTimeZoneName });
  }
}

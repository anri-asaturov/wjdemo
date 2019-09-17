import { createAtom, IAtom } from 'mobx';
import { clockUpdateInterval } from '../config';

export default class ObservableClock {
  private atom: IAtom;
  private intervalHandler?: number;
  private currentDateTime = Date.now();

  constructor() {
    this.atom = createAtom('Clock', () => this.startTicking(), () => this.stopTicking());
  }

  get timestamp() {
    if (this.atom.reportObserved()) {
      return this.currentDateTime;
    } else {
      return Date.now();
    }
  }

  private tick() {
    this.currentDateTime = Date.now();
    this.atom.reportChanged();
  }

  private startTicking() {
    this.tick();
    this.intervalHandler = setInterval(() => this.tick(), clockUpdateInterval);
  }

  private stopTicking() {
    clearInterval(this.intervalHandler);
    this.intervalHandler = undefined;
  }
}

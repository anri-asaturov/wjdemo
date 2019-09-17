import { observable, action } from 'mobx';

export default class AsyncData<TRet> {
  requestId = 0;
  @observable loading = false;
  @observable loadedOnce = false;
  /** Last return value of async process, does not clear if subsequent process errors out. */
  @observable.ref data?: TRet;
  /** Timestamp of last successful process execution, does not clear if subsequent process errors out. */
  @observable lastSuccessTimestamp?: number;

  /** Error of the last execution if it failed. Clears on subsequent successful run. */
  @observable.ref error?: Error;
  /** Timestamp of the last execution if it failed. Clears on subsequent successful run. */
  @observable errorTimestamp?: number;

  @action private setSuccess(result: TRet) {
    this.data = result;
    this.loadedOnce = true;
    this.loading = false;
    this.lastSuccessTimestamp = Date.now();

    this.error = undefined;
    this.errorTimestamp = undefined;
  }

  @action private setError(err: Error) {
    console.error(err);
    let error = err;
    if (!(error instanceof Error)) {
      error = new Error(String(err));
    }
    this.error = error;
    this.errorTimestamp = Date.now();
    this.loading = false;
  }

  @action.bound
  async load(process: () => Promise<TRet>, force = false) {
    if (!force && this.loading) return;
    this.loading = true;
    const requestId = ++this.requestId;
    try {
      const result = await process();
      // skipping result because other forced request was called while we were waiting for response
      if (requestId !== this.requestId) return;
      this.setSuccess(result);
    } catch (err) {
      this.setError(err);
    }
  }
}

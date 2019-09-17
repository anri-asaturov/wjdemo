/**
 * Helper for app `reactions`.
 * Hides implementation of storing disposer/unsubscribe function and checking if reaction is already active.
 * @param name
 * @param fn
 */
export function disposableReaction(name: string, fn: () => () => void) {
  let disposer: null | (() => void) = null;
  return {
    start: () => {
      if (disposer) {
        console.warn(`Disposable reaction '${name}' start() was called while already started.`);
        return;
      }
      console.log(`Disposable reaction '${name}' will get started now.`);
      disposer = fn();
    },
    stop: () => {
      if (disposer) {
        console.log(`Disposable reaction '${name}' will get disposed now.`);
        disposer();
        disposer = null;
      } else {
        console.warn(`Disposable reaction '${name}' stop() was called while already disposed.`);
      }
    }
  };
}

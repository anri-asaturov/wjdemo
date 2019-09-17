import App from '../app';

function resizeWindow(x: number, y: number) {
  //@ts-ignore
  window.innerWidth = x;
  //@ts-ignore
  window.innerHeight = y;
  window.dispatchEvent(new Event('resize'));
}

test('window size tracking', async () => {
  const app = new App();
  const store = app.stores.ui;
  //app.reactions.logging.screenSizeLogger.start();
  expect(store.screenClass).toBe('md');
  app.reactions.window.windowSizeTrackingReaction.start();
  resizeWindow(100, 100);
  expect(store.screenClass).toBe('xs');
  resizeWindow(767, 100);
  expect(store.screenClass).toBe('xs');
  resizeWindow(768, 100);
  expect(store.screenClass).toBe('sm');
  resizeWindow(1023, 100);
  expect(store.screenClass).toBe('sm');
  resizeWindow(1024, 100);
  expect(store.screenClass).toBe('md');
  resizeWindow(1439, 100);
  expect(store.screenClass).toBe('md');
  resizeWindow(1440, 100);
  expect(store.screenClass).toBe('lg');
  resizeWindow(1919, 100);
  expect(store.screenClass).toBe('lg');
  resizeWindow(1920, 100);
  expect(store.screenClass).toBe('xl');
  resizeWindow(4000, 100);
  expect(store.screenClass).toBe('xl');
  app.reactions.window.windowSizeTrackingReaction.stop();
  resizeWindow(100, 100);
  expect(store.screenClass).toBe('xl');
  app.reactions.window.windowSizeTrackingReaction.start();
  expect(store.screenClass).toBe('xs');
});

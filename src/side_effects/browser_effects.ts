import App from '../app';

export default class BrowserEffects {
  constructor(private app: App) {}

  reloadWindow() {
    window.location.reload();
  }

  getLocalStorageItem<T>(prefix: string, key: string) {
    const val = localStorage.getItem(`${prefix}:${key}`);
    return val === null ? null : (JSON.parse(val) as T);
  }

  setLocalStorageItem(prefix: string, key: string, value: any) {
    localStorage.setItem(`${prefix}:${key}`, JSON.stringify(value));
  }
}

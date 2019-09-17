import { computed } from 'mobx';
import App from '../app';

export default class AuthStore {
  constructor(private app: App) {}

  @computed get isAuthenticated(): boolean {
    return false; //todo
  }
}

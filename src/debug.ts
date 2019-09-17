import { isDevBuild } from './helpers/runtime';

if (isDevBuild) {
  //@ts-ignore
  window.debug = {
    modules: {
      luxon: require('luxon')
    }
  };
}

import { WebsiteTheme } from '../style/themes';

// makes theme prop typed
declare module 'styled-components' {
  interface DefaultTheme extends WebsiteTheme {}
}

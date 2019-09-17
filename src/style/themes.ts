import blackLogo from '../assets/logo-black.png';
import whiteLogo from '../assets/logo-white.png';
import { transparentize } from 'polished';

const colors = {
  red: '#f23434',
  brand: '#6741F5',
  white: '#FFFFFF',
  black: '#000000',

  darkGray3: '#0D0D0D',
  darkGray2: '#1B1B1B',
  darkGray1: '#3D3D3D',
  gray: '#999999',
  lightGray1: '#C3C3C3',
  lightGray2: '#DBDBDB',
  lightGray3: '#F2F2F2'
};

export const zIndices = {
  headerAndFooter: 10000,
  drawer: 12000,
  modal: 15000,
  popUpMenu: 20000
};

// IMPORTANT: keep this object flat, because theme derivation (Object.assign) does not support deep cloning
const baseTheme = {
  /* always override and set unique name  */
  name: 'BASE',

  /* should not override in other themes */
  font: "'Roboto', sans-serif",
  brandColor: colors.brand,
  shadowDownRight: '0.1rem 0.1rem 0.3rem 0rem rgba(0,0,0,0.14)',
  shadowAround: '0 0 0.6rem 0.1rem rgba(0,0,0,0.14)',
  themeSwitchTransition: 'color 0.5s, background 1.2s ease, border-color 1.4s, box-shadow 1.4s;',
  headerHeight: '5rem',

  /* assets */
  logoUrl: blackLogo,

  /* basics */
  color: colors.darkGray1,
  colorDimmed: colors.gray,
  colorDimmedMore: colors.lightGray1,
  colorInverted: colors.white,
  colorDanger: colors.red,
  background: colors.lightGray3,
  backgroundInverted: colors.darkGray1,
  backgroundDimmedOverlay: transparentize(0.2, colors.black),
  border: `0.1rem solid ${colors.lightGray2}`,

  /* input */
  inputBackground: colors.lightGray3,
  inputDisabledColor: colors.lightGray1,
  inputPlaceholderColor: colors.lightGray1,
  inputHeight: '4rem',
  inputHeightSmall: '3.2rem',

  /* COMPONENTS */
  /* main layout */
  headerBackground: colors.white,
  mobileHeaderBackground: colors.brand,
  mobileHeaderColor: colors.white,
  /* drawer */
  drawerColor: colors.white,
  drawerBackground: colors.darkGray1
};

export type WebsiteTheme = typeof baseTheme;

//-- LIGHT THEME
const lightThemeProps: Partial<WebsiteTheme> = { name: 'LIGHT' };

export const lightTheme = Object.assign({}, baseTheme, lightThemeProps);

//-- DARK THEME
const darkThemeProps: Partial<WebsiteTheme> = {
  name: 'DARK',
  logoUrl: whiteLogo,

  color: colors.gray,
  colorInverted: colors.black,
  background: colors.darkGray3,
  backgroundInverted: colors.gray,
  border: `0.1rem solid ${colors.darkGray3}`,

  shadowDownRight: '0.1rem 0.1rem 0.3rem 0rem rgba(0,0,0,0.14)',
  shadowAround: '0 0 0.6rem 0.1rem rgba(0,0,0,0.62)',

  headerBackground: colors.darkGray2,
  mobileHeaderColor: colors.brand,
  mobileHeaderBackground: colors.darkGray2,

  inputBackground: colors.darkGray1,
  inputPlaceholderColor: colors.gray
};

export const darkTheme = Object.assign({}, baseTheme, darkThemeProps);

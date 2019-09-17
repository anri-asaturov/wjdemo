import { css } from 'styled-components';

export type ScreenClassType = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export const ScreenClasses: Array<ScreenClassType> = ['xs', 'sm', 'md', 'lg', 'xl'];

export function getScreenClass(): ScreenClassType {
  const screenClasses = ScreenClasses;

  const rootFont = 16;

  const pxBreakpoints = Object.values(breakpoints).map(bp => bp * rootFont);

  let screenClass: ScreenClassType;
  const viewport = window.innerWidth;

  screenClass = screenClasses[0];
  if (pxBreakpoints[1] && viewport >= pxBreakpoints[1]) screenClass = screenClasses[1];
  if (pxBreakpoints[2] && viewport >= pxBreakpoints[2]) screenClass = screenClasses[2];
  if (pxBreakpoints[3] && viewport >= pxBreakpoints[3]) screenClass = screenClasses[3];
  if (pxBreakpoints[4] && viewport >= pxBreakpoints[4]) screenClass = screenClasses[4];

  return screenClass!;
}

export const columns = {
  xs: 4,
  sm: 8,
  md: 8,
  lg: 12,
  xl: 12
};

export const breakpoints = {
  xs: 30,
  sm: 48, // 768px
  md: 64, // 1024px
  lg: 90, // 1440px
  xl: 120 // 1920px
};

export const media = ScreenClasses.reduce(
  (m, breakpoint) => {
    const breakpointWidth = breakpoints[breakpoint];

    m[breakpoint] = makeMedia(
      ['only screen', breakpointWidth >= 0 && `(min-width: ${breakpointWidth + 0.0625}rem)`]
        .filter(Boolean)
        .join(' and ')
    );
    return m;
  },
  {} as { [screenClass in ScreenClassType]: ReturnType<typeof makeMedia> }
);

export const XS = media.xs;
export const SM = media.sm;
export const MD = media.md;
export const LG = media.lg;
export const XL = media.xl;

function makeMedia(media: string) {
  return (...args: Parameters<typeof css>) => css`
    @media ${media} {
      ${css(...args)}
    }
  `;
}

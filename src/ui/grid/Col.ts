import styled, { css } from 'styled-components';
import { breakpoints, columns, media, ScreenClasses, ScreenClassType } from './media';
import { ReactNode } from 'react';

interface IColProps {
  xs?: number | string;
  sm?: number | string;
  md?: number | string;
  lg?: number | string;
  xl?: number | string;
  offset?: number | { [screenClass in ScreenClassType]: number };
  reverse?: boolean | Array<ScreenClassType>;
  debug?: boolean;
  children?: ReactNode;
}

const Col = styled.div<IColProps>`
  display: flex;
  flex: 1 0 auto;
  flex-direction: column;
  max-width: 100%;

  ${p => css`
    ${ScreenClasses.map(
      d =>
        breakpoints[d] &&
        media[d]`
      ${p[d] &&
        `
        flex: 1 1 ${((p[d] as number) / columns[d]) * 100}%;
        max-width: ${((p[d] as number) / columns[d]) * 100}%;
      `}
    `
    )}
  `}

  ${p =>
    p.offset &&
    css`
      ${ScreenClasses.map(
        d =>
          breakpoints[d] &&
          media[d]`
    ${
      typeof p.offset === 'object'
        ? p.offset[d] !== undefined &&
          `margin-left: ${p.offset[d] > 0 ? (p.offset[d] / columns[d]) * 100 : 0}%`
        : `margin-left: ${(p.offset! / columns['xs']) * 100}%`
    };
    `
      )}
    `}

  ${p =>
    p.reverse &&
    css`
      ${Array.isArray(p.reverse)
        ? ScreenClasses.map(
            d =>
              breakpoints[d] &&
              media[d]`
      flex-direction:${
        (p.reverse as ScreenClassType[]).indexOf(d) !== -1 ? `column-reverse` : `column`
      };`
          )
        : 'flex-direction: column-reverse;'}
    `}

  ${({ debug }) =>
    debug &&
    css`
      background-color: #5901ad40;
      outline: #fff solid 1px;
    `}
`;

Col.displayName = 'Col';

export default Col;

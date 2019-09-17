import styled, { css } from 'styled-components';
import { ScreenClasses, ScreenClassType, breakpoints, media } from './media';
import { ReactNode } from 'react';

const Row = styled.div<{
  reverse?: boolean | ScreenClassType[];
  debug?: boolean;
  children?: ReactNode;
}>`
  display: flex;
  flex: 1 0 auto;
  flex-direction: row;
  flex-wrap: wrap;

  ${p =>
    p.reverse &&
    css`
      ${Array.isArray(p.reverse)
        ? ScreenClasses.map(
            d =>
              breakpoints[d] &&
              media[d]`
      flex-direction:${(p.reverse as ScreenClassType[]).indexOf(d) !== -1 ? `row-reverse` : `row`};`
          )
        : 'flex-direction: row-reverse;'}
    `}

  ${({ debug }) =>
    debug &&
    css`
      background-color: #5901ad40;
      outline: #fff solid 1px;
    `}
`;

Row.displayName = 'Row';

export default Row;

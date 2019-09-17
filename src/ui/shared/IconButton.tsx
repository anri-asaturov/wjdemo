import React, { EventHandler } from 'react';
import styled, { css } from 'styled-components';

export interface IIconButtonProps {
  width?: string;
  height?: string;
  onClick?: EventHandler<React.MouseEvent<HTMLDivElement>>;
  className?: string;
}

const Container = styled.div<IIconButtonProps>`
  display: inline-block;
  ${p =>
    p.width &&
    css`
      width: ${p.width};
    `};
  height: ${p => p.height || '1em'};
  cursor: pointer;
`;

export default (
  props: { icon: React.ComponentClass<any> | React.FC<any>; children?: never[] } & IIconButtonProps
) => {
  return (
    <Container
      className={props.className}
      width={props.width}
      height={props.height}
      onClick={props.onClick}
    >
      <props.icon />
    </Container>
  );
};

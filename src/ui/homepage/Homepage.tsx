import React from 'react';
import { observer } from 'mobx-react';
import ComponentWithContext from '../shared/ComponentWithContext';
import styled from 'styled-components';
import { SM } from '../grid/media';

const Container = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  padding: 0.5rem;
  background: ${p => p.theme.background};
  ${SM`
      background: transparent;
      padding: 1rem;
  `}
`;
@observer
export default class Homepage extends ComponentWithContext {
  render() {
    return <Container></Container>;
  }
}

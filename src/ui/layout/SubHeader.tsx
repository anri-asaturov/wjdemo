import { observer } from 'mobx-react';
import React from 'react';
import { Route } from 'react-router';
import styled from 'styled-components';
import { zIndices } from '../../style/themes';

const Container = styled.div`
  position: fixed;
  z-index: ${zIndices.headerAndFooter};
  top: ${p => p.theme.headerHeight};
  right: 0;
  left: 0;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: center;
  height: ${p => p.theme.headerHeight};
  background: ${p => p.theme.headerBackground};
  border-bottom: ${p => p.theme.border};
  user-select: none;
  box-shadow: ${p => p.theme.shadowDownRight};
`;

@observer
export default class SubHeader extends React.Component {
  render() {
    return (
      <Container className="theme-transition">
        <Route path="/" />
        <Route path="/search" render={() => 'search'} />
      </Container>
    );
  }
}

import { observer } from 'mobx-react';
import React, { Component } from 'react';
import styled from 'styled-components';
import { LG } from '../grid/media';
import { Route } from 'react-router';
import Homepage from '../homepage/Homepage';
import ComponentWithContext from '../shared/ComponentWithContext';

const Container = styled.div`
  min-height: 70vh;
  min-height: calc(100vh - 16rem);
  /* this is related to footer height doubling on MD and lower */
  ${LG`  
    min-height: calc(100vh - 12rem);
  `}
  margin-top: ${p => p.theme.headerHeight};
  padding-top: ${p => p.theme.headerHeight};
  background: ${p => p.theme.background};
`;

@observer
export default class MainContent extends ComponentWithContext {
  render() {
    return (
      <Container className="theme-transition">
        <Route exact path="/" component={Homepage}></Route>
      </Container>
    );
  }
}

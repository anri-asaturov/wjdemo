import { observer } from 'mobx-react';
import React from 'react';
import styled, { css } from 'styled-components';
import logoUrl from '../../assets/logo-small.png';
import { zIndices } from '../../style/themes';
import Col from '../grid/Col';
import { LG, SM } from '../grid/media';
import Row from '../grid/Row';
import ComponentWithContext from '../shared/ComponentWithContext';
import CurrentTime from './CurrentTime';

const Container = styled(Row)`
  font-size: 1.1rem;
  color: ${p => p.theme.colorDimmed};
  z-index: ${zIndices.headerAndFooter};
  flex: inherit;
  min-height: 7rem;
  ${SM`
    padding: 1.5rem 2rem 0.5rem 2rem;
    background: ${p => p.theme.headerBackground};
    border-top: ${p => p.theme.border};
    box-shadow: ${p => p.theme.shadowDownRight};
  `}
  ${LG`
    font-size: 1.3rem;
    padding: 1rem 2rem;
  `}
`;

const columnStyle = css`
  justify-content: center;
`;

const Links = styled(Col)`
  ${columnStyle}
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  ${SM`
    justify-content: left;
  `}
`;

const LinkItem = styled.a`
  display: inline-block;
  margin-right: 0.5rem;
  ${SM`
    margin-right: 2rem;
  `}
`;

const CopyRightItem = styled(LinkItem)`
  line-height: 1.2;
  text-align: left;
  margin-right: 0;
  margin-left: 1rem;
  ${LG`
    text-align: right;
  `}
`;

const Text = styled(Col)`
  ${columnStyle}
  font-size: 1.2rem;
  align-items: center;
  flex-direction: row;
  justify-content: flex-start;
  margin-top: 2rem;
  ${LG`
    justify-content: flex-end;
    margin-top: 0;
  `}
`;

@observer
export default class Footer extends ComponentWithContext {
  render() {
    return (
      <Container className="theme-transition">
        <Links md={8} lg={6}>
          {this.context.stores.ui.isDesktopScreen && (
            <LinkItem href="/">
              <img src={logoUrl} />
            </LinkItem>
          )}
          <LinkItem target="_blank">FAQ</LinkItem>
          <LinkItem target="_blank">Contact Support</LinkItem>
          <LinkItem target="_blank">Terms of Use</LinkItem>
          <LinkItem target="_blank">Privacy Policy</LinkItem>
        </Links>
        <Text sm={8} md={8} lg={6}>
          <CopyRightItem as="div">
            Copyright © 2019 Workjam Web team
            <br />
            <a>18 U.S.C. 2257 Record-Keeping Requirements Compliance Statement</a>
            <br />
            <CurrentTime />
          </CopyRightItem>
        </Text>
      </Container>
    );
  }
}

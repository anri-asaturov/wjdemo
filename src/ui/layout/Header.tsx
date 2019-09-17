import Drawer from 'antd/lib/drawer';
import 'antd/lib/drawer/style/index.css';
import { action, observable } from 'mobx';
import { observer } from 'mobx-react';
import React from 'react';
import { MdBrightness6 } from 'react-icons/md';
import { FaShoppingBag, FaBlog, FaUser, FaUserPlus } from 'react-icons/fa';
import styled, { css } from 'styled-components';
import { MD, SM } from '../grid/media';
import IconBurger from '../icons/IconBurger';
import IconSearch from '../icons/IconSearch';
import IconButton from '../shared/IconButton';
import TextInput from '../shared/TextInput';
import Footer from './Footer';
import ComponentWithContext from '../shared/ComponentWithContext';
import { zIndices } from '../../style/themes';
import { ROUTES } from '../../actions/router_actions';
import { NavLink } from 'react-router-dom';

const Container = styled.div`
  position: fixed;
  z-index: ${zIndices.headerAndFooter};
  top: 0;
  right: 0;
  left: 0;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: center;
  height: ${p => p.theme.headerHeight};
  background: ${p => p.theme.mobileHeaderBackground};
  border-bottom: ${p => p.theme.border};
  user-select: none;
  box-shadow: ${p => p.theme.shadowDownRight};

  ${p => SM`
    background: ${p.theme.headerBackground};
    padding: 0 1.5rem;
  `}
`;

const Logo = styled.div`
  display: flex;
  height: 5rem;
  cursor: pointer;
  align-items: center;
`;

const Search = styled.div`
  display: flex;
  width: 20rem;
  margin-left: 1.5rem;
  align-items: center;
  ${MD`
    width: 25rem;
    margin-left: 3rem;
  `}
`;

const Menu = styled.div`
  display: flex;
  flex: 1 1 auto;
  flex-direction: column;
  ${SM`
    flex-direction: row;
    margin-left: 1.5rem;
    align-items: center;
  `}
  ${MD`
    margin-left: 3rem;
  `}
`;

const menuItemStyle = css`
  font-size: 1.8rem;
  display: flex;
  margin: 0 0 2rem 0;
  align-items: center;
  cursor: pointer;

  &:hover {
    color: ${p => p.theme.brandColor};
  }
  svg {
    width: 1.2em;
    height: 1.2em;
    margin-right: 2rem;
    margin-left: 0.5rem;
    opacity: 0.5;
  }
  &.active {
    color: ${p => p.theme.brandColor};
  }
  ${SM`
    text-transform: uppercase;
    font-size: 1.6rem;
    font-weight: 900;
    line-height: 1.2;
    margin: 0 1rem 0 0;
  `}
  ${MD`
    margin: 0 2.5rem 0 0;
  `}
`;

const MenuLink = styled(NavLink)`
  ${menuItemStyle}
`;

const MenuButton = styled.div`
  ${menuItemStyle}
`;

const MenuDrawer = styled(Drawer)`
  z-index: ${zIndices.drawer};

  .ant-drawer-content {
    color: ${p => p.theme.drawerColor};
    background: ${p => p.theme.drawerBackground};
  }
  .ant-drawer-body {
    display: flex;
    flex-direction: column;
    height: 100%;
  }
`;

const Auth = styled.div`
  align-items: center;
  font-size: 1.4rem;
  display: flex;
  flex: auto;
  flex-direction: row;
  justify-content: flex-end;
`;

const ThemeButton = styled.div`
  display: inline-block;
  width: 1.8rem;
  height: 1.8rem;
  margin-left: 1rem;
  cursor: pointer;
`;

const mobileButtonStyle = css`
  color: ${p => p.theme.mobileHeaderColor};
  display: flex;
  align-items: center;
  justify-content: center;
  height: 3rem;
`;

const LogoMobile = styled.div`
  ${mobileButtonStyle}
  flex: 0 0 6rem;
  filter: invert(1);
`;

const MidButtons = styled.div`
  ${mobileButtonStyle}
  flex: 1 1 auto;
`;

const MenuToggle = styled.div`
  ${mobileButtonStyle}
  flex: 0 0 6rem;
`;

const FooterStyled = styled(Footer)`
  flex: 0 1 auto;
`;

@observer
export default class Header extends ComponentWithContext {
  @observable drawerVisible = false;

  @action.bound
  showDrawer() {
    this.drawerVisible = true;
  }

  @action.bound
  hideDrawer() {
    this.drawerVisible = false;
  }

  @action.bound
  onToggleTheme() {
    this.context.actions.settings.toggleTheme();
  }

  render() {
    const { ui: uiStore, settings: settingsStore } = this.context.stores;
    // MOBILE
    if (uiStore.isMobileScreen) {
      return (
        <Container className="theme-transition">
          <LogoMobile className="svgfill">
            <img
              src={settingsStore.theme.logoUrl}
              onClick={this.context.actions.router.goToHomepage}
            />
          </LogoMobile>
          <MidButtons className="svgfill">
            <IconButton icon={IconSearch} height="3rem" width="3rem" />
          </MidButtons>
          <MenuToggle className="svgfill">
            <IconButton icon={IconBurger} height="3rem" width="3rem" onClick={this.showDrawer} />
          </MenuToggle>
          <MenuDrawer
            visible={this.drawerVisible}
            closable={false}
            destroyOnClose
            width="80%"
            onClose={this.hideDrawer}
          >
            <Menu>
              <MenuButton>
                <FaUserPlus /> Sign Up
              </MenuButton>
              <MenuButton>
                <FaUser /> Log In
              </MenuButton>
              <MenuLink to={''} target="_blank">
                <FaShoppingBag /> Store
              </MenuLink>
              <MenuLink to={''} target="_blank">
                <FaBlog /> Blog
              </MenuLink>
              <MenuButton onClick={this.onToggleTheme}>
                <MdBrightness6 /> Color theme
              </MenuButton>
            </Menu>

            <FooterStyled />
          </MenuDrawer>
        </Container>
      );
    }
    // TABLET/DESKTOP
    return (
      <Container className="theme-transition">
        <Logo>
          <img
            src={settingsStore.theme.logoUrl}
            onClick={this.context.actions.router.goToHomepage}
          />
        </Logo>
        <Search>
          <TextInput placeholder="Search..." small icon={IconSearch} />
        </Search>
        <Menu>
          <MenuLink to={ROUTES.homepage}>Home</MenuLink>
          <MenuLink to={''} target="_blank">
            STORE
          </MenuLink>
          <MenuLink to={''} target="_blank">
            BLOG
          </MenuLink>
        </Menu>
        <Auth>
          <div>Sign Up &nbsp;&nbsp;|&nbsp;&nbsp; Log In</div>
          <ThemeButton onClick={this.onToggleTheme} className="svgfill">
            <MdBrightness6 />
          </ThemeButton>
        </Auth>
      </Container>
    );
  }
}

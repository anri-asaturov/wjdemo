import { observable, runInAction } from 'mobx';
import { observer } from 'mobx-react';
import React from 'react';
import { Router } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import App from '../app';
import appContext from '../app_context';
import { GlobalStyle } from '../style/global_style';
import MainContent from './layout/MainContent';
import Footer from './layout/Footer';
import Header from './layout/Header';
import SubHeader from './layout/SubHeader';

@observer
export default class Root extends React.Component {
  @observable app?: App;

  constructor(props: any) {
    super(props);
    console.log('Creating App instance.');
    const app = new App();
    console.log('Starting app reactions.');
    app.start().then(() => {
      console.log('App is ready to render.');
      runInAction(() => (this.app = app));
      //@ts-ignore for easy debugging
      window.app = this.app;
    });
  }

  render() {
    if (!this.app) return null;

    return (
      <appContext.Provider value={this.app}>
        <ThemeProvider theme={this.app.stores.settings.theme}>
          <Router history={this.app.stores.router.history}>
            <GlobalStyle />
            <Header />
            <SubHeader />
            <MainContent />
            {this.app.stores.ui.screenClass !== 'xs' && <Footer />}
          </Router>
        </ThemeProvider>
      </appContext.Provider>
    );
  }
}

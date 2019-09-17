import 'normalize.css';
import { configure } from 'mobx';
import React from 'react';
import ReactDOM from 'react-dom';
import './debug.ts';
import { isDevBuild } from './helpers/runtime';
import Root from './ui/Root';

console.log(`BUILD: ${process.env.NODE_ENV} | RUNTIME: ${process.env.RUNTIME_ENV}`);

configure({
  //we want to break dev build if reaction throws
  disableErrorBoundaries: isDevBuild,
  // we don't want to break prod by accidentally modifying observable out of action context
  enforceActions: isDevBuild ? 'observed' : 'never'
});

ReactDOM.render(React.createElement(Root), document.getElementById('root'));

import React from 'react';
import appContext from '../../app_context';
import App from '../../app';

export default class ComponentWithContext<P = {}, S = {}, SS = any> extends React.Component<
  P,
  S,
  SS
> {
  static contextType = appContext;
  context!: App;
}

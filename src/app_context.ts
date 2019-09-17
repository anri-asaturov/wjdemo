import React from 'react';
import App from './app';

const appContext = React.createContext<App | null>(null);
export default appContext;

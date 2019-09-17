export const isTest = process.env.NODE_ENV === 'test';
export const isProdBuild = process.env.NODE_ENV === 'production';
export const isDevBuild = !isProdBuild;
export const isLocalDevRuntime = process.env.RUNTIME_ENV === 'local_dev';
export const isDevRuntime = process.env.RUNTIME_ENV === 'dev';
export const isUATRuntime = process.env.RUNTIME_ENV === 'uat';
export const isProdRuntime = process.env.RUNTIME_ENV === 'prod';

import { configure } from 'mobx';

module.exports = async () => {
  process.env.RUNTIME_ENV = 'local_dev';
  configure({
    disableErrorBoundaries: true,
    enforceActions: 'observed'
  });
};

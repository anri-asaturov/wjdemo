import { observer } from 'mobx-react';
import React from 'react';
import ComponentWithContext from '../shared/ComponentWithContext';

const format = 'h:mm a ZZ';

/*
 * We need this component to avoid unnecessary re-renders every time clock updates.
 */

@observer
export default class CurrentTime extends ComponentWithContext {
  render() {
    const store = this.context.stores.ui;
    return (
      <>
        Your time: {store.userClock.toFormat(format)}
        {', '}
        Website time: {store.websiteClock.toFormat(format)}
      </>
    );
  }
}

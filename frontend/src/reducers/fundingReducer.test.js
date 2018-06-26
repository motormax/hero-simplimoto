/* eslint-disable no-undef */
import { createStore } from 'redux';

import fundingReducer from './fundingReducer';

describe('fundingReducer', () => {
  set('store', () => createStore(fundingReducer));
  subject(() => store.getState());

  describe('in the beginning', () => {
    its('isDefault', () => isExpected.toBe(false));
    its('isCompleted', () => isExpected.toBe(false));
  });
});

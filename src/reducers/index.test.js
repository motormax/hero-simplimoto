import { combineReducers } from 'redux';

import reducers from '../reducers';

describe('the main reducer', () => {
  it('ignores an unkown action', () => {
    const reducer = combineReducers(reducers)
    expect(reducer({}, { type: 'UNKOWN_ACTION' })).toBeDefined();
  });
});

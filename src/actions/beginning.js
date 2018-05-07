import * as actionTypes from './actionTypes';

export default {
  changeName: name => ({
    type: actionTypes.changeName, name,
  }),
};


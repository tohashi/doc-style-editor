import Dispatcher from '../dispatcher';
import { ActionTypes } from '../constants'

export default {
  update(params) {
    Dispatcher.dispatch({
      actionType: ActionTypes.UPDATE_TEXT,
      params
    });
  },

  remove(key) {
    Dispatcher.dispatch({
      actionType: ActionTypes.REMOVE_TEXT,
      key
    })
  }
};


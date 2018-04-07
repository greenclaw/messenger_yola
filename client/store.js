import {createStore, compose} from 'redux';
import {syncHistoryWithStore} from 'react-router-redux';
import {browserHistory} from 'react-router';

//import root reducer
import rootReducer from './reducers/index';


import chats from './data/chats';
import user_info from './data/user_info';


const defaultState = {
  contacts: {},
  chats: chats,
  current_chat: {},
  user_info: user_info
};

const store = createStore(rootReducer, defaultState);

export const history = syncHistoryWithStore(browserHistory, store);

export default store;

import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';

import chats from './chats';
import contacts from './contacts';
import current_chat from './current_chat';
import user_info from './user_info';

const rootReducer = combineReducers({chats, contacts, current_chat, user_info, routing: routerReducer});

export default rootReducer;

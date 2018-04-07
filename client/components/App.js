import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import React from 'react';
import * as actionCreators from '../actions/actionCreators';
import Main from './Main';


function mapStateToProps(state){
  return{
    contacts: state.contacts,
    chats: state.chats,
    current_chat: state.current_chat,
    user_info: state.user_info
  }
};


function mapDispatchToProps(dispatch){
  return bindActionCreators(actionCreators, dispatch);
};



const App = connect(mapStateToProps, mapDispatchToProps)(Main);


export default App;

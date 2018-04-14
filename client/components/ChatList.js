import React from 'react';
import ChatListItem from './ChatListItem';
var firebase = require('../firebase.js')();


class ChatList extends React.Component{

  render(){
    const Chats = Object.keys(this.props.chats).map((key, index) => {
      return(<ChatListItem key={index} chat={this.props.chats[key]} updateChatId={this.props.updateChatId}/>)
    });
    return(
      <div>
        {Chats}
      </div>
    )
  }
};

export default ChatList;

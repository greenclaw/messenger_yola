import React from 'react';
var firebase = require('../firebase.js')();
var chats = firebase.database().ref('chats');


class ChatListItem extends React.Component{
  changeChat(){
    this.props.updateChatId(this.props.chat.id);
  }
  render(){
    return(
      <div onClick={this.changeChat.bind(this)}>
        {this.props.chat.last_message}
      </div>
    )
  }

}

export default ChatListItem;

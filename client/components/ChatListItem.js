import React from 'react';


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

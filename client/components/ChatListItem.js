import React from 'react';
import classNames from 'classnames';
import { Initial } from 'react-initial';
// var firebase = require('../firebase.js')();
// var chats = firebase.database().ref('chats');


class ChatListItem extends React.Component{

  changeChat(e){
    this.props.updateChatId(this.props.chat.id);
    this.props.contactListItemClick(e);
  }

  render(){
    // return(
    //   <div onClick={this.changeChat.bind(this)}>
    //     {this.props.chat.last_message}
    //   </div>
    // )

    const key = this.props.title + "_" + this.props.chat.id;
    console.log(key, this.props.currentSelectedKey);

    const chatboxUserWrapperClassName = classNames({
      'chatbox_user__wrapper': true,
      'active': key == this.props.currentSelectedKey
    });

    return (
      <div className={chatboxUserWrapperClassName} data-type={this.props.title} data-id={this.props.chat.id} onClick={this.changeChat.bind(this)}>
        <div className='chatbox__user'>
          <div className="initials-wrapper">
            <Initial name={"Title"} charCount={2} fontSize={18} width={40} height={40}/>
          </div>
          <div className="info">
            <div className="name">{"Title"}</div>
            <div className="last_message">{this.props.chat.last_message}</div>
          </div>
        </div>
      </div>
    );
  }

}

export default ChatListItem;

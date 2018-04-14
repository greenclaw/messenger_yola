import React from 'react';
import ChatListItem from './ChatListItem';
import classNames from 'classnames';
// var firebase = require('../firebase.js')();

class ChatList extends React.Component{

  render(){
    // const Chats = Object.keys(this.props.chats).map((key, index) => {
    //   return(<ChatListItem key={index} chat={this.props.chats[key]} updateChatId={this.props.updateChatId}/>)
    // });
    // return(
    //   <div>
    //     {Chats}
    //   </div>
    // )
    console.log(this.props.chats);

    const chatList = Object.keys(this.props.chats).map((key, index) => {
      console.log(this.props.chats, key, this.props.chats[key]);
      return (
        <ChatListItem
          chat={this.props.chats[key]}
          key={index}
          title={this.props.title}
          updateChatId={this.props.updateChatId}
          // is_active={item.is_active}
          currentSelectedKey={this.props.currentSelectedKey}
          contactListItemClick={this.props.contactListItemClick}/>
      );
    });

    const listClassName = classNames({
      'contact-list-wrapper': true,
      'd-none': !this.props.visible
    });

    return (
      <div className={listClassName}>
        <h1>{this.props.title}</h1>
        <div className="contact-list chat-list">
          {chatList}
        </div>
      </div>
    );
  }
};

export default ChatList;

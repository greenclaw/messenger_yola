import React from 'react';
import ChatListItem from './ChatListItem';
import classNames from 'classnames';
// var firebase = require('../firebase.js')();
import { database }  from '../firebase/index'

var users = database.ref('users');

var chats = database.ref('chats');

class ChatList extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      contact_id: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleKeyDown = this.handleKeyDown.bind(this)
  }
  handleChange(event) {
   this.setState({contact_id: event.target.value})
  }
  handleSubmit(e) {
    var t = this;
    var eargs = t.state.contact_id;
    users.orderByChild("uid").equalTo(t.props.user_info.uid).once('value', function(snap){

      var userKey = "";
      Object.keys(snap.val()).map((key, index) => {
        userKey = key;
      });
      var maxid = 0;
      chats.once('value', function(snap){
        var val = snap.val();
        maxid = val['max_id'] + 1;
        console.log(maxid)

        chats.update({max_id: maxid + 1});
        var newChat = {
          id: maxid,
          type: 1,
          participants: {
            1: {uid: t.props.user_info.uid},
            2: {uid: eargs}
          }
        };
        chats.push(newChat);
        users.child(userKey + '/chats').push({
          last_message: "New chat ...",
          id: maxid
        });
        console.log(eargs);
        console.log(t.props.user_info.uid);

        users.orderByChild("uid").equalTo(parseInt(eargs)).once('value', function(snapshot){
          var uk = "";
          console.log(snapshot.val())
          Object.keys(snapshot.val()).map((key, index) => {
            uk = key;
          });
          users.child(uk + '/chats').push({
            last_message: "New chat ...",
            id: maxid
          });
        });

      });

    });
    this.setState({contact_id: ''})
  }

  handleKeyDown(event) {
    if (event.keyCode == 13)
      this.handleSubmit()
  }
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
      <input type="text" placeholder="Type contact id" value={this.state.contact_id} onChange={this.handleChange}
              onKeyDown={this.handleKeyDown}/>
        <h1>{this.props.title}</h1>
        <div className="contact-list chat-list">
          {chatList}
        </div>
      </div>
    );
  }
};

export default ChatList;

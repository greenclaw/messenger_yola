import React from 'react';
import Message from './Message';
import { Initial } from 'react-initial';

import { database }  from '../firebase/index'

var users = database.ref('users');

var chats = database.ref('chats');

class Chat extends React.Component{

  constructor(props){
    super(props)
    this.state = {
      chat_id: "",
      message: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleKeyDown = this.handleKeyDown.bind(this)
  }
  componentWillUpdate(nextProps, nextState){
    var t = this;
    var chat = [];
    var msg_ref = "";
    console.log(nextProps.current_chat)
    if(this.props.current_chat.id != nextProps.current_chat.id && nextProps.current_chat.id != undefined){
      chats.off('value', function(snap){
      });
      console.log(nextProps.current_chat.id)
      chats.orderByChild("id").equalTo(nextProps.current_chat.id).on('value', function(snap){
        var msg_ref = "";
        console.log(snap.val())
        var value = snap.val();
        Object.keys(value).map((key, index) => {
          chat.push({value: value[key], key: key});
        });
        msg_ref += chat[0].key + "/messages"
        console.log(chat[0].value.messages)
        let messages = chat[0].value.messages;
        t.props.updateChat(messages, chat[0].value["id"]);
        chats.child(msg_ref).on('value',  function(snap){
          let messages = snap.val();
          console.log(chat[0].value["id"]);
          t.props.updateChat(messages, chat[0].value["id"]);
        });
      });

    }
  }

  componentDidMount(){
    var t = this;
    users.orderByChild("uid").equalTo(t.props.user_info.uid).once('value', function(snap){
      var user = {}
      var chats = [];
      var users = [];

      var value = snap.val();
      Object.keys(value).map((key, index) => {
        users.push(value[key]);
      });
      user = users[0];
      Object.keys(user.chats).map((key, index) => {
        chats.push(user.chats[key]);
      });
      let chat_id = chats[0].id;

      t.setState({
        chat_id: chat_id
      });

    });

  }

  handleChange(event) {
   this.setState({message: event.target.value})
  }

  handleSubmit() {
    var t = this;
    var key = "";
    console.log(this.props.current_chat.id)
    chats.orderByChild("id").equalTo(parseInt(this.props.current_chat.id)).once('value', function(snapshot){
      var keys = []
      Object.keys(snapshot.val()).map((key, index) => {
        keys.push(key);
      });
      key = keys[0];
      chats.child(key).child('messages').push({
        author_name: t.props.user_info.name,
        uid: t.props.user_info.uid,
        text: t.state.message,
        created_at: Date.now()
        });
    });

    this.setState({message: ''})
  }

  handleKeyDown(event) {
    if (event.keyCode == 13)
      this.handleSubmit()
  }

  render(){
    console.log(this.props);
    if(this.props.current_chat.messages == undefined){
      return(
        <div>
          Loading ...
        </div>
      )
    }
    else{
      let p = this.props
      console.log(p.current_chat.messages)
      var msg_array = [];
      Object.keys(p.current_chat.messages).map((key, index) => {
        msg_array.push(p.current_chat.messages[key]);
      });
      const messages = [ ...msg_array ].map((message, index) => {
        return (
          <Message key={index} author={message.author_name} text={message.text}/>
        )
      })
      return(
        <div className="chatbox__messages">
          <div className="chatbox_profile">
            <div className="d-inline-block d-sm-none btn-back" onClick={this.props.switchMobileToMenu}>
              <i className="fas fa-angle-left"></i>
              <span className="text-back">Back</span>
            </div>
            <div className="initials-wrapper">
              <Initial name={"Roman Varnava"} charCount={2} fontSize={14} width={30} height={30}/>
            </div>
            <div className="name">
              Nickname
            </div>
          </div>
          <div className="messageList">
            {messages}
          </div>
          <div className="chatform">
            <input type="text" placeholder="Message.." value={this.state.message} onChange={this.handleChange}
                    onKeyDown={this.handleKeyDown}/>
          </div>
        </div>
      )
    }
  }
};

export default Chat;

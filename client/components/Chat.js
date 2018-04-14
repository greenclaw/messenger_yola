import React from 'react';
import Message from './Message';

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
    if(this.state.chat_id != nextState.chat_id && nextState.chat_id != ""){
      chats.off('value', function(snap){
      });
      chats.orderByChild("id").equalTo(nextState.chat_id).on('value', function(snap){
        var msg_ref = "";
        console.log(snap.val())
        var value = snap.val();
        Object.keys(value).map((key, index) => {
          chat.push({value: value[key], key: key});
        });
        msg_ref += chat[0].key + "/messages"
        console.log(chat[0].value.messages)
        let messages = chat[0].value.messages;
        t.props.updateChat(messages, chat[0].key);
        chats.child(msg_ref).on('value',  function(snap){
          let messages = snap.val();
          console.log(messages);
          t.props.updateChat(messages, chat[0].key);
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
    chats.child(this.props.current_chat.id).child('messages').push({
      author_name: this.props.user_info.name,
      uid: this.props.user_info.uid,
      text: this.state.message,
      created_at: Date.now()
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
      var msg_array = [];
      Object.keys(p.current_chat.messages).map((key, index) => {
        msg_array.push(p.current_chat.messages[key]);
      });
      const messages = [ ...msg_array ].map((message, index) => {
        return (
          <Message key={index} autor={message.author_name} text={message.text}/>
        )
      })
      return(
        <div>
          <div>
            <div>
              {messages}
            </div>
            <div className="form">
              <input type="text" placeholder="Message.." value={this.state.message} onChange={this.handleChange}
                      onKeyDown={this.handleKeyDown}/>
              <button className="button" onClick={this.handleSubmit} >
                Send
              </button>
            </div>
          </div>
        </div>
      )
    }
  }
};

export default Chat;

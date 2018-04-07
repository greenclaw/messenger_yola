import React from 'react';
import Message from './Message';

var firebase = require('../firebase.js')();
var chats = firebase.database().ref('chats');
var users = firebase.database().ref('users');


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

  componentDidMount(){
    var t = this;
    users.orderByChild("uid").equalTo(this.props.user_info.uid).once('value', function(snap){
      let chat_id = snap.val();
      t.chat_id = chat_id;
    });
  }

  handleChange(event) {
   this.setState({message: event.target.value})
  }

  handleSubmit() {
    this.props.newMessage(this.state.current_chat.id, this.state.message, this.state.user_info.id)
    this.setState({message: ''})
  }

  handleKeyDown(event) {
    if (event.keyCode == 13)
      this.handleSubmit()
  }

  render(){
    let p = this.props
    const messages = [...p.current_chat.messages].reverse().map((message, index) => {
      return (
        <Message key={index} autor={message.autor_name} text={message.text}/>
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
};

export default Chat;

import React from 'react';
import Chat from './Chat';
import ChatList from './ChatList'
import classNames from 'classnames';
import '../style.css'

class Messanger extends React.Component{

  render(){
    var chatWindowClassName = classNames({
      'col-12': true,
      'col-sm-8': true,
      'px-0': true,
      'd-sm-block': true,
      'd-none': false
    });
    return(
      <div className='container px-0 d-flex align-items-center main-container'>
        <div>
          <ChatList chats={this.props.chats} updateChatId={this.props.updateChatId} onChatChange={this.props.updateChat}/>
        </div>
        <div className='chatbox row mx-0'>
          <div className={chatWindowClassName}>
            <Chat { ...this.props }/>
          </div>
        </div>
      </div>
    )
  }
};

export default Messanger;

import React from 'react';
import classNames from 'classnames';


class Message extends React.Component{
  constructor(props) {
    super(props);
  }

  render(){
    var chatboxMessageClassName = classNames({
      'chatbox__messages__user-message': true,
      'right': true
    });
    console.log()
    return (
      <div className={chatboxMessageClassName}>
        <div className="chatbox__messages__user-message--ind-message">
          <div className="text">{this.props.author}</div>
          <div className="text">{this.props.text}</div>
        </div>
      </div>
    );
  }
};

export default Message;

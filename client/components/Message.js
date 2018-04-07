import React from 'react';


class Message extends React.Component{
  constructor(props) {
    super(props);
  }

  render(){
    return (
      <div>
        <div>
          <div>
            {this.props.autor}
          </div>
          <div>
            {this.props.text}
          </div>
        </div>
      </div>
  }
};

export default Message;

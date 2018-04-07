import React from 'react';
import Chat from './Chat';


class Messanger extends React.Component{

  render(){
    return(
      <div>
        <Chat { ...this.props }/>
      </div>
    )
  }
};

export default Messanger;

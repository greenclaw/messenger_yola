import React from 'react';
import {Link} from 'react-router';
// var firebase = require('../firebase.js')();
// var users = firebase.database().ref('users');
import {database} from '../firebase/index';
var users = database.ref('users');

class Main extends React.Component{


  componentDidMount(){
    var t = this;
    users.orderByChild("uid").equalTo(t.props.user_info.uid).on('value', function(snap){
      var value = snap.val();
      var chats = {};
      Object.keys(value).map((key, index) => {
        chats = value[key].chats;
      });
      t.props.updateChatList(chats);
    });
  }

  render(){
    return(
      <div>
        <h1>
          <Link to="/">Yola Messanger</Link>
        </h1>
        {React.cloneElement(this.props.children, this.props)}
      </div>
    )
  }
};

export default Main;

import React from 'react';
var firebase = require('../firebase.js');
import { Link } from 'react-router';
import CSSTransitionGroup from 'react-addons-css-transition-group';

var googleProvider = new firebase.auth.GoogleAuthProvider();

class Authorization extends React.Component{

  constructor(props) {
    super(props);
    firebase.auth().useDeviceLanguage();
  }

  userSignUp(email, password) {
    firebase.auth().createUserWithEmailAndPassword(email, password).catch((error) => {
      // Handle Errors here.
      if (!error) {
        
      } else {
        var errorCode = error.code;
        var errorMessage = error.message;
      }
    });
  }


  userSignIn(email, password) {
    firebase.auth().signInWithEmailAndPassword(email, password).catch((error) => {
      // Handle Errors here.
      if (!error)
      {
        
      } else {
        var errorCode = error.code;
        var errorMessage = error.message;
      }
    });
  }

  render(){
    
    return(
      <div>
        <div type="button">
          Registration
        </div>
        <div type="button">
          Login
        </div>
        <div type="button">
          Google
        </div>
        {/* <div type="button">
          Login Vk
        </div> */}
      </div>
    )
  }
};

export default Authorization;

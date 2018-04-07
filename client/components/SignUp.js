import React from 'react';
var firebase = require('../firebase.js')();

 var users = firebase.database().ref('users');

import { Link } from 'react-router';
import CSSTransitionGroup from 'react-addons-css-transition-group';

var googleProvider = new firebase.auth.GoogleAuthProvider();

class Authorization extends React.Component{

  constructor(props) {
    super(props);
    firebase.auth().useDeviceLanguage();

    this.userSignUp = this.userSignUp.bind(this);

    this.state = {
      login: '',
      password: '',
      name: ''
    }
  }

  userSignUp() {
    var t = this;

    firebase.auth().createUserWithEmailAndPassword(this.state.login, this.state.password).then((result) => {
      // Handle Errors here.
      var next_id = 0
      console.log(result)
      users.once('value', (snapshot) => {
        next_id = snapshot.val().max_id  + 1
        users.update({
          max_id: next_id
        })
        users.push({
          name: t.state.name,
          uid: next_id
        })
      })
    }).catch((error) => {
      if (!error) {
        console.log(t.state.login)
        console.log(t.state.password)
      } else {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log("Error code: " + errorCode);
        console.log("Error message: " + errorMessage);
      }
    });
  }

  
  handleChange(event) {
    console.log(event)
    let change = {}
    change[event.target.name] = event.target.value
    this.setState(change)
  };

  render(){
    
    return(
      <div className="form">
        <input
          type="login"
          name="name"
          id="sign_in_login"
          onChange={this.handleChange.bind(this)}
          value={this.state.name}
          placeholder="Name"
        >
        </input>
        <input
          type="login"
          name="login"
          id="sign_up_login"
          onChange={this.handleChange.bind(this)}
          value={this.state.login}
          placeholder="Login/Email"
        >
        </input>
        <input
          type="password"
          name="password"
          id="sign_up_password"
          onChange={this.handleChange.bind(this)}
          value={this.state.password}
          placeholder="Password"
        >
        </input>
        <input
          type="password"
          name="confirmation"
          id="sign_up_confirmation"
          onChange={this.handleChange.bind(this)}
          value={this.state.confirmation}
          placeholder="Password confirmation"
        >
        </input>
        <button 
          type="submit"
          onClick={() => {this.userSignUp()}}
        >
          Sign Up
        </button>
    
      </div>
    )
  }
};

export default Authorization;

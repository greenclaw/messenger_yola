import React from 'react';
var firebase = require('../firebase.js')();

import SignUp from './SignUp'
import SignIn from './SignIn'

var users = firebase.database().ref('users');

import { Link } from 'react-router';
import CSSTransitionGroup from 'react-addons-css-transition-group';

var googleProvider = new firebase.auth.GoogleAuthProvider();

class Authorization extends React.Component{

  constructor(props) {
    super(props);
    firebase.auth().useDeviceLanguage();

    this.userSignIn = this.userSignIn.bind(this);
    this.userSignUp = this.userSignUp.bind(this);

    this.state = {
      login: '',
      password: '',
      name: '',
      confirmation: ''
    }
  }

  userSignUp() {
    var t = this;

    firebase.auth().createUserWithEmailAndPassword(this.state.login, this.state.password).then(function(result, error){
      // Handle Errors here.
      if (!error) {
        console.log(t.state.login)
        console.log(t.state.password)
        var next_id = 0;
        users.once('value', function(snapshot){
          next_id = snapshot.val().max_id  + 1
          users.update({
            max_id: next_id
          })
          users.push({
            name: t.state.name,
            uid: next_id
          })
          
        })
       
      } else {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log("Error code: " + errorCode);
        console.log("Error message: " + errorMessage);
      }
    });
  }


  userSignIn() {
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
          Registration
        </button>
        


        {/* <input
          type="login"
          id="sign_in_login"
          onChange={this.handleChange.bind(this)}
          value={this.state.login}
          placeholder="Login/Email"
        >
        </input>
        <input
          type="password"
          id="sign_in_password"
          onChange={this.handleChange.bind(this)}
          value={this.state.password}
          placeholder="Password"
        >
        </input>
        <button 
          type="button"
          onClick={(event) => {this.userSignIn()}}
        >
          Login
        </button> */}
        {/* <Link type="button">
          Google
        </Link> */}
        {/* <div type="button">
          Login Vk
        </div> */}
      </div>
    )
  }
};

export default Authorization;

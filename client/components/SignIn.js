import React from 'react';
import { auth, firebase} from '../firebase/index';

import SignUp from './SignUp'
import SignIn from './SignIn'

var users = firebase.database().ref('users');

import { Link } from 'react-router';
import CSSTransitionGroup from 'react-addons-css-transition-group';

var googleProvider = new firebase.auth.GoogleAuthProvider();


const INITIAL_STATE = {
  login: '',
  password: '',
  error: ''
}

class Authorization extends React.Component{

  constructor(props) {
    super(props);

    this.userSignIn = this.userSignIn.bind(this);

    this.state = {...INITIAL_STATE}
  }

  userSignIn(event) {
    var t = this;
    auth.signInWithEmailAndPassword(email, password).then((result) => {
      // Handle Errors here.
      if (!error) {
        console.log(t.state.login)
        console.log(t.state.password)
        users.once('value', (snapshot) => {
          
        })
       
      } else {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log("Error code: " + errorCode);
        console.log("Error message: " + errorMessage);
      }
    }).catch((error) => {
      if (!error) {
        console.log(t.state.login)
        console.log(t.state.password)
      } else {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log('Error code: ' + errorCode);
        console.log('Error message: ' + errorMessage);
      }
    });
    event.preventDefault();
  }

  
  handleChange(event) {
    console.log(event)
    let change = {}
    change[event.target.name] = event.target.value
    this.setState(change)
  };

  
  signInGoogle(event) {
    auth.signInWithPopup(provider).then(function(result) {
      // This gives you a Google Access Token. You can use it to access the Google API.
      var token = result.credential.accessToken;
      // The signed-in user info.
      var user = result.user;
      // ...
    }).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      // ...
    });
  } 

  render(){

    const {
      login,
      password,
      error,
    } = this.state;

    const isInvalid =
      password === '' ||
      login === '';

    
    return(

      <div id="sectionA" className="tab-pane fade show active">
        <div className="innter-form">
          <form className="sa-innate-form" onSubmit={this.userSignIn}>
            <input
              type="login"
              name="login"
              id="sign_in_login"
              onChange={this.handleChange.bind(this)}
              value={this.state.login}
              placeholder="Login/Email" >
            </input>
            <input
              type="password"
              name="password"
              id="sign_in_password"
              onChange={this.handleChange.bind(this)}
              value={this.state.password}
              placeholder="Password" >
            </input>
            <button 
              type="submit"
              disabled={isInvalid}
            >
              Sign In
            </button>
          </form>
        </div>

        <div className="social-login">
          <p>- - - - - - - - - - - - - Sign In With - - - - - - - - - - - - - </p>
          <ul>
              <li><button onClick={this.signInGoogle}><i className="fa fa-facebook"></i> Facebook</a></li>
              <li><a href=""><i className="fa fa-google-plus"></i> Google+</a></li>
              <li><a href=""><i className="fa fa-twitter"></i> Twitter</a></li>
          </ul>
        </div>
      </div>
    )
  }
};

export default Authorization;
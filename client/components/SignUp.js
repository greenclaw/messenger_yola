import React from 'react';
import { auth, database, firebase } from '../firebase/index';

import WebcamCapture from './WebcamCapture';

var users = database.ref('users');
var storageRef = firebase.storage().ref('/users');

import { Link } from 'react-router';
import CSSTransitionGroup from 'react-addons-css-transition-group';

var googleProvider = new firebase.auth.GoogleAuthProvider();

const INITIAL_STATE = {
  login: '',
  password: '',
  confirmation: '',
  name: '',
  error: ''
}
  
class SignUp extends React.Component{
  
  constructor(props) {
    super(props);

    this.userSignUp = this.userSignUp.bind(this);

    this.state = {...INITIAL_STATE}
  }

  userSignUp(event) {
    event.preventDefault();
    var t = this;

    auth.doCreateUserWithEmailAndPassword(this.state.login, this.state.password).then((result) => {
      // Handle Errors here.
      // var next_id = 0


      var currentUser = firebase.auth().currentUser;
      currentUser.updateProfile({
        displayName: t.state.name
      }).then(() => {
        console.log("display name updated successfull");
      }).catch((error) => {
        console.error('display name update with error: ' + error)
      })

      console.log('current user: ' + currentUser.displayName)

      users.push({
        name: t.state.name,
        uid: currentUser.uid
      })
        
    }).catch((error) => {
      this.setState({error})
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

  }

  signUpGoogle(event) {
    auth.signInWithPopup(googleProvider).then((result) => {
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

  uploadPhoto(file) {
    var currentUser = firebase.auth().currentUser;
    var photoRef = storageRef.child(file.name);
    photoRef.put(file).then((snapshot) => {

      currentUser.updateProfile({
        photoRef: photoRef.fullPath
      });
    })
    
  }
  
  handleChange(event) {
    console.log(event)
    let change = {}
    change[event.target.name] = event.target.value
    this.setState(change)
  }

  // onSubmit(event) {
  //   event.preventDefault();
  // }

  render(){
    const {
      name,
      login,
      password,
      confirmation,
      error,
    } = this.state;

    const isInvalid =
      password !== confirmation ||
      password === '' ||
      login === '' ||
      name === '';

    return(
      <div id="sectionB" className="tab-pane fade">
			    <div className="innter-form">
            
            <form className="sa-innate-form" onSubmit={this.userSignUp}>
              <input
                type="login"
                name="name"
                id="sign_up_name"
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
                disabled={isInvalid}
              >
                Sign Up
              </button>
              <p>By clicking Join now, you agree to hifriends's User Agreement, Privacy Policy, and Cookie Policy.</p>
            </form>
          </div>
          <div className="social-login">
            <p>- - - - - - - - - Register With - - - - - - - - - </p>
			      <ul>
              <li><button onClick={this.signUpGoogle}><i className="fa fa-google-plus"></i> Google+</button></li>
            </ul>
          </div>
        </div>

    )
  }
};

export default SignUp;

import React from 'react';
import { auth, firebase } from '../firebase/index';

var users = firebase.database().ref('users');

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

class Authorization extends React.Component{

  constructor(props) {
    super(props);

    this.userSignUp = this.userSignUp.bind(this);

    this.state = {...INITIAL_STATE}
  }

  userSignUp(event) {
    var t = this;

    auth.createUserWithEmailAndPassword(this.state.login, this.state.password).then((result) => {
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
        console.log('Error code: ' + errorCode);
        console.log('Error message: ' + errorMessage);
      }
    });
    event.preventDefault();
  }

  signUpGoogle(event) {

  }

  handleChange(event) {
    console.log(event)
    let change = {}
    change[event.target.name] = event.target.value
    this.setState(change)
  }

  onSubmit(event) {
    event.preventDefault();
  }

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
              <p>By clicking Join now, you agree to hifriends''s User Agreement, Privacy Policy, and Cookie Policy.</p>
            </form>
          </div>
          <div className="social-login">
            <p>- - - - - - - - - Register With - - - - - - - - - </p>
			      <ul>
              <li><button onClick={this.signUpGoogle}><i className="fa fa-facebook"></i> Facebook</button></li>
              <li><a href=""><i className="fa fa-google-plus"></i> Google+</a></li>
              <li><a href=""><i className="fa fa-twitter"></i> Twitter</a></li>
            </ul>
          </div>
        </div>

    )
  }
};

export default Authorization;

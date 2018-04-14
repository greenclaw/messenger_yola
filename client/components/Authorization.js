import React from 'react';

import SignUp from './SignUp'
import SignIn from './SignIn'

// import './Authorization.css';

import { Link } from 'react-router';
import CSSTransitionGroup from 'react-addons-css-transition-group';

class Authorization extends React.Component{

  constructor(props) {
    super(props);
  }

  render(){

    return(
      <div className="container px-0 d-flex align-items-center main-container">
        <div className="chatbox row d-flex align-items-center justify-content-center">
          <div className="col-md-6">
            <div className="form-body auth-form">
              <ul className="nav nav-tabs final-login auth-type-switcher">
                  <li className="nav-item col-6 px-0"><a className="switch nav-link active show" data-toggle="tab" aria-controls="sectionA" aria-selected="true" role="tab" href="#sectionA">Sign In</a></li>
                  <li className="nav-item col-6 px-0" ><a className="switch nav-link" data-toggle="tab" aria-controls="sectionB" aria-selected="false" href="#sectionB">Join us!</a></li>
              </ul>
              <div className="tab-content my-2">

                <SignUp></SignUp>

                <div className="clearfix"></div>

                <SignIn></SignIn>

              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
};

export default Authorization;

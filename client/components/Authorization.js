import React from 'react';

import SignUp from './SignUp'
import SignIn from './SignIn'

import './Authorization.css'

import { Link } from 'react-router';
import CSSTransitionGroup from 'react-addons-css-transition-group';

class Authorization extends React.Component{

  constructor(props) {
    super(props);
  }

  render(){
    
    return(

      <div className="container">
        <div className="row">
          <div className="col-md-4 col-md-offset-4">
            <div className="form-body">
              <ul className="nav nav-tabs final-login">
                  <li className="nav-item"><a className="nav-link active show" data-toggle="tab" aria-controls="sectionA" aria-selected="true" role="tab" href="#sectionA">Sign In</a></li>
                  <li className="nav-item" ><a className="nav-link" data-toggle="tab" aria-controls="sectionB" aria-selected="false" href="#sectionB">Join us!</a></li>
              </ul>
              <div className="tab-content">

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

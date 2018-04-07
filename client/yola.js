import React from 'react';
import {render} from 'react-dom';

//import components
import App from './components/App';
import Messanger from './components/Messanger';
import Authorization from './components/Authorization';
import Settings from './components/Settings';
import Profile from './components/Profile';



//import react router deps
import {Router, Route, IndexRoute, browserHistory} from 'react-router';

import {Provider} from 'react-redux';
import store from './store';
import {history} from './store';

const router = (
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={App}>
        <IndexRoute component={Messanger}></IndexRoute>
        <Route path="/auth" component={Authorization}></Route>
        <Route path="/settings" component={Settings}></Route>
        <Route path="/profile" component={Profile}></Route>
      </Route>
    </Router>
  </Provider>
);

render(router, document.getElementById('root'));

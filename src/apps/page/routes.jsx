/**
 * Created by dady on 2017/12/15.
 */

import React, {Component} from 'react';
import Detail from './detail/index.jsx';
import Pay from './pay/index.jsx';

import {
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';

class Routes extends Component {

  render() {
    return (
      <Switch>
        <Route exact path="/detail" component={Detail}/>
        <Route exact path="/pay" component={Pay}/>
        <Redirect from="/" to="/detail"/>
      </Switch>
    );
  }
}

export default Routes;
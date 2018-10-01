import React from 'react';
import Layout from './high-order-comp/Layout';
import {Switch,Route} from 'react-router-dom'
import Home from './components/home/index'
import SignIn from './components/sign_in/index'
import Dashboard from './components/admin/dashboard'


const Routes = props => {
  return (
      <Layout>
        <Switch>
          <Route exact component={Home} path='/'></Route>
          <Route exact component={SignIn} path='/sign_in'></Route>
          <Route exact component={Dashboard} path='/dashboard'></Route>
        </Switch>
      </Layout>
  )
};

export default Routes;

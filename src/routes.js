import React from 'react';
import Layout from './high-order-comp/Layout';
import {Switch,Route} from 'react-router-dom'
import Home from './components/home/index'


const Routes = props => {
  return (
      <Layout>
        <Switch>
          <Route exact component={Home} path='/'></Route>
        </Switch>
      </Layout>
  )
};

export default Routes;

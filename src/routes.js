import React from 'react';
import Layout from './high-order-comp/Layout';
import {Switch} from 'react-router-dom'
import Home from './components/home/index'
import SignIn from './components/sign_in/index'
import Dashboard from './components/admin/dashboard'
import PrivateRoutes from './components/authRoutes/privateRoutes'
import PublicRoutes from './components/authRoutes/publicRoutes'


const Routes = (props) => {


  return (
      <Layout>
        <Switch>
          <PublicRoutes {...props} restricted={true} path='/sign_in' exact component={SignIn}></PublicRoutes>
          <PublicRoutes {...props} restricted={false} path='/' exact component={Home}></PublicRoutes>
          <PrivateRoutes {...props} path='/dashboard' exact component={Dashboard}></PrivateRoutes>
        </Switch>
      </Layout>
  )
};

export default Routes;

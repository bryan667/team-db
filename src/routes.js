import React from 'react';
import Layout from './high-order-comp/Layout';
import {Switch} from 'react-router-dom'
import Home from './components/home/index'
import SignIn from './components/sign_in/index'
import Dashboard from './components/admin/dashboard'
import PrivateRoutes from './components/authRoutes/privateRoutes'
import PublicRoutes from './components/authRoutes/publicRoutes'
import AdminMatches from './components/admin/matches/index'
import AddEditMatch from './components/admin/matches/addeditmatch'

const Routes = (props) => {


  return (
      <Layout>
        <Switch>
          <PublicRoutes {...props} restricted={true} path='/sign_in' exact component={SignIn}></PublicRoutes>
          <PublicRoutes {...props} restricted={false} path='/' exact component={Home}></PublicRoutes>
          <PrivateRoutes {...props} path='/dashboard' exact component={Dashboard}></PrivateRoutes>
          <PrivateRoutes {...props} path='/admin_matches' exact component={AdminMatches}></PrivateRoutes>
          <PrivateRoutes {...props} path='/admin_matches/edit_match/:id' exact component={AddEditMatch}></PrivateRoutes>
        </Switch>
      </Layout>
  )
};

export default Routes;

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
import AdminPlayers from './components/admin/players/index'
import AddEditPlayers from './components/admin/players/addeditplayers'
import TheTeam from './components/the_team/index'
import TheMatches from './components/the_matches/index'
import NotFound404 from './components/ui/404'

const Routes = (props) => {


  return (
      <Layout>
        <Switch>
          <PublicRoutes {...props} restricted={true} path='/sign_in' exact component={SignIn}></PublicRoutes>
          <PublicRoutes {...props} restricted={false} path='/' exact component={Home}></PublicRoutes>
          <PublicRoutes {...props} restricted={false} path='/the_team' exact component={TheTeam}></PublicRoutes>
          <PublicRoutes {...props} restricted={false} path='/the_matches' exact component={TheMatches}></PublicRoutes>
          <PrivateRoutes {...props} path='/dashboard' exact component={Dashboard}></PrivateRoutes>
          <PrivateRoutes {...props} path='/admin_matches' exact component={AdminMatches}></PrivateRoutes>
          <PrivateRoutes {...props} path='/admin_matches/edit_match/:id' exact component={AddEditMatch}></PrivateRoutes>
          <PrivateRoutes {...props} path='/admin_matches/edit_match/' exact component={AddEditMatch}></PrivateRoutes>
          <PrivateRoutes {...props} path='/admin_players/' exact component={AdminPlayers}></PrivateRoutes>
          <PrivateRoutes {...props} path='/admin_players/add_player/:id' exact component={AddEditPlayers}></PrivateRoutes>
          <PrivateRoutes {...props} path='/admin_players/add_player/' exact component={AddEditPlayers}></PrivateRoutes>
          <PublicRoutes {...props} restricted={false} component={NotFound404}></PublicRoutes>
        </Switch>
      </Layout>
  )
};

export default Routes;

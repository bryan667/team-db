import React from 'react';
import ReactDOM from 'react-dom';
import './Resources/css/app.css';

import { BrowserRouter } from 'react-router-dom';
import Routes from './routes';
import {firebase} from './firebase-db'

const App = (props) => {
  return (
    <BrowserRouter>
      <Routes {...props}/>
    </BrowserRouter>
  );
};

firebase.auth().onAuthStateChanged((user)=> {
  //pass user as props
  ReactDOM.render(<App user={user}/>, document.getElementById('root'));
})


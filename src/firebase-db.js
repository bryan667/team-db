import firebase from 'firebase/app'
import 'firebase/app'
import 'firebase/database'

const config = {
    apiKey: "AIzaSyAygwG-PUs0oeJR2AV16tQD98bSg2iyYOU",
    authDomain: "team-db-b1e44.firebaseapp.com",
    databaseURL: "https://team-db-b1e44.firebaseio.com",
    projectId: "team-db-b1e44",
    storageBucket: "team-db-b1e44.appspot.com",
    messagingSenderId: "1053033075444"
  };

  firebase.initializeApp(config);

  const firebaseDB = firebase.database()
  const firebaseMatches = firebaseDB.ref('matches')

  export { 
      firebase,
      firebaseMatches
    }
import firebase from 'firebase/app';
import 'firebase/app';
import 'firebase/database';
import 'firebase/auth';
import 'firebase/storage';

const config = {
  apiKey: 'AIzaSyDJgOgrBEdy3fZLUnvgLGw5v_JJDB4sUAU',
  authDomain: 'm-city-1a92c.firebaseapp.com',
  databaseURL: 'https://m-city-1a92c.firebaseio.com',
  projectId: 'm-city-1a92c',
  storageBucket: 'm-city-1a92c.appspot.com',
  messagingSenderId: '645438815650'
};

firebase.initializeApp(config);

const firebaseDB = firebase.database();
const firebaseMatches = firebaseDB.ref('matches');
const firebasePromotions = firebaseDB.ref('promotions');
const firebaseTeams = firebaseDB.ref('teams');
const firebasePlayers = firebaseDB.ref('players');

export {
  firebase,
  firebaseMatches,
  firebasePromotions,
  firebaseTeams,
  firebasePlayers,
  firebaseDB,
};

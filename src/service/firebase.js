import firebase from 'firebase/compat/app';
import 'firebase/compat/database';

const firebaseConfig = {
    apiKey: "AIzaSyA9i_loG1r0zVQbAu8fK9_CUb8EzXksSIc",
    authDomain: "pokemon-game-6972e.firebaseapp.com",
    databaseURL: "https://pokemon-game-6972e-default-rtdb.firebaseio.com",
    projectId: "pokemon-game-6972e",
    storageBucket: "pokemon-game-6972e.appspot.com",
    messagingSenderId: "52359996645",
    appId: "1:52359996645:web:780ae0e1cf67ddb8c6a00c"
  };

  firebase.initializeApp(firebaseConfig);

  export const fire = firebase;
  export const database = fire.database();

  export default database;
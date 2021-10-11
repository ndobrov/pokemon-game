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

class Firebase {
  constructor() {
    this.host = 'https://pokemon-game-6972e-default-rtdb.firebaseio.com/';
    this.localID = null;
  }

  token = () => localStorage.getItem('idToken');

  setLocalID = (localId) => {
    this.localID = localId;
  }

  checkLocalID() {
    if (!this.localID) {
      throw {
        msg: 'LocalID is doesn\'t exist',
      }
    }
  }

  getPokemonSoket = async () => {
    try {
      this.checkLocalID();
      const res = await fetch(`${this.host}/${this.localID}/pokemons.json?auth=${this.token()}`).then(res => res.json());
      return res;
    } catch (e) {

    }
  }

  addPokemon = async (data, localId) => {
    const res = await fetch(`${this.host}/${localId}/pokemons.json?auth=${this.token()}`,{
        method: 'POST',
        body: JSON.stringify(data),
    }).then(res => res.json());

    return res;
  }

}

const FirebaseClass = new Firebase();

export default FirebaseClass;
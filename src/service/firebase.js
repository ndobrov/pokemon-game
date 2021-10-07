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
    this.fire = firebase;
    this.database = this.fire.database();
  }

  getPokemonSoket = (cb) => {
    this.database.ref('pokemons').on('value', (snapshot) => {
      cb(snapshot.val());
    })
  }

  offPokemonSoket = () => {
    this.database.ref('pokemons').off();
  }

  getPokemonsOnce = async () => {
    return await this.database.ref('pokemons').once('value').then(snapshot => snapshot.val()); 
  }

  postPokemon = ( key, pokemon) => {
    this.database.ref(`pokemons/${key}`).set(pokemon);
  }

  addPokemon = (data, cb) => {
    const newKey = this.database.ref().child('pokemons').push().key;
    this.database.ref('pokemons/' + newKey).set(data).then(() => cb);
  }

}

const FirebaseClass = new Firebase();

export default FirebaseClass;
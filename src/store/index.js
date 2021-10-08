import { configureStore } from "@reduxjs/toolkit";
import pokemonsReducer from './pokemons';
import pokemonsTwoReducer from './pokemonsPlayerTwo';
import userReducer from './user';
import gameReducer from './game';


export default configureStore({
    reducer: {
        user: userReducer,
        pokemons: pokemonsReducer,
        pokemonsPlayerTwo: pokemonsTwoReducer,
        game: gameReducer,
    }
})
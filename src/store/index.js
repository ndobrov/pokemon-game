import { configureStore } from "@reduxjs/toolkit";
import pokemonsReducer from './pokemons';
import pokemonsTwoReducer from './pokemonsPlayerTwo';
import userReducer from './user';



export default configureStore({
    reducer: {
        user: userReducer,
        pokemons: pokemonsReducer,
        pokemonsPlayerTwo: pokemonsTwoReducer,
    }
})
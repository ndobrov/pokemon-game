import { configureStore } from "@reduxjs/toolkit";
import pokemonsReducer from './pokemons';
import pokemonsTwoReducer from './pokemonsPlayerTwo';


export default configureStore({
    reducer: {
        pokemons: pokemonsReducer,
        pokemonsPlayerTwo: pokemonsTwoReducer,
    }
})
import { createSlice } from "@reduxjs/toolkit";
import FirebaseClass from "../service/firebase";


export const slice = createSlice({
    name: 'pokemonsPlayerTwo',
    initialState: {
        isLoading: false,
        data: {},
        error: null,
    },
    reducers: {
        fetchPokemons: state => ({
            ...state,
            isLoading: true,
        }),

        fetchPokemonsResolve: (state, action) => ({
            ...state,
            isLoading: false,
            data: action.payload,
        }),

        fetchPokemonsReject: (state, action) => ({
            ...state,
            isLoading: false,
            data: [],
            error: action.payload,
        }),

        selectPokemonTwo: (state, action) => ({
            ...state,
            pokemonsPlayerTwo: {...action.payload}

        }),
    }
});

export const {fetchPokemons, fetchPokemonsResolve, fetchPokemonsReject} = slice.actions;

export const selectPokemonsLoading = state => state.pokemonsPlayerTwo.isLoading;
// export const selectPokemonsData =  state => state.pokemonsPlayerTwo.data;

export const selectPokemonsPlayerTwo = state => state.pokemonsPlayerTwo.pokemonsPlayerTwo;
export const pokemonsPlTwoData = state => state.pokemonsPlayerTwo.data;

export const getPokemonsPlayerTwoAsync = () => async (dispatch) => {
    dispatch(fetchPokemons());
    const data = await fetch('https://reactmarathon-api.netlify.app/api/create-player');
    const player2Request = await data.json();
    dispatch(fetchPokemonsResolve(player2Request));
    console.log('1',player2Request)
}

export const addPokemonToFirebase = (selectedPokemon, cb) => {
    FirebaseClass.addPokemon(selectedPokemon, cb);
}

export default slice.reducer;
import { createSlice } from "@reduxjs/toolkit";

export const slice = createSlice({
    name: 'pokemonsPlayerTwo',
    initialState: {
        isLoading: false,
        data: [],
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

    }
});

export const {fetchPokemons, fetchPokemonsResolve, selectPokemonTwo} = slice.actions;

export const selectPokemonsLoading = state => state.pokemonsPlayerTwo.isLoading;

export const selectPokemonsPlayerTwo = state => state.pokemonsPlayerTwo.pokemonsPlayerTwo;
// export const pokemonsPlTwoData = state => state.pokemonsPlayerTwo.data;

export const getPokemonsPlayerTwoAsync = () => async (dispatch) => {
    dispatch(fetchPokemons());
    const data = await fetch('https://reactmarathon-api.netlify.app/api/create-player');
    const player2Request = await data.json();
    dispatch(fetchPokemonsResolve(player2Request.data));
    console.log('1',player2Request.data)
}

export default slice.reducer;
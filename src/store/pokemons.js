import { createSlice } from "@reduxjs/toolkit";
import { selectLocalId } from "./user";


export const slice = createSlice({
    name: 'pokemons',
    initialState: {
        isLoading: false,
        data: {},
        error: null,
        selectedPokemons: {},
        pokemonsPlayerTwo: [],
        playerTwo: [],
        winner: false, 
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
            data: {},
            error: action.payload,
        }),

        selectPokemon: (state, action) => {
            const newCards = { ...state.selectedPokemons };
            if (newCards[action.payload.id]) {

                delete newCards[action.payload.id];
                return {...state, selectedPokemons: newCards};
            }
            newCards[action.payload.id] = action.payload;
            return { 
                ...state, 
                    selectedPokemons: {
                        ...state.selectedPokemons,
                        [action.payload.id]: action.payload,
                    }
        }},

        clearState: state => ({
            ...state,
            selectedPokemons: {},
        }),

        hendlerWinner: (state, action)  => ({
            ...state,
            winner: action.payload,
        })
    }
})

export const {
    fetchPokemons, 
    fetchPokemonsResolve, 
    fetchPokemonsReject, 
    selectPokemon,
    clearState,
    hendlerWinner 
} = slice.actions;

export const selectPokemonsLoading = state => state.pokemons.isLoading;
export const selectPokemonsData =  state => state.pokemons.data;
export const selectSelectedPokemons = state => state.pokemons.selectedPokemons;

export const winnerPlayer = state => state.pokemons.winner;

export const getPokemonsAsync = () => async (dispatch, getState) => {
    const localId = selectLocalId(getState());
    dispatch(fetchPokemons());
    const data = await fetch(`https://pokemon-game-6972e-default-rtdb.firebaseio.com/${localId}/pokemons.json`).then(res => res.json());
    dispatch(fetchPokemonsResolve(data));
}

export default slice.reducer;



import { createSlice } from "@reduxjs/toolkit";
import FirebaseClass from "../service/firebase";


export const slice = createSlice({
    name: 'pokemons',
    initialState: {
        isLoading: false,
        data: {},
        error: null,
        selectedPokemons: {},
        pokemonsPlayerTwo: [],
        playerTwo: [],
        winner: null, 
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

export const winner = state => state.pokemons.winner;

export const getPokemonsAsync = () => async (dispatch) => {
    dispatch(fetchPokemons());
    const data = await FirebaseClass.getPokemonsOnce();
    dispatch(fetchPokemonsResolve(data));
}


export default slice.reducer;



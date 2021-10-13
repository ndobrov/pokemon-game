import { createSlice } from "@reduxjs/toolkit";


export const slice = createSlice({
    name: 'user',
    initialState: {
        isLoading: true,
        isOpenModalLogin: false,
        data: {},
    },
    reducers: {
        fetchUser: state => ({
            ...state,
            isLoading: true,
        }),
        openModal: (state, action) => ({
            ...state,
            isOpenModalLogin: action.payload,
        }),
        updateUser: (state, action) => ({
            isLoading: false,
            data: action.payload,
        }),
        removeUser: () => ({
            isLoading: false,
            data: {},
        })
    }
});

export const {fetchUser,  updateUser, removeUser, openModal} = slice.actions;

export const selectUserLoading = state => state.user.isLoading;
export const selectUser = state => state.user.data;
export const selectLocalId = state => state.user.data?.localId;
export const selectOpenModal = state => state.user.isOpenModalLogin;
console.log();

export const getUserUpdateAsync = () => async (dispatch) => {
    const idToken = localStorage.getItem('idToken');
    if (idToken) {
        const requestOptions = {
            method: 'POST',
            body: JSON.stringify({
                idToken,
            })
        };
        const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyA9i_loG1r0zVQbAu8fK9_CUb8EzXksSIc', requestOptions).then(res => res.json());

        if (response.hasOwnProperty('error')) {
            localStorage.removeItem('idToken');
            dispatch(removeUser());
        } else {
            dispatch(updateUser(response.users[0]));
        }

    } else {
        dispatch(removeUser());
    }
}

export const getUserAsync = () => (dispatch) => {
    dispatch(fetchUser());
    dispatch(getUserUpdateAsync());
}

export const addPokemonToFirebase = (selectedPokemon, localId) =>  {
    const idToken = localStorage.getItem('idToken');
     fetch(`https://pokemon-game-6972e-default-rtdb.firebaseio.com/${localId}/pokemons.json?auth=${idToken}`, {
                            method: 'POST',
                            body: JSON.stringify(selectedPokemon),
                        });
}

export default slice.reducer;
















import Modal from "../../../Modal"
import LoginForm from "../.."

import { useDispatch } from 'react-redux';
import { NotificationManager } from 'react-notifications';
import { getUserUpdateAsync } from '../../../../store/user';


const loginSignupUser = async ({email, password, type}) => {
    const requestOptions = {
        method: 'POST',
        body: JSON.stringify({
            email,
            password,
            returnSecureToken: true,
        })
    };

    switch (type) {
        case 'signup': 
            return await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyA9i_loG1r0zVQbAu8fK9_CUb8EzXksSIc', requestOptions).then(res => res.json());
        case 'login':   
            return await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyA9i_loG1r0zVQbAu8fK9_CUb8EzXksSIc', requestOptions).then(res => res.json());
        default:
            return 'I cannot login user';
    }
}

const ModalLogin = ({isOpenMod, onCloseModal}) => {

    const dispatche = useDispatch();
    
    const handlerSubmitLoginForm = async (props) => {
        const response = await loginSignupUser(props);
            
            if (response.hasOwnProperty('error')) {
                NotificationManager.error(response.error.message, 'Wrong!');
            } else {
                if (props.type === 'signup') {
                    const pokemonsStart = await fetch('https://reactmarathon-api.herokuapp.com/api/pokemons/starter').then(res => res.json());

                    for (const item of pokemonsStart.data) {
                        await fetch(`https://pokemon-game-6972e-default-rtdb.firebaseio.com/${response.localId}/pokemons.json?auth=${response.idToken}`, {
                            method: 'POST',
                            body: JSON.stringify(item)
                        });
                    }
                }
                localStorage.setItem('idToken', response.idToken);
                NotificationManager.success('Success message');
                dispatche(getUserUpdateAsync());   
                onCloseModal();
            }
    }

    return (
        <Modal 
            isOpen={isOpenMod}
            title={'Log in...'}
            onCloseModal={onCloseModal}
        >
            <LoginForm 
                isResetField={!isOpenMod}
                onSubmit={handlerSubmitLoginForm}
            />
        </Modal>
    )

}

export default ModalLogin;
import { useState } from 'react'; 
import { NotificationManager } from 'react-notifications';

import LoginForm from '../../LoginForm';
import Modal from '../../Modal';

import Menu from "../Menu";
import NavBar from "../Navbar";


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
        case 'signup' : 
            return await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyA9i_loG1r0zVQbAu8fK9_CUb8EzXksSIc', requestOptions).then(res => res.json());
        case 'login' :   
            return await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyA9i_loG1r0zVQbAu8fK9_CUb8EzXksSIc', requestOptions).then(res => res.json());
        default:
            return 'I cannot login user';
    }
}


const MenuHeader = ({bgActive})  => {
    const [isActive, setIsActive] = useState(null);
    const [isOpenModal, setisOpenModal] = useState(false);

    const handlerClick = () => {
        setIsActive(prevState => !prevState);
    }

    const hendlerClickLogin = () => {
        setisOpenModal(prevState => !prevState)
    }

    const handlerSubmitLoginForm = async (props) => {
        const responce = await loginSignupUser(props)
            
            if (responce.hasOwnProperty('error')) {
                NotificationManager.error(responce.error.message, 'Wrong!');
            } else {
                localStorage.setItem('idToken', responce.idToken);
                NotificationManager.success('Success message')
                hendlerClickLogin();
            }
    }
        
    return (
        <>
            <Menu
                isActive={isActive}
                changeActive={handlerClick}
            />
            <NavBar
                isActive={isActive}
                bgActive={bgActive}
                changeActive={handlerClick}
                onClickLogin={hendlerClickLogin}
            />
            <Modal 
                isOpen={isOpenModal}
                title={'Log in...'}
                onCloseModal={hendlerClickLogin}
                >
                <LoginForm 
                    isResetField={!isOpenModal}
                    onSubmit={handlerSubmitLoginForm}
                    />
            </Modal>
        </>
    )
}
export default MenuHeader;
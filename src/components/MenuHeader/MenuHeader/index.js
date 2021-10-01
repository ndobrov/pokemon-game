import { useState } from 'react'; 
import { NotificationManager } from 'react-notifications';

import LoginForm from '../../LoginForm';
import Modal from '../../Modal';

import Menu from "../Menu";
import NavBar from "../Navbar";


const MenuHeader = ({bgActive})  => {
    const [isActive, setIsActive] = useState(null);
    const [isOpenModal, setisOpenModal] = useState(false);
    const [LoginIn, setLoginin] = useState(true);

    const hendlerChangeLogin = () => {
        setLoginin(prevState => !prevState)
    }
    
    let title = LoginIn ? "Login in..." : "Login up..."

    const handlerClick = () => {
        setIsActive(prevState => !prevState);
    }

    const hendlerClickLogin = () => {
        setisOpenModal(prevState => !prevState)
    }

    const handlerSubmitLoginForm = async ({email, password}) => {
        const requestOptions = {
            method: 'POST',
            body: JSON.stringify({
                email,
                password,
                returnSecureToken: true,
            })
        }
        if (LoginIn) {
            const responce = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyA9i_loG1r0zVQbAu8fK9_CUb8EzXksSIc', requestOptions).then(res => res.json());
                if (responce.hasOwnProperty('error')) {
                    NotificationManager.error(responce.error.message, 'Wrong!');
                }else {
                    localStorage.setItem('idToken', responce.idToken);
                    NotificationManager.success('Success message')
                }
            } else {
                const responce = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyA9i_loG1r0zVQbAu8fK9_CUb8EzXksSIc', requestOptions).then(res => res.json());
            if (responce.hasOwnProperty('error')) {
                NotificationManager.error(responce.error.message, 'Wrong!');
            }else {
                NotificationManager.success('Success message')

            }}
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
                title={title}
                onCloseModal={hendlerClickLogin}
                onChangeModal={hendlerChangeLogin}
                >
                <LoginForm 
                    onSubmit={handlerSubmitLoginForm}
                    />
            </Modal>
        </>
    )
}
export default MenuHeader;
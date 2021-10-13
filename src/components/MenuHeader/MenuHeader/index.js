import { useState } from 'react'; 
import { useDispatch, useSelector } from 'react-redux';
import { openModal, selectOpenModal } from '../../../store/user';

import ModalLogin from '../../LoginForm/components/ModalLogin';
import Menu from "../Menu";
import NavBar from "../Navbar";


const MenuHeader = ({bgActive})  => {
    const dispatche = useDispatch();
    const isOpenModal = useSelector(selectOpenModal);
    const [isActive, setIsActive] = useState(null);

    const handlerClick = () => {
        setIsActive(prevState => !prevState);
    }

    const hendlerClickLogin = () => {
        dispatche(openModal(!isOpenModal));
    }
    // console.log('isOpenModal2', isOpenModal);

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
            <ModalLogin>
                isOpenMod={isOpenModal}
                onCloseModal={hendlerClickLogin}
            </ModalLogin>
        </>
    )
}
export default MenuHeader;
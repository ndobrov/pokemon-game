import { useState } from 'react';

import Menu from "../Menu";
import NavBar from "../Navbar";

// import s from './style.module.css'
// import cn from 'classnames';

const MenuHeader = ({bgActive})  => {
    const[isActive, setIsActive] = useState(null);
    const[isOpenModal, setisOpenModal] = useState(null);

    const handlerClick = () => {
        setIsActive(prevState => !prevState);
}

    // const hendlerClickLogin = () => {
    //     setisOpenModal(prevState => !prevState)
    // }

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
                // onClickLogin={hendlerClickLogin}
            />
        </>
    )
}
export default MenuHeader;
import { useState } from 'react';

import Menu from "../Menu";
import NavBar from "../Navbar";

// import s from './style.module.css'
// import cn from 'classnames';

function MenuHeader({bgActive}) {
    console.log("MenuHeader", bgActive);
    const[isActive, setIsActive] = useState(null);

    const handlerClick = () => {
        setIsActive(prevState => !prevState);
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
                />
        </>
    )
}
export default MenuHeader;
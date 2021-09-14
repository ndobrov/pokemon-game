import { useState } from 'react';

import Menu from "../Menu";
import NavBar from "../Navbar";

// import s from './style.module.css'
// import cn from 'classnames';

function MenuHeader() {

    const[isActive, setIsActive] = useState(false);

    const handlerClick = () => {
        setIsActive(!isActive);
}

    return (
        <>
            <Menu
                isActive={isActive}/>
            <NavBar
                isActive={isActive}
                changeActive={handlerClick}/>
        </>
    )
}
export default MenuHeader;
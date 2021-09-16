import { Link } from 'react-router-dom'

import s from './style.module.css'
import cn from 'classnames';

const MENU = [
    {
        title: 'HOME',
        to: '/'
    },
    {
        title: 'GAME',
        to: '/game'
    },
    {
        title: 'ABOUT',
        to: '/about'
    },
    {
        title: 'CONTACT',
        to: '/contact'
    }
]

const Menu = ({isActive, changeActive}) => {

    return (
        <div className={cn(s.menuContainer, {
            [s.active]: isActive === true,
            [s.diactive]: isActive === false
         })}>
            <div className={cn(s.overlay)} />
                <div className={cn(s.menuItems)}>
                    <ul>
                       {
                           MENU.map(({title, to}, index) => (
                               <li key={index}
                               >
                                   <Link onClick={changeActive} to={to}>
                                      {title}
                                    </Link>
                                </li>
                           ))   
                       }
                    </ul>
                </div>
            </div>
    );
  }
  
  export default Menu;
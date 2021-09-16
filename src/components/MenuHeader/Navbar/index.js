import s from './style.module.css'
import cn from 'classnames';


function NavBar({isActive, bgActive=false, changeActive}) {
    console.log(bgActive);
    return (
        <nav  id={s.navbar} className={cn(s.root, {
            [s.bgActive] : bgActive
            })}>
            <div className={cn(s.navWrapper)}>
                <p className={cn(s.brand)}>
                    LOGO
                </p>
                <div className={cn(s.menuButton, {
                    [s.active]: isActive 
                    })}
                    onClick={changeActive}>
                    <span />
                </div>
            </div>
        </nav>
    )
}
export default NavBar;
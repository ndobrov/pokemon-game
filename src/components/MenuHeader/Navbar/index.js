import s from './style.module.css'
import cn from 'classnames';


function NavBar({isActive, changeActive}) {
    
    return (
        <nav className={cn(s.root)}>
            <div className={cn(s.navWrapper)}>
                <p className={cn(s.brand)}>
                    LOGO
                </p>
                <a className={cn(s.menuButton, {[s.active]: isActive })}
                    onClick={()=>changeActive(isActive)} href="#top">
                    <span />
                </a>
            </div>
        </nav>
    )
}
export default NavBar;
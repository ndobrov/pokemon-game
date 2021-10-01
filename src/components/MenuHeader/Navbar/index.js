import s from './style.module.css'
import cn from 'classnames';

import { ReactComponent as LoginSVG} from '../../../assets/login.svg'

function NavBar({isActive, bgActive=false, changeActive, onClickLogin}) {
    
    return (
        <nav  id={s.navbar} className={cn(s.root, {
            [s.bgActive] : bgActive
            })}>
            <div className={cn(s.navWrapper)}>
                <p className={cn(s.brand)}>
                    LOGO
                </p>

                <div 
                    className={s.loginAndMenu}
                    onClick={onClickLogin}>
                    <div className={s.loginWrap}>
                        <LoginSVG/>
                    </div>
                    <div className={cn(s.menuButton, {
                        [s.active]: isActive 
                        })}
                        onClick={changeActive}>
                    <span />
                </div>

                </div>
                
            </div>
        </nav>
    )
}
export default NavBar;
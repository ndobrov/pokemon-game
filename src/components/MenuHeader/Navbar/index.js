import { Link } from 'react-router-dom';

import cn from 'classnames';
import { useSelector } from 'react-redux';

import { ReactComponent as LoginSVG} from '../../../assets/login.svg'
import { ReactComponent as UserSVG} from '../../../assets/user.svg'
import { selectUserLoading, selectLocalId} from '../../../store/user';

import s from './style.module.css'


const NavBar = ({isActive, bgActive=false, changeActive, onClickLogin}) => {
    const isLoadingUser = useSelector(selectUserLoading);
    const localId = useSelector(selectLocalId);

    
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
                    >
                    { (!isLoadingUser && !localId) && (
                        <div 
                            className={s.loginWrap}
                            onClick={onClickLogin}
                        >
                            <LoginSVG/>
                        </div> 
                    )}
                    { (!isLoadingUser && localId) && (
                        <Link
                            className={s.loginWrap}
                            to="/user"
                        >
                            <UserSVG/>
                        </Link>
                    )}
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
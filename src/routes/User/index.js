import { Link, useHistory } from 'react-router-dom';

import { useSelector, useDispatch } from "react-redux";
import { selectUser, selectLocalId, removeUser } from "../../store/user";

import s from './style.module.css'


const User = () => {
    const userId = useSelector(selectLocalId);
    const userData = useSelector(selectUser);
    const dispatch = useDispatch();

    const toLocalTime = (timestamp) => new Date(timestamp).toLocaleString('uk-UA');
    const history = useHistory();

    const logOut = () => {
        localStorage.removeItem('idToken'); 
        dispatch(removeUser());
        history.push('/');
    }

    return (
        <>  
            <div className={s.userTitle}>
                <Link className={s.userLink} to="/game">
                    GAME
                </Link>
                <div>
                    <h3> USER</h3>
                    <p>{`user id:   ${userId}`}</p>
                    <p>{`user email:   ${userData.email}`}</p>
                    <p>{`last refresh:   ${toLocalTime(userData.lastRefreshAt)}`}</p>
                </div>
                <button
                    onClick={logOut}
                    className={s.userBtn}
                >
                    Log out
                </button>
            </div>
        </>
    );
  }
  
  export default User;
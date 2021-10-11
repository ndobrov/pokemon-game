import {useState, useEffect} from 'react';
import { useHistory } from 'react-router-dom';

import YouWin from '../../assets/you-win.png';
import YouLose from '../../assets/you-lose.png';
import Draw from '../../assets/draw.png';

import s from './style.module.css';


const Result = ({ type }) => {
    const history = useHistory();
    const [url, setUrl] = useState(null);

    useEffect(() => {
       switch (type) {
           case 'win':
               setUrl(YouWin);
               break;
           case 'lose':
               setUrl(YouLose);
               break;
           case 'draw':
               setUrl(Draw);
               break;
           default:
               
               setUrl(YouWin);
       }
   }, [type]);
   
    setTimeout(() => {
        history.push('/game/finish')
    }, 3000);

    return (
        <div className={s.result}>
            <img src={url} alt="result" />
        </div>
    );
};

export default Result;

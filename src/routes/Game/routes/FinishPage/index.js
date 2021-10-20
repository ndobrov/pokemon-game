import { useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';

import PokemonCard from '../../../../components/PokemonCard';

import { selectSelectedPokemons, clearState } from '../../../../store/pokemons';
import { selectPlayer2, selectResult} from '../../../../store/game';
import { selectLocalId} from '../../../../store/user';

import firebase from '../../../../service/firebase';
 
import s from './style.module.css';


const Finish = () => {
    const pokemonsPlayer1 = useSelector(selectSelectedPokemons);
    const pokemonsPlayer2 = useSelector(selectPlayer2);
    const localId = useSelector(selectLocalId);
    const winner = useSelector(selectResult);

    const dispatch = useDispatch();
    const history = useHistory();
    const [ player1, setPlayer1 ] = useState(pokemonsPlayer1);
    const [ player2, setPlayer2 ] = useState(pokemonsPlayer2);

    useEffect(() => {
        setPlayer2(() => {
            return Object.values(pokemonsPlayer2).map(item => ({
                ...item,
            }))
    });
}, [pokemonsPlayer2]);

    const [selectedPokemon, setSelectedPokemon] = useState();

    if ( Object.keys(player1).length === 0 || Object.keys(player2).length === 0) {
        history.replace('/game');
    }

    const  handlerChangeSelected = (key, id) => {
        if (winner === 'win') {
            setPlayer2(prevState => {
                return prevState.reduce((acc, item) => {
                    item.selected = false;
                    if (item.id === id) {
                        setSelectedPokemon(item);
                        item.selected =true;
                    }
                    acc.push(item);
                    return acc;
                }, [])
            })
        }
    }
   
    const hendlerAndGameClick = () => {
        if(winner === 'win') {
            alert (`add pokemon "${selectedPokemon.name}"?`)
            selectedPokemon.selected = false;
            firebase.addPokemon(selectedPokemon, localId);
        };
        dispatch(clearState());
        history.push('/game/');
    }

    return (
        <>
            <div className={s.flex}>{}
                {
                    Object.entries(player1).map(([key, {name, img, id, values, type, selected}]) =>
                    <PokemonCard 
                        key={key}
                        objID={key}
                        name={name}
                        img={img}
                        id={id}
                        values={values}
                        type={type}
                        active={true}
                        isSelected={selected}
                        className={s.card}
                        />
                    )
                    }
                </div>
            <button  className={s.buttonWrap}
                        onClick={hendlerAndGameClick}
                        disabled={Object.keys(pokemonsPlayer1).length > 5}
                        >
                        END GAME
            </button>
            <div className={s.flex}>{}
                {
                    Object.entries(player2).map(([key, {name, img, id, values, type, selected}]) =>
                    <PokemonCard 
                        key={key}
                        objID={key}
                        name={name}
                        img={img}
                        id={id}
                        values={values}
                        type={type}
                        active={true}
                        isSelected={selected}
                        className={s.card}
                        onChangePokemon={()=> {
                                    handlerChangeSelected(key, id)
                            } 
                        }
                        />
                    )
                }
            </div>
        </>
    );
  }
  
  export default Finish;
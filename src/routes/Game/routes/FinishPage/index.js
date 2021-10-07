import { useState, useEffect } from 'react';
import { useHistory } from 'react-router';

import PokemonCard from '../../../../components/PokemonCard';

import { useDispatch, useSelector } from 'react-redux';
import { selectSelectedPokemons, winnerPlayer, clearState} from '../../../../store/pokemons';
import { pokemonsPlTwoData} from '../../../../store/pokemonsPlayerTwo';
import { selectLocalId, addPokemonToFirebase} from '../../../../store/user';
 
import s from './style.module.css';


const Finish = () => {

    const pokemonsPlayer1 = useSelector(selectSelectedPokemons);
    const pokemonsPlayer2 = useSelector(pokemonsPlTwoData);
    const localId = useSelector(selectLocalId);
    const winner = useSelector(winnerPlayer);

    const dispatch = useDispatch();
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

    const history = useHistory();

    if ( Object.keys(player1).length === 0 || Object.keys(player2).length === 0) {
        history.replace('/game');
    }

    const  handlerChangeSelected = (key, id) => {

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
   
    const hendlerAndGameClick = () => {
            // console.log('winner2', winner);
        if(winner) {
            alert (`add pokemon "${selectedPokemon.name}"?`)
            addPokemonToFirebase(selectedPokemon, localId)};

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
                        AND GAME
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
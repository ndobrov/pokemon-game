import { useState, useEffect } from 'react';
import { useHistory } from 'react-router';

import PokemonCard from '../../../../components/PokemonCard';

// import { PokemonContext} from '../../../../context/pokemonContext'
// import { FireBaseContext} from '../../../../context/firebaseContext'

import { useDispatch, useSelector } from 'react-redux';
import { selectSelectedPokemons, clearState, winner} from '../../../../store/pokemons';
import { selectPokemonTwo, pokemonsPlTwoData, addPokemonToFirebase} from '../../../../store/pokemonsPlayerTwo';

import s from './style.module.css';


const Finish = () => {

    const pokemonsPlayer1 = useSelector(selectSelectedPokemons);
    const selectPokemonPlayerTwo = useSelector(pokemonsPlTwoData);
    const pokemonsPlayer2 = useSelector(pokemonsPlTwoData);
    const winnerRedux = useSelector(winner);

    const dispatch = useDispatch();

    // const {pokemons, pokemonsPlayer2} = useContext(PokemonContext);
    // const firebase = useContext(FireBaseContext);
    const [ player1, setPlayer1 ] = useState(pokemonsPlayer1);
    // const [ player2, setPlayer2 ] = useState(pokemonsPlayer21);


//     useEffect(() => {
//         setPlayer1() => {
//         return Object.values(pokemonsPlayer1).map(item => ({
//             ...item,
//         }))
//     });
// }, [pokemonsPlayer1]);

    // useEffect(() => {
    const [ player2, setPlayer2 ]  = useState(() => {
        return Object.values(pokemonsPlayer2).map(item => ({
            ...item,
        }))
    });
// }, [pokemonsRedux]);


    const [selectedPokemon, setSelectedPokemon] = useState([]);

    const history = useHistory();

    // if ( Object.keys(pokemonsPlayer1.data).length === 0 || Object.keys(player2).length === 0) {
    //     history.replace('/game');
    // }

    const  handlerChangeSelected = (key, id) => {

        setPlayer2(prevState => {
            return prevState.reduce((acc, item) => {
                item.selected = false;
                if (item.id === id) {
                    dispatch(selectPokemonTwo());
                    item.selected =true;
                }
                acc.push(item);
                return acc;
            }, [])
        })
    }
   
    const hendlerAndGameClick = () => {
        alert (`add pokemon "${selectedPokemon.name}"?`)
            // console.log(Object.keys(selectedPokemon));
            dispatch(addPokemonToFirebase(selectedPokemon))
            // dispatch(clearState());
            history.push('/game/');
            setSelectedPokemon((prevState) => prevState = {});
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
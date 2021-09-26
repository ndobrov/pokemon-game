import { useState, useContext, useEffect } from 'react';
import { useHistory } from 'react-router';

import PokemonCard from '../../../../components/PokemonCard';

import { PokemonContext} from '../../../../context/pokemonContext'
import { FireBaseContext} from '../../../../context/firebaseContext'

import s from './style.module.css';


const Finish = () => {

    const {pokemons, pokemonsPlayer2} = useContext(PokemonContext);
    const firebase = useContext(FireBaseContext);

    const [ player1, setPlayer1 ] = useState(() => {
        return Object.values(pokemons).map(item => ({
            ...item,
        }))
    });
    const [ player2, setPlayer2 ]  = useState(() => {
        return Object.values(pokemonsPlayer2).map(item => ({
            ...item,
        }))
    });

    const [selectedPokemon, setSelectedPokemon] = useState([]);

    const history = useHistory();

    // if ( Object.keys(pokemons).length === 0 || Object.keys(player2).length === 0) {
    //     history.replace('/game');
    // }

    const  handlerChangeSelected = (key, id) => {

            
            // setSelectedPokemon({...player2[key]});

            Object.values(player2).map(item => {
                if (item.id === id) {
                    setSelectedPokemon(item);
                }
            })
            console.log('Sel',{selectedPokemon});
            console.log('player21',player2)
    }
   
    const hendlerAndGameClick = () => {
        alert (`add pokemon "${selectedPokemon.name}"?`)
        firebase.addPokemon(selectedPokemon)
        history.push('/game/');
        setSelectedPokemon((prevState) => prevState = {});
    }

    return (
        <>
                <div className={s.flex}>{}
                    {
                        Object.entries(pokemons).map(([key, {name, img, id, values, type, selected}]) =>
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
                        disabled={Object.keys(pokemons).length > 5}
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
                                    // if (selectedPokemon.length < 2 ) {
                                         handlerChangeSelected(key, id)

                                    } 
                                }
                                />
                            )
                        }
                    </div>
            {/* </div> */}
        </>
    );
  }
  
  export default Finish;
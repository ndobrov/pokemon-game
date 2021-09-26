import { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router';

import PokemonCard from '../../../../components/PokemonCard';
import Layout from '../../../../components/Layout';

import { FireBaseContext} from '../../../../context/firebaseContext'
import { PokemonContext} from '../../../../context/pokemonContext'

import s from './style.module.css'



const StartPage = () => {

    const firebase = useContext(FireBaseContext);
    const pokemonsContext = useContext(PokemonContext);
    const history = useHistory();
    // console.log(pokemonsContext);

    const [pokemons, setPokemons] = useState({});

    useEffect(() => {
        firebase.getPokemonSoket((pokemons) => {
            setPokemons(pokemons);
        });

        return () => firebase.offPokemonSoket();
    }, []);

    const handlerChangeSelected = (key) => {
        const pokemon = {...pokemons[key]}
        pokemonsContext.onSelectedPokemons(key, pokemon);

        setPokemons(prevState => ({
                ...prevState,
                [key]: {
                    ...prevState[key],
                    selected: !prevState[key].selected,
                }
        }));

    };
    const hendlerStartGameClick =  () => {
        history.push('/game/board');

        // 
    }

    // console.log(typeof pokemons)

    // const hendleStartGameClick =  () => {
    //     const keyPokemons = Object.keys(pokemons);
    //     const randomKeyPokemons = keyPokemons[keyPokemons.length * Math.random() << 0];
        
    //     firebase.addPokemon(pokemons[randomKeyPokemons])
    // }

    return (
        <>
                <Layout colorBg="orange">
                    <button  className={s.buttonWrap}
                        onClick={hendlerStartGameClick}
                        disabled={Object.keys(pokemonsContext.pokemons).length < 5}
                        >
                        START GAME
                    </button>
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
                                onChangePokemon={()=> {
                                    if (Object.keys(pokemonsContext.pokemons).length < 5 || selected) {
                                        handlerChangeSelected(key)}
                                } }  
                                />
                            )
                        }
                    </div>
                </Layout>    
        </>
    );
};

export default StartPage;

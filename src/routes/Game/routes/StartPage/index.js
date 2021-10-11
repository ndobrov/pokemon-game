import { useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { getPokemonsAsync,
    selectPokemonsData, 
    selectPokemonsLoading, 
    selectSelectedPokemons, 
    selectPokemon } from '../../../../store/pokemons';
import {setPlayer1, setPlayer2, setResult } from '../../../../store/game';

import PokemonCard from '../../../../components/PokemonCard';
import Layout from '../../../../components/Layout';

import s from './style.module.css'


const StartPage = () => {

    const isLoading = useSelector(selectPokemonsLoading);
    const pokemonsRedux = useSelector(selectPokemonsData);
    const selectedPokemons = useSelector(selectSelectedPokemons);
    const dispatch = useDispatch();
    const history = useHistory();

    const [pokemons, setPokemons] = useState({});

    useEffect(() => {
        dispatch(getPokemonsAsync());
        dispatch(setPlayer1({}));
        dispatch(setPlayer2([]));
        dispatch(setResult(null));
    }, []);

    useEffect(() => {
      setPokemons(pokemonsRedux);  
    }, [pokemonsRedux]);

    const hendlerStartGameClick =  () => {
        history.push('/game/board');
    }

    const handlerChangeSelected = (key) => {
        const pokemon = {...pokemons[key]}
        dispatch(selectPokemon(pokemon));
        
        setPokemons(prevState => ({
                ...prevState,
                [key]: {
                    ...prevState[key],
                    selected: !prevState[key].selected,
                }
        }));
    };
    
    return (
        <>
            <Layout colorBg="orange">
                <button  className={s.buttonWrap}
                    onClick={hendlerStartGameClick}
                    disabled={Object.keys(selectedPokemons).length < 5}
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
                                if (Object.keys(selectedPokemons).length < 5 || selected) {
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

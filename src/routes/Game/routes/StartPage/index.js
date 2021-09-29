import { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router';

import PokemonCard from '../../../../components/PokemonCard';
import Layout from '../../../../components/Layout';

import { FireBaseContext} from '../../../../context/firebaseContext'
import { PokemonContext} from '../../../../context/pokemonContext'

import s from './style.module.css'
import { useDispatch, useSelector } from 'react-redux';
import { getPokemonsAsync,
         selectPokemonsData, 
         selectPokemonsLoading, 
         selectSelectedPokemons, 
         selectPokemon } from '../../../../store/pokemons';

const StartPage = () => {

    const isLoading = useSelector(selectPokemonsLoading);
    const pokemonsRedux = useSelector(selectPokemonsData);
    const selectedPokemons = useSelector(selectSelectedPokemons);
    const dispatch = useDispatch();

    const [pokemons, setPokemons] = useState({});
    const history = useHistory();

    useEffect(() => {
        dispatch(getPokemonsAsync());
    }, []);

    useEffect(() => {
      setPokemons(pokemonsRedux);  
    }, [pokemonsRedux]);

    const handlerChangeSelected = (key) => {
        const pokemon = {...pokemons[key]}
        dispatch(selectPokemon( pokemon)) ;

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
    }

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

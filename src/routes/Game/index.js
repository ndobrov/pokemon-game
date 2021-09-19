import { useState, useEffect } from 'react';

import PokemonCard from '../../components/PokemonCard';
import Layout from '../../components/Layout';
import s from './style.module.css'

import database from "../../service/firebase";


const GamePage = () => {
    
    const[pokemons, setPokemons] = useState({});

    useEffect(() => {
        database.ref('pokemons').once('value', (snapshot) => {
                setPokemons(snapshot.val());
    })}, [pokemons])

    const handlerClick = (id, objID) => {
        setPokemons(prevState => {
            return Object.entries(prevState).reduce((acc, item) => {
                const pokemon = {...item[1]};
                if (pokemon.id === id) {
                    pokemon.active = !pokemon.active;
                    database.ref('pokemons/'+item[0]).update({
                        active: pokemon.active
                    })
                };
                acc[item[0]] = pokemon;
                return acc;
            }, {});
        });
    };
    const addPokemon =  () => {
        const keyPokemons = Object.keys(pokemons);
        const randomKeyPokemons = keyPokemons[keyPokemons.length * Math.random() << 0];

        const newKey = database.ref().child('pokemons').push().key;
        database.ref('pokemons/' + newKey).set({...pokemons[randomKeyPokemons]});
    }
    return (
        <>
                <Layout colorBg="orange">
                    <button style={{
                        position: 'absolute',
                        right: 0,
                        left: 0,
                        margin: '0 auto'
                        }}
                        onClick={addPokemon}
                        >
                        ADD NEW POKEMON
                    </button>
                    <div className={s.flex}>
                        {
                            Object.entries(pokemons).map(([key, {name, img, id, values, type, active}]) =>
                            <PokemonCard 
                                key={key}
                                objID={key}
                                name={name}
                                img={img}
                                id={id}
                                values={values}
                                type={type}
                                active={active}
                                onChangePokemon={handlerClick}
                                />
                            )
                        }
                    </div>
                </Layout>    
        </>
    );
};

export default GamePage;

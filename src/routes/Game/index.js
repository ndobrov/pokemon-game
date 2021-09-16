import { useState } from 'react';

import PokemonCard from '../../components/PokemonCard';
import Layout from '../../components/Layout';
import s from './style.module.css'

import POKEMONS from '../../db.json'


const GamePage = () => {

     const[pokemons, setPokemons] = useState(POKEMONS);
    //  setPokemons(POKEMONS);

    const handlerClick = (id) => {
        // way 1
        setPokemons(prevState => (prevState.map(item =>item.id===id? 
                {...item, active:!item.active} : item)))

        // way2
        // let newPokemons = [...pokemons];
        // let pok = newPokemons.filter(i => i.id === id)[0];
        // pok.active = !pok.active;
        // setPokemons(newPokemons);
    }

    return (
        <>
            <div className={s.root}>
                <h2 className={s.title}>
                    Game page</h2>
                <Layout colorBg="orange">
                    <div className={s.flex}>
                        {pokemons && pokemons.length? (pokemons.map((item)=>
                            <PokemonCard key={item.id}
                                name={item.name}
                                img={item.img}
                                id={item.id}
                                values={item.values}
                                type={item.type}
                                active={item.active}
                                onChangePokemon={handlerClick}
                                />
                                )
                                ): (
                            <span>No pokemons)</span>
                                )
                        }
                    </div>
                </Layout>    
            </div>
        </>
    );
};




export default GamePage;

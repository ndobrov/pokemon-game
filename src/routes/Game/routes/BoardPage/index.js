import { useContext } from 'react';
import { PokemonContext } from '../../../../context/pokemonContext';

import PokemonCard from '../../../../components/PokemonCard';

import s from './style.module.css';

const BoardPage = () => {
    const { pokemons }= useContext(PokemonContext);
    console.log(pokemons)

    return (
        <div className={s.root}>
            <div className={s.playerOne}>
            {
                Object.values(pokemons).map(({name, img, id, values, type, selected }) => (
                <PokemonCard 
                    key={id}
                    name={name}
                    img={img}
                    id={id}
                    values={values}
                    type={type}
                    active={true}
                    isSelected={selected}
                    className={s.card}
                    minimize
                    />
                ))
            }
            </div>
            <div className={s.board}>
                <div className={s.boardPlate}>1</div>
                <div className={s.boardPlate}>2</div>
                <div className={s.boardPlate}>3</div>
                <div className={s.boardPlate}>4</div>
                <div className={s.boardPlate}>5</div>
                <div className={s.boardPlate}>6</div>
                <div className={s.boardPlate}>7</div>
                <div className={s.boardPlate}>8</div>
                <div className={s.boardPlate}>9</div>
            </div>
        </div>
    );
};

export default BoardPage;
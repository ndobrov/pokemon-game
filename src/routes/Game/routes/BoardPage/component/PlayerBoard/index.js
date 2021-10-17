import { useState } from 'react';
import PokemonCard from '../../../../../../components/PokemonCard';

import cn from 'classnames';
import s from './style.module.css';

const PlayerBoard = ({player, cards, onClickCard, className, minimize="true", disabled}) => {

    const [isSelected, setisSelected] = useState(null);

    return (
        <>
            {
                cards && cards.length ? cards.map(item => (
                    <div className={cn(className, s.cardBoard, {
                        [s.selected]: isSelected === item.id
                    })}

                    key={item.id + Math.random(0)*10}
                    onClick={() => {
                        if (disabled) {
                            return;
                        }
                        setisSelected(item.id);
                        onClickCard && onClickCard({
                            player,
                            ...item,
                        })
                    }}
                    >
                    <PokemonCard 
                        name={item.name}
                        img={item.img}
                        id={item.id}
                        values={item.values}
                        type={item.type}
                        active
                        minimize={minimize}
                        />
                    </div>
                ))  : <span> No player)</span>
            }
        </>
        
    );
  }
  
  export default PlayerBoard;
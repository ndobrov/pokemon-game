import { useState } from 'react';
import PokemonCard from '../../../../../../components/PokemonCard';

import cn from 'classnames';
import s from './style.module.css';

const PlayerBoard = ({player, cards, onClickCard, className, minimize="true"}) => {

    const [isSelected, setisSelected] = useState(null);
    // console.log('cards', cards)
    return (
        <>
            {
                cards && cards.length ? cards.map(item => (
                    <div className={cn(className, s.cardBoard, {
                        [s.selected]: isSelected === item.id
                    })}

                    key={item.id}
                    onClick={() => {
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
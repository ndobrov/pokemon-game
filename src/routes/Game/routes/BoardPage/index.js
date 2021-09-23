import { useState, useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import PokemonCard from '../../../../components/PokemonCard';
import PlayerBoard from './component/PlayerBoard'

import { PokemonContext } from '../../../../context/pokemonContext';

import s from './style.module.css';

const counterWin = (board, player1, player2) => {
    let player1Count = player1.length;
    let player2Count = player2.length;

    board.forEach(element => {
        if (element.card.possession === 'red') {
            player2Count ++;
        }
        if (element.card.possession === 'blue') {
            player1Count ++;
        }
    });
    return [player1Count, player2Count]
}

const BoardPage = () => {
    const { pokemons }= useContext(PokemonContext);

    const [ board, setBoard ] = useState([]);
    const [ player1, setPlaer1 ] = useState(() => {
        return Object.values(pokemons).map(item => ({
            ...item,
            possession: 'blue',
        }))
    });
    const [ player2, setPlaer2 ] = useState([]);
    const [ choiceCard, setChoiceCard ] = useState(null);
    const [ steps, setSteps ] = useState(0);

    const history = useHistory();

    useEffect(() => {
        async function fetchData() {
            const boardResponse = await fetch('https://reactmarathon-api.netlify.app/api/board');
            const boardRequest = await boardResponse.json();
            setBoard(boardRequest.data);
            
            const player2Response = await fetch('https://reactmarathon-api.netlify.app/api/create-player');
            const player2Request = await player2Response.json();
            setPlaer2(() => {
                return player2Request.data.map(item => ({
                    ...item,
                    possession: 'red',
                }))
            });
        }
        fetchData();

    }, []);

    if ( Object.keys(pokemons).length === 0) {
        history.replace('/game');
    }

    const handlerClickBoardPlate = async (position) => {

        if(choiceCard) {
            const params = {
                position,
                card: choiceCard,
                board,
            };

            const res = await fetch('https://reactmarathon-api.netlify.app/api/players-turn', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(params),
            });
                const request = await res.json();
                

                if (choiceCard.player === 1) {
                    setPlaer1(prevState => prevState.filter(item => item.id !== choiceCard.id));
                }

                if (choiceCard.player === 2) {
                    setPlaer2(prevState => prevState.filter(item => item.id !== choiceCard.id));
                }

                setBoard(request.data);

                setSteps(prevState => {
                    const count = prevState + 1;

                    return count;
                })
                console.log(steps)
                
        }
    } 

    useEffect(() => {
            if (steps === 9) {
                const [count1, count2] = counterWin(board, player1, player2);
                console.log(count1, count2)
                if (count1 > count2) {
                    alert('WIM');
                } else if (count1 < count2) {
                    alert('LOSE');
                } else {
                    alert('DRAW');
                }
            }
    }, [steps])

    return (
        <div className={s.root}>
            <div className={s.playerOne}>
                <PlayerBoard 
                    player={1}
                    cards={player1}
                    onClickCard={(card) => setChoiceCard(card)}
                    />
            </div>
            <div className={s.board}>
                {
                    board && board.length? board.map(item => (
                        <div
                            key={item.position}
                            className={s.boardPlate}
                            onClick={() => !item.card && handlerClickBoardPlate(item.position)}
                            >
                                {
                                    item.card && 
                                    <PokemonCard {...item.card} active minimize/>
                                }
                        </div>
                    )) : <span> No item</span>
                }            
            </div>
            <div className={s.playerTwo}>
                <PlayerBoard 
                    player={2}
                    cards={player2}
                    onClickCard={(card) => setChoiceCard(card)}
                    />
            </div>
        </div>
    );
};

export default BoardPage;
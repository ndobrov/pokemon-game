import { useState, useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import PokemonCard from '../../../../components/PokemonCard';
import PlayerBoard from './component/PlayerBoard'

import { useDispatch, useSelector } from 'react-redux';
import { getPokemonsPlayerTwoAsync, pokemonsPlTwoData} from '../../../../store/pokemonsPlayerTwo';
import { selectSelectedPokemons} from '../../../../store/pokemons';
         
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
    // const { pokemons, pokemonsPlayer2, onPokemonsTwoPlayer }= useContext(PokemonContext);
    const selectedPokemons = useSelector(selectSelectedPokemons);
    // const selectPokemonPlayerTwo = useSelector(selectPokemonsPlayerTwo);
    const pokemonsPlayer2 = useSelector(pokemonsPlTwoData);
    const dispatch = useDispatch();

    const [ board, setBoard ] = useState([]);
    const [ player1, setPlaer1 ] = useState(() => {
        return Object.values(selectedPokemons).map(item => ({
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
        }
        dispatch(getPokemonsPlayerTwoAsync());
        
        setPlaer2(() => {
            return pokemonsPlayer2.map(item => ({
                ...item,
                possession: 'red',
            }))
        })
        fetchData();
    }, []);


     console.log('2',pokemonsPlayer2)


    if ( Object.keys(selectedPokemons).length === 0) {
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
        }
    } 

    useEffect(() => {
            if (steps === 9) {
                const [count1, count2] = counterWin(board, player1, player2);
                if (count1 > count2) {
                    alert('WIM');
                } else if (count1 < count2) {
                    alert('LOSE');
                } else {
                    alert('DRAW');
                }
            history.push('/game/finish');

            }
    }, [steps])

    // const hendlerStartGameClick =  () => {
    //     history.push('/game/board');

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
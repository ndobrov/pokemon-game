import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import PokemonCard from '../../../../components/PokemonCard';
import PlayerBoard from './component/PlayerBoard'
import Result from './component/Result';
import ArrowChoice from './component/ArrowChoise';

import { useSelector, useDispatch } from 'react-redux';
// import { getPokemonsPlayerTwoAsync, pokemonsPlTwoData} from '../../../../store/pokemonsPlayerTwo';
import { selectSelectedPokemons, hendlerWinner, winnerPlayer, selectPokemonsData} from '../../../../store/pokemons';
import { pokemonsPlTwoData} from '../../../../store/pokemonsPlayerTwo';
import { selectPlayer1, selectPlayer2, selectResult, setResult} from '../../../../store/game';
import request from '../../../../service/request';
import { returnBoard, counterWin } from './component/Utils/index'; 
         
import s from './style.module.css';


const BoardPage = () => {
    const history = useHistory();
    const dispatch = useDispatch();

    const selectedPokemons = useSelector(selectSelectedPokemons);
    const pokemonsSelector = useSelector(selectPokemonsData);
    
    if ( Object.keys(selectedPokemons).length === 0) {
        history.replace('/game');
    }
    const [ startSide, setStartSide ] = useState(0);
    const [ board, setBoard ] = useState([]);
    const [ player1, setPlayer1State ] = useState(() => {
        return Object.values(selectedPokemons).map(item => ({
            ...item,
            possession: 'blue',
        }))
    });
    const [ player2, setPlayer2State ] =  useState([]);    
    const [ choiceCard, setChoiceCard ] = useState(null);
    const [ steps, setSteps ] = useState(0);
    const [ serverBoard, setServerBoard] = useState([0,0,0, 0,0,0, 0,0,0]);
    const [ typeResult, setTypeResult ] = useState(null);

    // const pokemonsPlayer2 = useSelector(pokemonsPlTwoData);

    useEffect(() => {
        async function fetchData() {
            const boardRequest = await request.getBoard();
            setBoard(boardRequest.data);

            const player2Request = await request.gameStart({
                pokemons: Object.values(pokemonsSelector),
            })

            setTimeout(() => {
                setStartSide(1);
            }, 2000);

            dispatch(pokemonsPlTwoData(player2Request.data));

            setPlayer2State(() => player2Request.data.map(item => ({
                    ...item,
                    possession: 'red',
                })));
        }
        fetchData();
    }, []);

    // useEffect(() => {
        
    //     dispatch(getPokemonsPlayerTwoAsync());
    // }, []);

//     useEffect(() => {
//         setPlayer2(() => {
//             return pokemonsPlayer2.map(item => ({
//                 ...item,
//                 possession: 'red',
//             }))
//         })
// }, [pokemonsPlayer2])

    

    const handlerClickBoardPlate = async (position) => {
        if(typeof choiceCard === 'object') {
            const params = {
               currentPlayer: 'p1',
               hands: {
                   p1: player1,
                   p2: player2,
               },
               move: {
                   poke: {
                       ...choiceCard,
                   },
                   position,
               },
               board: serverBoard,
        };

        if (choiceCard.player === 1) {
            setPlayer1State(prevState => prevState.filter(item => item.id !== choiceCard.id));
        }

        setBoard(prevState => prevState.map(item => {
            if (item.position === position) {
                return {
                    ...item,
                    card: choiceCard,
                }
            }
            return item;
        }));

        const game = await request.game(params);

        console.log(game);

        setBoard(returnBoard(game.oldBoard))

        setSteps(prevState => {
            const count = prevState + 1;
            return count;
        });

        if (game.move !== null) {
            const idAi = game.move.poke.id;
        
            setTimeout(() => {
         setPlayer2State(prevState => prevState.map(item => {
            if (item.id === idAi) {
                return {
                    ...item,
                    active: true,
                }
            }
            return item;
        }));
        }, 1000);


        setTimeout(() => {
            setPlayer2State(() => game.hands.p2.pokes.map(item => item.poke));
            setServerBoard(game.board);
            setBoard(returnBoard(game.board));

            setSteps(prevState => {
                const count = prevState + 1;
                return count;
            });
        }, 1500)
            // const res = await fetch('https://reactmarathon-api.netlify.app/api/players-turn', {
            //     method: 'POST',
            //     headers: {
            //         'Content-Type': 'application/json',
            //     },
            //     // body: JSON.stringify(params),
            // });
            //     const request = await res.json();
                
        }
    }
    } 

    useEffect(() => {
            if (steps === 9) {
                const [count1, count2] = counterWin(board, player1, player2);
                if (count1 > count2) {
                    dispatch(setResult('win'));
                    setTypeResult('win');
                } else if (count1 < count2) {
                    dispatch(setResult('lose'));
                    setTypeResult('lose')
                } else {
                    dispatch(setResult('draw'));
                    setTypeResult('draw')
                }
         history.push('/game/finish')
            }
    }, [steps])

    return (
        <div className={s.root}>
            { typeResult && <Result type={typeResult}/>}
            <ArrowChoice side={'turn'} />
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
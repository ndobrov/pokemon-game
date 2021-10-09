import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import PokemonCard from '../../../../components/PokemonCard';
import PlayerBoard from './component/PlayerBoard'
import Result from './component/Result';
import ArrowChoice from './component/ArrowChoise';

import { useSelector, useDispatch } from 'react-redux';
import { selectSelectedPokemons, selectPokemonsData} from '../../../../store/pokemons';
import { setPlayer2, setResult} from '../../../../store/game';
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
    const [ game, setGame ] = useState({});
    const [ serverBoard, setServerBoard] = useState([0,0,0, 0,0,0, 0,0,0]);
    const [ typeResult, setTypeResult ] = useState(null);

    useEffect(() => {
        async function fetchData() {
            const boardRequest = await request.getBoard();
            setBoard(boardRequest.data);

            const player2Request = await request.getStart({
                pokemons: Object.values(pokemonsSelector),
            })

            setTimeout(() => {
                const side = Math.floor(Math.random() * 2) + 1;
                // const side = 2;
                setStartSide(side);
            }, 2000);
                
            dispatch(setPlayer2(player2Request.data));

            setPlayer2State(() => player2Request.data.map(item => ({
                    ...item,
                    possession: 'red',
                })));

        }
        fetchData();
    }, []);
    

    useEffect(() => {
        if (startSide === 2) {
        async function fetchData() {
            let params = {
                currentPlayer: 'p2',
                hands: {
                    p1: player1,
                    p2: player2
                },
                move: null,
                board: serverBoard,
            }; 
        setGame(() => request.game(params)); 
        console.log('game', game);

        }
        fetchData();
        }
    }, [startSide])

    
    const handlerClickBoardPlate = async (position) => {

        if(typeof choiceCard === 'object' ) {
                const params = {
                    currentPlayer: startSide === 1 ? 'p1' :'p2',
                    hands: {
                        p1: player1,
                        p2: player2,
                    },
                    move: 
                        startSide === 1 ? {
                        poke: {
                            ...choiceCard,
                        },
                        position,
                        } : null,
                    board: serverBoard,
                 } 
           
                   
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
            
            console.log('params', params);

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
            }
        }
    } 

    useEffect(() => {
            if (steps === 9) {
                const [count1, count2] = counterWin(board, player1, player2);
                if (count1 > count2) {
                    setTypeResult('win');
                    dispatch(setResult('win'));
                } else if (count1 < count2) {
                    setTypeResult('lose')
                    dispatch(setResult('lose'));
                } else {
                    setTypeResult('draw')
                    dispatch(setResult('draw'));
                }

            }
    }, [steps])

    return (
        <div className={s.root}>
            { typeResult && <Result type={typeResult}/>}
            {!choiceCard && <ArrowChoice side={startSide} />}
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
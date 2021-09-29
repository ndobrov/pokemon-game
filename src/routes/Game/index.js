import { useState } from "react";
import { Switch, Route, useRouteMatch } from "react-router";

import StartPage from './routes/StartPage';
import BoardPage from './routes/BoardPage';
import FinishPage from './routes/FinishPage';

import { PokemonContext } from '../../context/pokemonContext'


const GamePage = () => {

    // const [selectedPokemons, setSelectedPokemons] = useState({});
    // const [selectedPokemons2, setSelectedPokemons2] = useState({});
    // const [resultGame, setResultGame] = useState({
    //     win: false,
    //     lose: false,
    //     draw: false
    // });

    const match = useRouteMatch();

    // const hendlerSelectedPokemons = (key, pokemon) => {
    //     setSelectedPokemons(prevState => {
    //         if (prevState[key]) {
    //             const copyState = {...prevState};
    //             delete copyState[key];

    //             return copyState;
    //         }
    //         return {
    //             ...prevState,
    //             [key]: pokemon,
    //         }
    //     })

    // }
    // const hendlerPokemons = (items) => {
    //  setSelectedPokemons2((prevState) => {
    //     return {...prevState, ...items};
    // })
// }
    return (
        // <PokemonContext.Provider value={{
        //     win: resultGame, 
        //     pokemons: selectedPokemons,
        //     pokemonsPlayer2: selectedPokemons2,
        //     onPokemonsTwoPlayer: hendlerPokemons,
        //     onSelectedPokemons: hendlerSelectedPokemons,
        // }}>
            <Switch>
                <Route path={`${match.path}/`} exact component={StartPage} />
                <Route path={`${match.path}/board`} component={BoardPage} />
                <Route path={`${match.path}/finish`} component={FinishPage} />
            </Switch>
        // </PokemonContext.Provider>
    );
};

export default GamePage;
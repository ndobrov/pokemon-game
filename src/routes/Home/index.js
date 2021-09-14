
import Footer from '../../components/Footer/index';
import Header from '../../components/Header/index';
import Layout from '../../components/Layout/index';
import PokemonCard from '../../components/PokemonCard/index';

import url from '../../assets/bj2.jpg'
import url2 from '../../assets/bj3.jpg'

import POKEMONS from '../../db.json'

import s from './style.module.css'
import MenuHeader from '../../components/MenuHeader/MenuHeader';

function HomePage({ onChangePage }) {
    const handlerClickButton = (page) => {
        onChangePage && onChangePage(page);
    }
  return (
    <>
    <MenuHeader/>
    <Header
      title="Pokemone Game"
      descr="This is simple triple triad card game"
      onClickButton={handlerClickButton}
      />
    <Layout
      id="rules"
      title="Layout 1"
      urlBg={url}
      >
        <p>In the game two players face off against one another, one side playing as "blue", the other as "red" on a 3x3 grid.
        Each player has five cards in a hand and the aim is to capture the opponent's cards by turning them into the player's own color of red or blue.</p>

        <p>To win, a majority of the total ten cards played (including the one card that is not placed on the board) must be of the player's card color. To do this, the player must capture cards by placing a card adjacent to an opponent's card whereupon the 'ranks' of the sides where the two cards touch will be compared. If the rank of the opponent's card is higher than the player's card, the player's card will be captured and turned into the opponent's color. If the player's rank is higher, the opponent's card will be captured and changed into the player's color instead. </p>
        
    </Layout>
    <Layout
      id="cards"
      title="Layout 2"
      colorBg= "orange"
      >
        <div className ={s.flex}>
        {POKEMONS&&POKEMONS.length? (POKEMONS.map((item)=>
            <PokemonCard key={item.id}
               name={item.name}
               img={item.img}
               id={item.id}
               values={item.values}
               type={item.type}
                />
              )
              ): (
            <span>No pokemons)</span>
              )
        }
        </div>
    </Layout> 
    <Layout
      id="about"
      title="Layout 3"
      descr="Description"
      urlBg={url2}
      >
        <p>In the game two players face off against one another, one side playing as "blue", the other as "red" on a 3x3 grid.
        Each player has five cards in a hand and the aim is to capture the opponent's cards by turning them into the player's own color of red or blue.</p>

        <p>To win, a majority of the total ten cards played (including the one card that is not placed on the board) must be of the player's card color. To do this, the player must capture cards by placing a card adjacent to an opponent's card whereupon the 'ranks' of the sides where the two cards touch will be compared. If the rank of the opponent's card is higher than the player's card, the player's card will be captured and turned into the opponent's color. If the player's rank is higher, the opponent's card will be captured and changed into the player's color instead. </p>
        
    </Layout>
    
    <Footer/>
    </>
  );
}

export default HomePage;

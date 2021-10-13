import { useHistory } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';

import Header from '../../components/Header/index';
import Layout from '../../components/Layout/index';
import ModalLogin from '../../components/LoginForm/components/ModalLogin';
import { selectLocalId, selectOpenModal, openModal } from '../../store/user';

import url from '../../assets/bj2.jpg'
import url2 from '../../assets/bj3.jpg'


const HomePage = () => {
  const openModal2 = useSelector(selectOpenModal);
  const localId = useSelector(selectLocalId);
  const dispatche = useDispatch();
  const history = useHistory();

  const hendleClickLogin = () => {
    dispatche(openModal(!openModal2));
  }

  const handlerClickButton = () => {
    if (localId) {
      history.push('/game');
    } else {
      hendleClickLogin();
    }
  }

  return (
    <>
      <Header
        title="Pokemone Game"
        descr="This is simple triple triad card game"
        onClickButton={handlerClickButton}
      />
      <ModalLogin
          isOpenMod={openModal2}
          onCloseModal={hendleClickLogin}
      />
      <Layout
        id="rules"
        title="Game description"
        urlBg={url}
      >
          <p>In the game two players face off against one another, one side playing as "blue", the other as "red" on a 3x3 grid.
          Each player has five cards in a hand and the aim is to capture the opponent's cards by turning them into the player's own color of red or blue.</p>
      </Layout>
      <Layout
        id="about"
        title="Rules of the game"
        descr="Description"
        urlBg={url2}
      >
          <p>To win, a majority of the total ten cards played (including the one card that is not placed on the board) must be of the player's card color. To do this, the player must capture cards by placing a card adjacent to an opponent's card whereupon the 'ranks' of the sides where the two cards touch will be compared. If the rank of the opponent's card is higher than the player's card, the player's card will be captured and turned into the opponent's color. If the player's rank is higher, the opponent's card will be captured and changed into the player's color instead. </p>
      </Layout>    
    </>
  );
}

export default HomePage;


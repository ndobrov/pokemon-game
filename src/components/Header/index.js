import style from './style.module.css'
    

function Header({title, descr, onClickButton}) {

    const handlerClick = () => {
        // console.log('HEADER');
        onClickButton && onClickButton('game');
    }
    return (
        <header className={style.root}>
            <div className={style.forest}></div>
            <div className={style.container}>
                <h1>{title}</h1>
                <p>{descr}</p>
                <button className={style.btnCangePage}
                    onClick={handlerClick}>
                    Start Game
                </button>
            </div>
        </header>
    );
  }
  
export default Header;
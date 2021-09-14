import s from './style.module.css'

const GamePage = ({onChangePage}) => {

    const handlerClick = () => {
        onChangePage && onChangePage('app');
    }

    return (
        <div>
            <h2 className={s.title}>
                Game page</h2>
            <button className={s.btnCangePage}
                onClick={handlerClick}>
                Home 
            </button>
        </div>
    );
};




export default GamePage;

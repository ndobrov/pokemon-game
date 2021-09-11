import style from './style.module.css'

<<<<<<< HEAD
function Layout({id, title='Title defaults', urlBg, colorBg, children}) {

    // const stylesImg = urlBg? {background:`url(${urlBg})`} : {background:`${colorBg}`}
       const stylesImg = {}
       
       if(urlBg) {
           stylesImg.backgroundImage = `url(${urlBg})`;
       }

       if(colorBg) {
           stylesImg.backgroundColor = colorBg;
        }

    return (
        <section
            style={stylesImg} 
            className={style.root}
            id={id}>
=======
function Layout({title='Title defaults', descr='Description defaults', urlBg, colorBg}) {
            console.log(urlBg)
    const stylesImg = urlBg? {background:`url(${urlBg})`} : {background:`${colorBg}`}
       
    return (
        <section
            style={stylesImg} 
            className={style.root}>
>>>>>>> master
            <div className={style.wrapper}>
                <article>
                    <div className={style.title}>
                        <h3>{title}</h3>
                        <span className={style.separator}></span>
                    </div>
                    <div className={`${style.desc} ${style.full}`}>
<<<<<<< HEAD
                        {children}
=======
                        <p>{descr}</p>
>>>>>>> master
                    </div>
                </article>
            </div>
        </section>
    );
  }
  
  export default Layout;
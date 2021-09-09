import style from './style.module.css'

function Layout({title='Title defaults', descr='Description defaults', urlBg, colorBg}) {
            console.log(urlBg)
    const stylesImg = urlBg? {background:`url(${urlBg})`} : {background:`${colorBg}`}
       
    return (
        <section
            style={stylesImg} 
            className={style.root}>
            <div className={style.wrapper}>
                <article>
                    <div className={style.title}>
                        <h3>{title}</h3>
                        <span className={style.separator}></span>
                    </div>
                    <div className={`${style.desc} ${style.full}`}>
                        <p>{descr}</p>
                    </div>
                </article>
            </div>
        </section>
    );
  }
  
  export default Layout;
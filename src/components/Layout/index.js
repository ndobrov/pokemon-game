import style from './style.module.css'

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
            <div className={style.wrapper}>
                <article>
                    <div className={style.title}>
                        <h3>{title}</h3>
                        <span className={style.separator}></span>
                    </div>
                    <div className={`${style.desc} ${style.full}`}>
                        {children}
                    </div>
                </article>
            </div>
        </section>
    );
  }
  
  export default Layout;
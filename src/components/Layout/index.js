import style from './style.module.css'

function Layout({title, descr, urlBg, colorBg}) {

    return (
        <section
            style={urlBg?{backgroundImage:urlBg}:{background:colorBg}} 
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
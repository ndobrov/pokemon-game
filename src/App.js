import './App.css';
import Footer from './components/Footer/index';
import Header from './components/Header/index';
import Layout from './components/Layout/index';
import url from './assets/bj2.jpg'
import url2 from './assets/bj3.jpg'

function App() {
  return (
    <>
    <Header
      title="Header"
      descr="Description"
      />
    <Layout
      title="Layout 1"
      descr="Description"
      // urlBg={`url(${url})`}
      urlBg={url}
      />
    <Layout
      title="Layout 2"
      descr="Description"
      colorBg= "orange"
      />
    <Layout
      title="Layout 3"
      descr="Description"
      // urlBg={`url(${url2})`}
      colorBg= "red"
      urlBg={url2}
      />
    <Footer/>
    </>
  );
}

export default App;

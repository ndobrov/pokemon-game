import { useState } from "react";
import HomePage from "./routes/Home";
import GamePage from "./routes/Game";


const App = () => {
  const [page, setPage] = useState('app');
  
  const hendlerChangePage = (page) => {
    setPage(page);
  }
  switch (page) {

    case "app":
      return <HomePage onChangePage={hendlerChangePage}/>
    
    case "game":
      return <GamePage onChangePage={hendlerChangePage}/>

    default:
      return <HomePage />
  }
};

export default App;

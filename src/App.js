import {useLocation, Route, Switch, Redirect } from "react-router-dom";
import cn from "classnames";
import { NotificationContainer} from 'react-notifications'

import HomePage from "./routes/Home";
import GamePage from "./routes/Game";
import About from "./routes/About";
import Contact from "./routes/Contact";
import NotFound from "./routes/NotFound";
import MenuHeader from "./components/MenuHeader/MenuHeader";
import Footer from "./components/Footer";

import'react-notifications/lib/notifications.css';
import s from './style.module.css'
import PrivateRoute from "./components/PrivateRoute";


const App = () => {
  const location = useLocation();
  const isPadding = location.pathname ==='/' || location.pathname ==='/game/board';

  return (
      <Switch>
          <Route path="/404" component={NotFound}/>

          <Route>
            <>
              <MenuHeader 
                bgActive={!isPadding }/>

              <div className={cn(s.wrap, {
                [s.isHomePage]: isPadding
              })}>
                
              <Switch>
                <Route path="/" exact component={HomePage}/>
                <PrivateRoute path="/game"  component={GamePage}/>
                <PrivateRoute path="/about"  component={About}/>
                <Route path="/contact"  component={Contact}/>
                <Redirect to="/404" />
              </Switch>
              <NotificationContainer/>

              </div>
              <Footer/>  
            </>
          </Route>

      </Switch>
  )
};

export default App;

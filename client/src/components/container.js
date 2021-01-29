import React from 'react';
import {BrowserRouter as Router, Route, Switch, Link, Redirect, useLocation} from "react-router-dom";

//Components
import WelcomePage from './welcomepage/welcomepage';
import MusicPage from './musicpage/musicpage';

function Container() {
  return (
    <Router>
        
          <Switch>
            <Route path="/" exact component={WelcomePage}/>
            <Route path ="/music" exact component={MusicPage}/>
          </Switch>
        </Router>
  );
}

export default Container;
import "bootstrap/dist/css/bootstrap.min.css";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Routes } from './routes';
import { Navbar } from "../common/layout";
import { useEffect, useState } from "react";
import { IUser } from "../common/types";
import { authAPI } from '../api';
import Home from "../pages/Home";
import SignUp from "../pages/SignUp";
import SignIn from "../pages/SignIn";
import AllNotes from "../pages/views/AllNotes";
import AddNote from "../pages/views/AddNote";
import EditNote from "../pages/views/EditNote";

const App = () => {
  const [currentUser, setCurrentUser] = useState<IUser | null>(null);

  useEffect(() => {
    const user = authAPI.getCurrentUser();
    if (user) {
      setCurrentUser(user);
    }
  }, []);

  const logOut = () => {
    authAPI.logOut();
    setCurrentUser(null);
  };

  return(
    <Router>
      <div className="app">
        <Navbar logOut={logOut} currentUser={currentUser}/>
        <Switch>
          <Route exact path={Routes.Home} component={Home}/>
          <Route exact path={Routes.SignUp} component={SignUp}/>
          <Route exact path={Routes.SignIn}>
            <SignIn setCurrentUser={setCurrentUser}/>
          </Route>
          <Route path={Routes.Notes} component={AllNotes}/>
          <Route path={Routes.CreateNote} component={AddNote}/>
          <Route path={Routes.EditNote} component={EditNote}/>
        </Switch>
      </div>
    </Router>
  )
};

export default App;
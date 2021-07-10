import { BrowserRouter, Route } from "react-router-dom";

import Events from "../components/Events/Events";
import SolInsts from "../components/SolInst/SolInsts";
import MisEvents from "../components/Mis/MisEvents";
import Benef from "../components/Benef/Benef";
import Admin from "../components/Admin/Admin";
import Profile from "../components/Profiles/Profile";
import Login from "../components/Session/Login";
import Logout from "../components/Session/Logout";

import NavBar from "../components/NavBar/NavBar";

function App() {
  return (
    <div className="App">
      <NavBar user={JSON.parse(localStorage.getItem("loggedUser"))} />
      <BrowserRouter>
        <Route path="/" exact component={Events} />

        <Route path="/events" exact component={Events} />
        <Route path="/solidarity_institutions" exact component={SolInsts} />

        <Route path="/mis" exact component={MisEvents} />

        <Route path="/benef" exact component={Benef} />

        <Route path="/admin" exact component={Admin} />

        <Route path="/profile" exact component={Profile} />

        <Route path="/login" exact component={Login} />
        <Route path="/logout" exact component={Logout} />
      </BrowserRouter>
    </div>
  );
}

export default App;

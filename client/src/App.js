import { BrowserRouter, Route } from "react-router-dom";

import Events from "./components/Events/Events";
import SolInsts from "./components/SolInst/SolInsts";
import MisEvents from "./components/Mis/MisEvents";
import Benefits from "./components/Benef/Benef";
import Profile from "./components/Profiles/Profile";

import NavBar from "./components/NavBar/NavBar";

function App() {
  return (
    <div className="App">
      <NavBar />
      <BrowserRouter>
        <Route path="/" exact component={Events} />
        <Route path="/events" exact component={Events} />
        <Route path="/solidarity_institutions" exact component={SolInsts} />
        <Route path="/mis/events" exact component={MisEvents} />
        <Route path="/benefits" exact component={Benefits} />
        <Route path="/profiles" exact component={Profile} />
      </BrowserRouter>
    </div>
  );
}

export default App;

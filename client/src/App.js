import { BrowserRouter, Route } from "react-router-dom";

import Events from "./components/Events/Events";
import SolInsts from "./components/SolInst/SolInsts";
import MisEvents from "./components/Mis/MisEvents";
import Benefits from "./components/Benef/Benef";

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
      </BrowserRouter>
    </div>
  );
}

export default App;

import { BrowserRouter, Route } from "react-router-dom";

import Events from "./components/Events/Events";
import SolInsts from "./components/SolInst/SolInsts";
import NavBar from "./components/NavBar/NavBar";

function App() {
  return (
    <div className="App">
      <NavBar />
      <BrowserRouter>
        <Route path="/" exact component={Events} />
        <Route path="/events" exact component={Events} />
        <Route path="/solidarity_institutions" exact component={SolInsts} />
      </BrowserRouter>
    </div>
  );
}

export default App;

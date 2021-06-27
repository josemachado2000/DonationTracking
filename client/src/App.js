import { BrowserRouter, Route } from "react-router-dom";
import Events from "./components/Events/Events";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Route path="/" exact component={Events} />
      </BrowserRouter>
    </div>
  );
}

export default App;

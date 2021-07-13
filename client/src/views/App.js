import { BrowserRouter, Route } from "react-router-dom";

import Events from "../components/Events/Events";
import SolInsts from "../components/SolInst/SolInsts";
import MisEvents from "../components/Mis/MisEvents";
import Benef from "../components/Benef/Benef";
import Admin from "../components/Admin/Admin";
import Profile from "../components/Profiles/Profile";
import Login from "../components/Session/Login";
import Logout from "../components/Session/Logout";
import Signup from "../components/Session/Signup";
import Donations from "../components/Donations/Donations";
import NavBar from "../components/NavBar/NavBar";
import Invoices from "../components/SupplCo/Invoices";
import Orders from "../components/SupplCo/SupplCoOrders";
import MisInvoices from "../components/Mis/MisInvoices";

function App() {
  return (
    <div className="App">
      <NavBar user={JSON.parse(localStorage.getItem("loggedUser"))} />
      <BrowserRouter>
        <Route path="/" exact component={Events} />

        <Route path="/events" exact component={Events} />
        <Route path="/solidarity_institutions" exact component={SolInsts} />
        <Route path="/donations" exact component={Donations} />

        <Route path="/mis" exact component={MisEvents} />
        <Route path="/mis/invoices" exact component={MisInvoices} />

        <Route path="/benef" exact component={Benef} />

        <Route path="/admin" exact component={Admin} />

        <Route path="/profile" exact component={Profile} />

        <Route path="/login" exact component={Login} />
        <Route path="/logout" exact component={Logout} />
        <Route path="/signup" exact component={Signup} />

        <Route path="/supplco" exact component={Invoices} />
        <Route path="/supplco/orders" exact component={Orders} />
      </BrowserRouter>
    </div>
  );
}

export default App;

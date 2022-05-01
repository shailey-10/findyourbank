import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate
} from "react-router-dom";
import AllBanks from "./pages/AllBanks";
import './App.css';
import Bank from "./pages/Bank";
import Favourites from "./pages/Favourites";

function App() {
  return (
    <Router>
      <div>
        <nav  className="navBar">
          <ul>
            <li>
              <Link to="/all-banks">All Banks</Link>
            </li>
            <li>
              <Link to="/favorites">Favorites</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/all-banks" element = {<AllBanks />} />
          <Route path="/favorites" element = {<Favourites />} />
          <Route path="/bank-details/:ifsc" element = {<Bank />} />
          <Route path="*" element={<Navigate to= '/all-banks'/>} />
        </Routes>
      </div>
    </Router>
  );

}

export default App;

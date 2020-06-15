import React from 'react';
import './App.scss';
import Header from "./components/Header";
import Filter from "./components/Filter";
import Tickets from "./components/Tickets";

function App() {
  return (
    <div className="AppWrapper">
        <div className="header"><Header/></div>
        <div className="ticketsContainer"><Tickets/></div>
        <div className="filter"><Filter/></div>
    </div>
  );
}

export default App;



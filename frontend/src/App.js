import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Messenger from "./components/Messenger";

const App = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/messenger/login" element={<Login />} />
          <Route path="/messenger/register" element={<Register />} />
          <Route path="/" element={<Messenger />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;

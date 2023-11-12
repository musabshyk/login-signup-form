import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./components/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";
import ForgotPassword from "./components/ForgotPassword";
import Signout from "./components/Signout";
import { auth } from "./firebase";

import "./Style.css";
import { AuthContextProvider } from "./context/AuthContext";

function App() {
  const [userName, setUserName] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUserName(user.displayName);
        setIsAuthenticated(true);
      } else {
        setUserName("");
        setIsAuthenticated(false);
      }
    });

 
    return () => unsubscribe();
  }, []);

  return (
    <div className="App">
      <AuthContextProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgotpassword" element={<ForgotPassword />} />
          <Route
            path="/"
            element={
              isAuthenticated ? (
                <Home name={userName} isAuthenticated={isAuthenticated} />
              ) : (
                <Login setIsAuthenticated={setIsAuthenticated} />
              )
            }
          />
        </Routes>
      </Router>
      </AuthContextProvider>
    </div>
  );
}

export default App;

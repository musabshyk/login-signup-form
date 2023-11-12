import React from "react";
import { auth } from "../firebase";

function Signout({ setIsAuthenticated }) {
  const handleSignOut = async () => {
    try {
      await auth.signOut();
      setIsAuthenticated(false);
      localStorage.clear();
      window.location.reload()
    } catch (error) {
      console.error("Error signing out:", error.message);
    }
  };

  return (
    <button onClick={handleSignOut}>
      Sign Out
    </button>
  );
}

export default Signout;

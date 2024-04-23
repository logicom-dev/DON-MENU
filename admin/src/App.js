import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Index from "./Routes";

function App() {
  const navigate = useNavigate();

  useEffect(() => {
    const tokenExpirationTime = 2 * 60 * 60 * 1000; // 2 hours in milliseconds
    const tokenStartTime = localStorage.getItem("mas_tokenStartTime");
    const currentTime = new Date().getTime();

    if (tokenStartTime && currentTime - tokenStartTime > tokenExpirationTime) {
      localStorage.removeItem("mas_decodedToken");
      localStorage.removeItem("mas_tokenStartTime");
      navigate("/admin");
    } else if (!tokenStartTime) {
      localStorage.setItem("mas_tokenStartTime", currentTime);
    }
  }, [navigate]);

  return <Index />;
}

export default App;

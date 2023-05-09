import React, { useContext, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Home from "./pages/Home";
import Signup from "./components/Signup";
import Signin from "./components/Signin";
import { AuthContext } from "./context/auth-context";

function App() {
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentUser) {
      navigate("/signin");
    } else {
      navigate("/");
    }
  }, [currentUser]);

  return (
    <Routes>
      {currentUser && <Route path="/" element={<Home />} />}
      {!currentUser && <Route path="/signin" element={<Signin />} />}
      {!currentUser && <Route path="/signup" element={<Signup />} />}
      <Route path="*" element={<h1>Page not found</h1>} />
    </Routes>
  );
}

export default App;

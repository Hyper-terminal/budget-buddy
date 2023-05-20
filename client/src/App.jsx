import React, { useContext, useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import ExpenseModal from "./components/ExpenseModal";
import SimpleSidebar from "./components/Sidebar/SimpleSidebar";
import Signin from "./components/Signin";
import Signup from "./components/Signup";
import { AuthContext } from "./context/auth-context";
import Home from "./pages/Home";

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
    <>
      <ExpenseModal />
      <Routes>
        {!currentUser && <Route path="/signin" element={<Signin />} />}
        {!currentUser && <Route path="/signup" element={<Signup />} />}

        {currentUser && (
          <Route path="/" element={<SimpleSidebar />}>
            <Route index element={<Home />} />
            <Route path="*" element={<h1>Page not found</h1>} />
          </Route>
        )}
      </Routes>
    </>
  );
}

export default App;

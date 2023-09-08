import React, { useContext, useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import ExpenseModal from "./components/ExpenseModal";
import SimpleSidebar from "./components/Sidebar/SimpleSidebar";
import Signin from "./components/Signin";
import Signup from "./components/Signup";
import { AuthContext } from "./context/auth-context";
import ExpenseDetailsPage from "./pages/ExpenseDetailsPage";
import ExpenseEditPage from "./pages/ExpenseEditPage";
import ExpensesPage from "./pages/ExpensesPage";
import Home from "./pages/Home";
import { useExpense } from "./context/expense-context";
import { NotFound } from "./pages/NotFound";
import { ForgotPassword } from "./components/ForgotPassword";

function App() {
  const { setExpenses, setTotalExpenses } = useExpense();
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    if (currentUser) {
      fetch("http://localhost:3000/expenses", {
        headers: { Authorization: localStorage.getItem("JWT_TOKEN") },
      })
        .then((res) => res.json())
        .then((result) => {
          setTotalExpenses(Number(result.totalExpenses));
          setExpenses(result.expenses);
        })
        .catch((err) => console.error(err));
    }
  }, [currentUser]);

  return (
    <>
      <ExpenseModal />
      <Routes>
        {currentUser && (
          <Route path="/" element={<Navigate to="/expenses" />} />
        )}
        {!currentUser && <Route path="/" element={<Navigate to="/signin" />} />}

        {!currentUser && <Route path="/signin" element={<Signin />} />}
        {!currentUser && <Route path="/signup" element={<Signup />} />}
        {!currentUser && (
          <Route path="/forgot-password" element={<ForgotPassword />} />
        )}

        {currentUser && (
          <Route path="/expenses/*" element={<SimpleSidebar />}>
            <Route index element={<Home />} />
            <Route path="all" element={<ExpensesPage />} />
            <Route path=":expenseId/edit" element={<ExpenseEditPage />} />
            <Route path=":expenseId" element={<ExpenseDetailsPage />} />
          </Route>
        )}

        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;

import { createContext, useContext, useState, useEffect } from "react";

const ExpenseContext = createContext({
  expenses: [],
  setExpenses: () => {},
  error: String,
  setError: () => {}
});

export const useExpense = () => useContext(ExpenseContext);

export const ExpenseProvider = ({ children }) => {
  const [expenses, setExpenses] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    console.log("Running this code")
    fetch("http://localhost:3000/expenses", {
      headers: { Authorization: localStorage.getItem("JWT_TOKEN") },
    })
      .then((res) => res.json())
      .then((result) => setExpenses(result.expenses))
      .catch((err) => console.error(err));
  }, []);

  const value = {
    expenses,
    setExpenses,
    error,
    setError,
  };

  return (
    <ExpenseContext.Provider value={value}>{children}</ExpenseContext.Provider>
  );
};

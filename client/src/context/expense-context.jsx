import { createContext, useContext, useState, useEffect } from "react";

const ExpenseContext = createContext({
  expenses: [],
  setExpenses: () => {},

  isExpenseModalOpen: false,
  openExpenseModal: () => {},
  closeExpenseModal: () => {},
});

export const useExpense = () => useContext(ExpenseContext);

export const ExpenseProvider = ({ children }) => {
  const [expenses, setExpenses] = useState([]);
  const [error, setError] = useState("");
  const [isExpenseModalOpen, setIsExpenseModalOpen] = useState(false);

  useEffect(() => {
    fetch("http://localhost:3000/expenses", {
      headers: { Authorization: localStorage.getItem("JWT_TOKEN") },
    })
      .then((res) => res.json())
      .then((result) => setExpenses(result.expenses))
      .catch((err) => console.error(err));
  }, []);

  const openExpenseModal = () => {
    setIsExpenseModalOpen(true);
  };

  const closeExpenseModal = () => {
    setIsExpenseModalOpen(false);
  };

  const value = {
    expenses,
    setExpenses,
    error,
    setError,
    isExpenseModalOpen,
    openExpenseModal,
    closeExpenseModal,
  };

  return (
    <ExpenseContext.Provider value={value}>{children}</ExpenseContext.Provider>
  );
};

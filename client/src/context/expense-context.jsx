import { createContext, useContext, useState, useEffect } from "react";
import { useToast } from "@chakra-ui/react";

const ExpenseContext = createContext({
  expenses: [],
  setExpenses: () => {},
  deleteExpense: () => {},
  isExpenseModalOpen: false,
  openExpenseModal: () => {},
  closeExpenseModal: () => {},
});

export const useExpense = () => useContext(ExpenseContext);

export const ExpenseProvider = ({ children }) => {
  const [expenses, setExpenses] = useState([]);
  const toast = useToast();

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

  const deleteExpense = async (expenseId, callback) => {
    try {
      const res = await fetch(`http://localhost:3000/expenses/${expenseId}`, {
        method: "DELETE",
        headers: { Authorization: localStorage.getItem("JWT_TOKEN") },
      });

      if (res.ok) {
        // Handle successful deletion
        setExpenses((prev) =>
          prev.filter((exp) => Number(exp.id) !== Number(expenseId))
        );
        callback();
        toast({
          title: "Expense deleted",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      } else {
        // Handle deletion error
        toast({
          title: "Error deleting expense",
          description: "Failed to delete the expense.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    } catch (error) {
      // Handle fetch or other error
      toast({
        title: "Error",
        description: "An error occurred while deleting the expense.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const value = {
    expenses,
    setExpenses,
    deleteExpense,
    isExpenseModalOpen,
    openExpenseModal,
    closeExpenseModal,
  };

  return (
    <ExpenseContext.Provider value={value}>{children}</ExpenseContext.Provider>
  );
};

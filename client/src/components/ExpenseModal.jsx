import React, { useState, useEffect } from "react";
import { Box } from "@chakra-ui/react";
import { motion, AnimatePresence } from "framer-motion";
import ExpenseForm from "./ExpenseForm";
import { useExpense } from "../context/expense-context";

const ExpenseModal = () => {
  const { isExpenseModalOpen, closeExpenseModal } = useExpense();

  return (
    <AnimatePresence>
      {isExpenseModalOpen && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          style={{
            position: "fixed",
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 9999,
            backgroundColor: "rgba(0, 0, 0, 0.8)",
          }}
        >
          <ExpenseForm />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ExpenseModal;

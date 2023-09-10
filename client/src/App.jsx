import { Spinner } from "@chakra-ui/react";
import { lazy, Suspense, useContext, useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import ExpenseModal from "./components/ExpenseModal";
import { ForgotPassword } from "./components/ForgotPassword";
import SimpleSidebar from "./components/Sidebar/SimpleSidebar";
import Signin from "./components/Signin";
import Signup from "./components/Signup";
import { AuthContext } from "./context/auth-context";
import { useExpense } from "./context/expense-context";

const ExpenseDetailsPage = lazy(() => import("./pages/ExpenseDetailsPage"));
const ExpenseEditPage = lazy(() => import("./pages/ExpenseEditPage"));
const ExpensesPage = lazy(() => import("./pages/ExpensesPage"));
const Home = lazy(() => import("./pages/Home"));
const Report = lazy(() => import("./pages/Report"));
const NotFound = lazy(() => import("./pages/NotFound"));

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
    <Suspense fallback={<Spinner />}>
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
            <Route path="report" element={<Report />} />
          </Route>
        )}

        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
}

export default App;

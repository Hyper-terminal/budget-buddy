import { useEffect, useState } from "react";
import Expenses from "./components/Expenses";
import ExpenseForm from "./components/ExpenseForm";

function App() {
  const [data, setData] = useState([]);

  const deleteHandler = (id) => {
    setData((prev) => prev.filter((item) => item.id !== id));
  };

  useEffect(() => {
    fetch("http://localhost:3000/expenses")
      .then((res) => res.json())
      .then((result) => setData(result))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="bg-gray-900 min-h-screen">
      <ExpenseForm onSetData={setData} />
      <Expenses data={data} onDelete={deleteHandler} />
    </div>
  );
}

export default App;

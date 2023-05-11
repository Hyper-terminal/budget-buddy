import { useEffect, useState } from "react";
import Banner from "../components/Banner";
import Categories from "../components/Categories";
import Chart from "../components/Chart";
import ExpenseForm from "../components/ExpenseForm";
import Expenses from "../components/Expenses";

const Home = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState("");

  const deleteHandler = (id) => {
    setData((prev) => prev.filter((item) => item.id !== id));
  };
  const dataHandler = async (expense) => {
    try {
      const res = await fetch("http://localhost:3000/expenses", {
        method: "post",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(expense),
      });
      if (!res.ok) {
        throw new Error("Failed to create expense");
      }
      const data = await res.json();
      setData((prev) => [...prev, data]);
      setError("");
    } catch (error) {
      console.error(error);
      setError(error.message);
    }
  };

  useEffect(() => {
    fetch("http://localhost:3000/expenses")
      .then((res) => res.json())
      .then((result) => setData(result))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div>
      {error && <p className="text-red-500">{error}</p>}

      <div className="flex items-center flex-wrap justify-center w-screen mt-10 lg:mt-0 px-5">
        <Banner />
        <ExpenseForm onSetData={dataHandler} />
      </div>
      <div className="flex gap-5 flex-wrap justify-center mt-10 mb-10">
        <Chart data={data} />
        <div className="flex gap-5 justify-center flex-wrap">
          <Expenses data={data} onDelete={deleteHandler} />
          <Categories />
        </div>
      </div>
    </div>
  );
};

export default Home;

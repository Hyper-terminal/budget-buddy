import Banner from "../components/Banner";
import Categories from "../components/Categories";
import Chart from "../components/Chart";
import ExpenseForm from "../components/ExpenseForm";
import Expenses from "../components/Expenses";
import { useExpense } from "../context/expense-context";

const Home = () => {
  const { expenses, error } = useExpense();

  return (
    <div>
      {error && <p className="text-red-500">{error}</p>}
      <div className="flex items-center flex-wrap justify-center w-screen mt-10 lg:mt-0 px-5">
        <Banner />
        <ExpenseForm />
      </div>
      <div className="flex gap-5 flex-wrap justify-center mt-10 mb-10">
        <Chart />
        <div className="flex gap-5 justify-center flex-wrap">
          <Expenses />
          <Categories />
        </div>
      </div>
    </div>
  );
};

export default Home;

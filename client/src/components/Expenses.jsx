import Card from "./UI/Card";
import Divider from "./UI/Divider";
import ExpenseCard from "./ExpenseCard";
import { useExpense } from "../context/expense-context";

const Expenses = () => {
  const { expenses } = useExpense();
  return (
    <Card style={{ width: "25rem", display: "inline-block" }}>
      <div className="flex justify-between p-3 items-center">
        <h3 className="font-bold text-xl">My Expenses</h3>
        <p className="text-sm font-semibold cursor-pointer">See All</p>
      </div>

      <Divider />

      <ul>
        {expenses?.length > 0 &&
          expenses
            ?.slice(0, 5)
            ?.map((item) => <ExpenseCard key={item.id} expense={item} />)}
      </ul>
    </Card>
  );
};

export default Expenses;

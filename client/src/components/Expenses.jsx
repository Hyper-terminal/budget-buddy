import Card from "./UI/Card";
import Divider from "./UI/Divider";
import ExpenseCard from "./ExpenseCard";

const Expenses = ({ data }) => {
  return (
    <Card style={{ width: "25rem", display: "inline-block" }}>
      <div className="flex justify-between p-3 items-center">
        <h3 className="font-bold text-xl">My Expenses</h3>
        <p className="text-sm font-semibold cursor-pointer">See All</p>
      </div>

      <Divider />

      <ul>
        {data?.length > 0 &&
          data?.slice(0,5)?.map((item, index) => (
            <ExpenseCard key={item.id} expense={item} />
          ))}
      </ul>
    </Card>
  );
};

export default Expenses;

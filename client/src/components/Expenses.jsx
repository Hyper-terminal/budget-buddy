import ExpenseCard from "./ExpenseCard";

const Expenses = ({ data, onDelete }) => {
  return (
    <ul>
      {data.length > 0 &&
        data.map((item) => (
          <ExpenseCard key={item.id} expense={item} onDelete={onDelete} />
        ))}
    </ul>
  );
};

export default Expenses;

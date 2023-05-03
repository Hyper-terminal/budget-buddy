import { useRef } from "react";
import Input from "./Input";

const ExpenseForm = ({ onSetData }) => {
  const formRef = useRef();

  const submitHandler = (event) => {
    event.preventDefault();
    const { category, description, amount } = event.target;

    fetch("http://localhost:3000/expenses", {
      method: "post",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        category: category.value,
        description: description.value,
        amount: amount.value,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        formRef.current.reset();
        onSetData((prev) => [...prev, data]);
      })
      .catch((err) => console.error(err));
  };

  return (
    <div>
      <form
        ref={formRef}
        onSubmit={submitHandler}
        className="flex flex-col gap-2 w-96 mx-auto mt-5"
      >
        <Input type="text" name="description" placeholder="description" />
        <Input type="number" name="amount" placeholder="amount " />
        <Input type="text" name="category" placeholder="category" />
        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        >
          Add Expense
        </button>
      </form>
    </div>
  );
};

export default ExpenseForm;

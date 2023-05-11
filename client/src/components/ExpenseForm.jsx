import { useState } from "react";
import Card from "./UI/Card";
import Input from "./UI/Input";
import DropDown from "./UI/DropDown";

const formInitialState = {
  description: "",
  amount: "",
};

const categories = ["Food", "Travel", "Entertainment", "Bills", "Others"];

const ExpenseForm = ({ onSetData }) => {
  const [form, setForm] = useState(formInitialState);
  const [category, setCategory] = useState("");
  const { description, amount } = form;
  const [error, setError] = useState("");

  const handleCategorySelect = (selectedCategory) => {
    setError("");
    setCategory(selectedCategory);
  };

  const changeHandler = (event) => {
    setError("");
    setForm((prev) => {
      return { ...prev, [event.target.name]: event.target.value };
    });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    if (!category) {
      setError("Please select a category");
      return;
    }
    if (!description) {
      setError("Please enter a description");
      return;
    }
    if (!amount) {
      setError("Please enter an amount");
      return;
    }
    onSetData({ ...form, category });
    setForm(formInitialState);
    setCategory("");
    setError("");
  };

  return (
    <Card style={{ display: "inline-flex", marginTop: "1rem" }}>
      <form
        onSubmit={submitHandler}
        className="flex flex-col gap-2 w-96 mx-auto mt-5"
      >
        {error && <p className="text-red-500">{error}</p>}
        <DropDown
          categories={categories}
          selectedCategory={category}
          onSelect={handleCategorySelect}
        />
        <Input
          type="number"
          name="amount"
          placeholder="Amount "
          value={amount}
          onChange={changeHandler}
          error={!amount && error === "Please enter an amount"}
          required
        />
        <textarea
          className={`${
            !description && error === "Please enter a description"
              ? "border-red-400"
              : ""
          } outline-none border p-3 text-gray-900 bg-[#f9f9ff] rounded-lg focus:border-blue-500 transition-colors duration-300 ease-linear`}
          name="description"
          placeholder="Description"
          value={description}
          onChange={changeHandler}
        />
        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        >
          Add Expense
        </button>
      </form>
    </Card>
  );
};

export default ExpenseForm;

const ExpenseCard = ({ onDelete, expense }) => {
  const deleteHandler = () => {
    fetch(`http://localhost:3000/users/${expense.id}`, {
      method: "delete",
    })
      .then((res) => res.json())
      .then(() => {
        onDelete(expense.id);
        console.log("Item deleted successfully!");
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="border text-lg w-96 font-semibold border-gray-200 rounded-md mx-auto flex justify-around p-2 items-center">
      <h2>{expense?.username}</h2>
      <p>{expense?.phone}</p>
      <button
        onClick={deleteHandler}
        type="button"
        className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
      >
        Remove
      </button>
    </div>
  );
};
export default ExpenseCard;

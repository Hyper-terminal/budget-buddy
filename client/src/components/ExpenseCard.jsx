import { RiBillLine } from "react-icons/ri";
import ExpenseDetails from "./ExpenseDetails";
import { useState } from "react";

const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const ExpenseCard = ({ expense }) => {
  const [detailsShown, setDetailsShown] = useState(false);
  const currMonth = months[new Date(expense?.updatedAt).getMonth()];
  const currYear = new Date(expense?.updatedAt).getFullYear();
  const currDate = new Date(expense?.updatedAt).getUTCDate();

  const detailsHandler = () => {
    setDetailsShown((prev) => !prev);
  };

  return (
    <>
      {detailsShown && (
        <ExpenseDetails expense={expense} onDetailsHandler={detailsHandler} />
      )}
      <li
        onClick={detailsHandler}
        className="flex items-center justify-around mt-8 hover:bg-gray-200 transition-all duration-300 ease-linear cursor-pointer px-2 py-1 rounded-lg"
      >
        <div className="bg-gray-100 p-3 rounded-lg">
          <RiBillLine />
        </div>
        <div className="flex flex-col">
          <h3 className="font-semibold text-md">{expense?.category}</h3>
          <h4 className="text-gray-600 text-sm">{`${currDate}, ${currMonth} ${currYear}`}</h4>
        </div>

        <div className="bg-red-50 p-1 rounded-md px-4 text-md text-red-600 font-bold">
          ${expense?.amount}
        </div>
      </li>
    </>
  );
};

export default ExpenseCard;

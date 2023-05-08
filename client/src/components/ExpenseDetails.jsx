import Card from "./UI/Card";
import Divider from "./UI/Divider";
import { GrClose } from "react-icons/gr";

const ExpenseDetails = ({ expense, onDetailsHandler }) => {
  const myStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "50%",
    padding: "1.5rem",
    zIndex: "30",
  };

  return (
    <>
      <div
        onClick={onDetailsHandler}
        className="fixed z-20 top-0 left-0 h-screen w-screen overflow-auto bg-[rgba(0,0,0,0.4)]"
      />
      <Card style={myStyle}>
        <button
          onClick={onDetailsHandler}
          className="absolute right-5 cursor-pointer "
        >
          <GrClose className="text-2xl text-gray-700 hover:animate-pulse transition-all duration-100 ease-linear" />
        </button>

        <h2 className="text-4xl text-gray-600 font-bold">
          Category: {expense?.category}
        </h2>
        <h3 className="text-red-500 font-bold text-xl mt-5 mb-3">
          <span className="text-gray-600">Price:</span> ${expense?.amount}
        </h3>
        <Divider />
        <p className="text-gray-600 mt-3 mb-10 font-semibold">
          {expense?.description}
        </p>
        <Divider />
        <div className="flex justify-around flex-wrap">
          <button className="mt-3 rounded-lg bg-red-200 text-red-600 font-bold px-3 py-1 transition-all duration-300 ease-linear hover:bg-red-100">
            Delete
          </button>
          <button className="mt-3 rounded-lg bg-yellow-200 text-yellow-600 font-bold px-3 py-1  transition-all duration-300 ease-linear hover:bg-yellow-100">
            Edit
          </button>
        </div>
      </Card>
    </>
  );
};

export default ExpenseDetails;

import { useState } from "react";

const DropDown = ({ categories, onSelect, selectedCategory }) => {
  const [shown, setShown] = useState(false);
  const shownHandler = () => setShown((prev) => !prev);

  const clickHandler = (item) => {
    shownHandler();
    onSelect(item);
  };

  return (
    <div className="relative inline-block w-full">
      <div
        onClick={shownHandler}
        className={`outline-none disabled text-left cursor-pointer border p-3 ${
          selectedCategory ? "text-gray-900" : "text-gray-400"
        } bg-[#f9f9ff] rounded-lg focus:text-gray-600 focus:border-blue-500 transition-all duration-300 ease-linear w-full`}
      >
        {selectedCategory || "Select a category"}
      </div>
      <div
        className={`absolute w-full z-10 shadow-lg rounded-lg overflow-hidden transition-all duration-300 ease-in-out ${
          shown ? "" : "max-h-0"
        }`}
      >
        {categories.map((item) => (
          <div
            key={item}
            onClick={() => clickHandler(item)}
            className=" outline-none overflow-auto p-3 text-gray-400 bg-[#f9f9ff] rounded-md transition-all duration-300 ease-in-out cursor-pointer hover:text-gray-600 hover:font-semibold hover:bg-[#e7e7ee] "
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DropDown;

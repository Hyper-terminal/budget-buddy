import { TbTriangleFilled, TbTriangleInvertedFilled } from "react-icons/tb";
import Divider from "./UI/Divider";
import useMediaQuery from "../hooks/useMediaQuery";

const Banner = () => {
  const isDesktop = useMediaQuery("(max-width: 1280px)");

  return (
    <div
      className={`inline-flex flex-col w-2/3 ${
        isDesktop && "sm:items-center"
      }`}
    >
      <div className="mb-3 px-8">
        <h2 className="font-bold text-2xl text-gray-500 mb-2">
          Your Remaining balance:
          <span className="text-black font-bold ml-2">$50</span>
        </h2>
        <Divider />
      </div>

      <div className="flex justify-evenly items-center mt-3 flex-wrap">
        <div>
          <h2 className="font-bold text-gray-500">Income/Budget</h2>
          <h3 className="text-6xl font-bold text-gray-800">
            <span className="flex items-center gap-3">
              <TbTriangleFilled className="text-green-500 text-2xl" />
              $50000
            </span>
          </h3>
        </div>
        <div>
          <h2 className="font-bold text-gray-500">Expenses</h2>
          <h3 className="text-6xl font-bold text-gray-800">
            <span className="flex items-center gap-3">
              <TbTriangleInvertedFilled className="text-red-500 text-2xl" />
              $50000
            </span>
          </h3>
        </div>
      </div>
    </div>
  );
};

export default Banner;

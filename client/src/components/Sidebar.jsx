import { useState } from "react";
import { AiOutlineHome } from "react-icons/ai";

const Sidebar = () => {
  const [isShown, setIsShown] = useState(false);

  return (
    <div
      onMouseOver={() => setIsShown(true)}
      onMouseOut={() => setIsShown(false)}
      className={`h-screen ${
        isShown ? "w-[160px]" : "w-[60px]"
      } fixed z-10 top-0 left-0 overflow-x-hidden bg-white border shadow-lg transition-all duration-300`}
    >
      <AiOutlineHome className=" border" />
      <a href="#services">Services</a>
      <a href="#clients">Clients</a>
      <a href="#contact">Contact</a>
    </div>
  );
};

export default Sidebar;

const Input = ({ error, ...rest }) => {
  return (
    <input
      {...rest}
      className={`${
        error ? "border-red-400" : ""
      } outline-none border p-3 text-gray-900  bg-[#f9f9ff] rounded-lg focus:border-blue-500 transition-all duration-300 ease-linear`}
    />
  );
};

export default Input;

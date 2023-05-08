const Card = ({ children, className, ...rest }) => {
  console.log(className)
  const customClasses = className ? className : "";
  return (
    <div
      {...rest}
      className={`${customClasses} rounded-lg shadow-lg bg-white p-3`}
    >
      {children}
    </div>
  );
};

export default Card;
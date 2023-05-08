import Card from "./UI/Card.jsx";
import Input from "./UI/Input.jsx";

const Signup = () => {
  const submitHandler = (event) => {
    event.preventDefault();
  };

  return (
    <Card className="md:w-96 w-[90%] mx-auto">
      <h1 className="text-center text-3xl font-bold mb-3 text-blue-900">
        Budget Buddy
      </h1>
      <form
        onSubmit={submitHandler}
        className="flex flex-col justify-center w-full h-full p-3"
      >
        <label htmlFor="username" className="mt-5 mb-1">
          Name <span className="text-red-600">*</span>
        </label>
        <Input type="name" name="username" placeholder="Pick your name" />
        <label htmlFor="email" className="mt-5 mb-1">
          Email <span className="text-red-600">*</span>
        </label>
        <Input type="email" placeholder="you@example.com" />
        <label htmlFor="Password" className="mt-5 mb-1">
          Password <span className="text-red-600">*</span>
        </label>
        <Input type="password" placeholder="Create a password" />
        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-3  mt-5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        >
          Signup
        </button>
        <a className="cursor-pointer hover:text-gray-500 transition-all duration-300 ease-in-out">
          Already have an account? Sign in
        </a>
      </form>
    </Card>
  );
};

export default Signup;

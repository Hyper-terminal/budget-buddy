import { useContext, useState } from "react";
import Card from "./UI/Card.jsx";
import Input from "./UI/Input.jsx";
import { AuthContext } from "../context/auth-context.jsx";
import { Link } from "react-router-dom";

const API_URL = "http://localhost:3000/users/signin";
const INITIAL_FORM = { email: "", password: "" };

const Signin = () => {
  const [form, setForm] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState("");

  const { signIn } = useContext(AuthContext);

  const inputHandler = (event) => {
    setErrors(null);
    setForm((prev) => {
      return { ...prev, [event.target.name]: event.target.value };
    });
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    try {
      const res = await fetch(API_URL, {
        method: "post",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      signIn(data.user);
      setForm(INITIAL_FORM);
    } catch (error) {
      setErrors(error.message);
    }
  };

  return (
    <Card className="md:w-96 w-[90%] mx-auto mt-24">
      <h1 className="text-center text-3xl font-bold mb-3 text-blue-900">
        Budget Buddy
      </h1>
      {errors && (
        <p className="mt-10 bg-red-100 p-3 rounded-lg text-center text-red-700 font-semibold">
          {errors[0].toLocaleUpperCase() + errors.slice(1)}
        </p>
      )}

      <form
        onSubmit={submitHandler}
        className="flex flex-col justify-center w-full h-full p-3"
      >
        <label htmlFor="email" className="mt-5 mb-1">
          Email <span className="text-red-600">*</span>
        </label>
        <Input
          type="email"
          error={errors}
          placeholder="you@example.com"
          name="email"
          value={form.email}
          onChange={inputHandler}
          required
        />
        <label htmlFor="Password" className="mt-5 mb-1">
          Password <span className="text-red-600">*</span>
        </label>
        <Input
          type="password"
          error={errors}
          placeholder="Create a password"
          name="password"
          value={form.password}
          onChange={inputHandler}
          required
        />
        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-3  mt-5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        >
          Sign in
        </button>
        <Link
          to="/signup"
          className="cursor-pointer hover:text-gray-500 transition-all duration-300 ease-in-out"
        >
          Don't have an account? Sign up
        </Link>
      </form>
    </Card>
  );
};

export default Signin;
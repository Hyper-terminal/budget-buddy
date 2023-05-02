import {useRef} from "react";
import Input from "./Input";

const Form = ({onSetData}) => {
    const formRef = useRef();

    const submitHandler = (event) => {
        event.preventDefault();
        const {username, email, phone} = event.target;

        fetch("http://localhost:3000/users", {
            method: "post",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify({
                username: username.value,
                email: email.value,
                phone: phone.value,
            }),
        })
            .then((res) => res.json())
            .then((data) => {
                formRef.current.reset();
                onSetData(prev => [...prev, data]);
            })
            .catch((err) => console.error(err));
    };

    return (
        <form
            ref={formRef}
            onSubmit={submitHandler}
            className="flex flex-col gap-2 w-96 mx-auto"
        >
            <Input type="text" name="username" placeholder="username"/>
            <Input type="number" name="phone" placeholder="phone number"/>
            <Input type="email" name="email" placeholder="Email"/>
            <button
                type="submit"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            >
                Book
            </button>
        </form>
    );
};

export default Form;

import Expenses from "./components/Expenses";
import Form from "./components/Form";
import { useState, useEffect } from "react";

function App() {
  const [data, setData] = useState([]);

  const deleteHandler = (id) => {
    setData((prev) => prev.filter((item) => item.id !== id));
  };

  useEffect(() => {
    fetch("http://localhost:3000/users")
      .then((res) => res.json())
      .then((result) => setData(result))
      .catch((err) => console.error(err));
  }, []);

  return (
    <>
      <Form onSetData={setData} />
      <Expenses data={data} onDelete={deleteHandler} />
    </>
  );
}

export default App;

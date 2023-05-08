import Card from "./UI/Card";
import Divider from "./UI/Divider";

const Categories = () => {
  return (
    <Card style={{ width: "20rem", display: "inline-block" }}>
      <div className="flex justify-between p-3 items-center">
        <h3 className="font-bold text-xl">Categories</h3>
        <p className="text-sm font-semibold cursor-pointer">+</p>
      </div>
      <Divider style={{ width: "95%", marginTop: "1rem" }} />
    </Card>
  );
};
export default Categories;

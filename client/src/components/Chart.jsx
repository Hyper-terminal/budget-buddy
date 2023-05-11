import {
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  ResponsiveContainer,
} from "recharts";

import Card from "./UI/Card";
import useMediaQuery from "../hooks/useMediaQuery";

const Chart = ({ data }) => {
  const isDesktop = useMediaQuery("(min-width: 1280px)");
  return (
    <Card
      style={{
        maxWidth: "100%",
        width: isDesktop ? "45%" : "90%",
        height: "32rem",
        display: "inline-block",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {!data?.length && <h2 className="font-bold text-4xl">No expenses!</h2>}
      {data.length > 0 && (
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
            <PolarGrid />
            <PolarAngleAxis dataKey="category" />
            <PolarRadiusAxis />
            <Radar
              name="user"
              dataKey="amount"
              stroke="#8884d8"
              fill="#8884d8"
              fillOpacity={0.6}
            />
          </RadarChart>
        </ResponsiveContainer>
      )}
    </Card>
  );
};
export default Chart;

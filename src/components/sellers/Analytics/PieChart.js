/** @format */

import Chart from "react-apexcharts";

export default function PieChart() {
  const options = {
    labels: ["Tomato", "Potato", "Cabbage", "Cucumber", "Onion"],
    colors: ["#0F9F55", "#60B332", "#467F3B", "#5E9A50", "#9AD187"],
  };
  const series = [400, 500, 100, 900, 200];

  return (
    <div className="chartContainer">
      <h3 style={{ fontWeight: 600 }}>Top 5 most selling Products</h3>
      <Chart options={options} series={series} type="pie" width="500" />
    </div>
  );
}

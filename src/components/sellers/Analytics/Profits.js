/** @format */

import Chart from "react-apexcharts";

export default function Profits() {
  const data = {
    options: {
      chart: {
        id: "basic-bar",
      },
      xaxis: {
        categories: ["Tomato", "Potato", "Cabbage", "Cucumber", "Onion"],
      },
      colors: ["#408858"],
    },
    series: [
      {
        name: "Profits in ₹",
        data: [1400, 1300, 400, 2300, 700],
      },
    ],
  };

  return (
    <div className="chartContainer">
      <h3 style={{ fontWeight: 600 }}>Profits Earned on Each Product</h3>
      <Chart options={data.options} series={data.series} type="bar" width="500" />
    </div>
  );
}

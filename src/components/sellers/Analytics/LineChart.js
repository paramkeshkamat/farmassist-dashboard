/** @format */

import Chart from "react-apexcharts";

export default function LineChart() {
  const data = {
    options: {
      chart: {
        id: "basic-bar",
      },
      xaxis: {
        categories: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      },
      colors: ["#408858"],
    },
    series: [
      {
        name: "Revenue in ₹",
        data: [400, 230, 320, 330, 410, 170, 190],
      },
    ],
  };

  return (
    <div className="chartContainer">
      <h3 style={{ fontWeight: 600 }}>Daily Revenue</h3>
      <Chart options={data.options} series={data.series} type="line" />
    </div>
  );
}

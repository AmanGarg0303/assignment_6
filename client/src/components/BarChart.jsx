import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";

const BarChart = () => {
  const [selectedMonth, setSelectedMonth] = useState("march");
  const [data, setData] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(
        `http://localhost:5000/api/products/barchart?month=${selectedMonth}`
      );
      const data = await res.json();

      //   console.log(data);

      setData(data);
    };

    fetchData();

    return () => {
      fetchData();
    };
  }, [selectedMonth]);

  const options = {
    options: {
      chart: {
        id: "basic-bar",
      },
    },
    series: [
      {
        name: "Items in range",
        data: data && Object?.values(data),
      },
    ],
    labels: data && Object?.keys(data),
    plotOptions: {
      bar: {
        dataLabels: {
          position: "bottom",
        },
      },
    },
  };

  return (
    <div className="px-40 py-20 ">
      <h2 className="text-xl text-center font-semibold">Bar Chart Stats</h2>
      <select
        onChange={(e) => setSelectedMonth(e.target.value)}
        defaultValue={"march"}
        className="mb-2 p-2"
      >
        <option value="january">January</option>
        <option value="february">February</option>
        <option value="march">March</option>
        <option value="april">April</option>
        <option value="may">May</option>
        <option value="june">June</option>
        <option value="july">July</option>
        <option value="august">August</option>
        <option value="september">September</option>
        <option value="october">October</option>
        <option value="november">November</option>
        <option value="december">December</option>
      </select>

      <div className="p-10 rounded-lg flex justify-center">
        {data && (
          <Chart
            options={options}
            series={options.series}
            type="bar"
            width="600"
          />
        )}
      </div>
    </div>
  );
};

export default BarChart;

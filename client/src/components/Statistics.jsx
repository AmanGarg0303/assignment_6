import React, { useEffect, useState } from "react";

const Statistics = () => {
  const [selectedMonth, setSelectedMonth] = useState("march");
  const [data, setData] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(
        `http://localhost:5000/api/products/statistics?month=${selectedMonth}`
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

  return (
    <div className="px-40 py-20">
      <h2 className="text-xl text-center font-semibold">Statistics</h2>
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

      <div className="bg-yellow-400 p-10 rounded-lg">
        <p>Total Sale - ₹{data?.totalSaleAmount} </p>
        <p>Total Sold Item - {data?.totalSoldItems} </p>
        <p>Total not sold item - {data?.totalNotSoldItems} </p>
      </div>
    </div>
  );
};

export default Statistics;

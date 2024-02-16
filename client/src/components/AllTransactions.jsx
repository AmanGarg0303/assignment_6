import { useEffect, useState } from "react";

export default function AllTransactions() {
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(2);
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("march");

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(
        `http://localhost:5000/api/products/transactions?page=${page}&search=${searchQuery}&month=${selectedMonth}`
      );
      const data = await res.json();

      // console.log(data);

      if (data.totalPages !== totalPages) {
        setTotalPages(data.totalPages);
      }

      setProducts(data.products);
    };

    fetchData();

    return () => {
      fetchData();
    };
  }, [page, selectedMonth, searchQuery]);

  return (
    <div className="relative overflow-x-auto px-40 py-10 ">
      <div className="flex justify-between gap-2 pb-5">
        <input
          type="text"
          placeholder="Search"
          className="px-3 py-1.5 outline-none"
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        <select
          onChange={(e) => setSelectedMonth(e.target.value)}
          defaultValue={"march"}
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
      </div>
      <table className="w-full text-sm text-left rtl:text-right text-gray-900 border border-gray-900">
        <thead className="text-sm text-white uppercase bg-[#201f23] border-b border-gray-900">
          <tr className="tracking-wider">
            <th scope="col" className="px-6 py-3">
              ID
            </th>
            <th scope="col" className="px-6 py-3">
              Title
            </th>
            <th scope="col" className="px-6 py-3">
              Description
            </th>
            <th scope="col" className="px-6 py-3">
              Price
            </th>
            <th scope="col" className="px-6 py-3">
              Category
            </th>
            <th scope="col" className="px-6 py-3">
              Sold
            </th>
            <th scope="col" className="px-6 py-3">
              Image
            </th>
          </tr>
        </thead>
        <tbody>
          {products &&
            products?.map((product) => (
              <tr
                key={product._id}
                className="border-b border-gray-900 hover:bg-gray-200"
              >
                <td className="px-6 py-4">{product._id.slice(0, 10)}</td>
                <td className="px-6 py-4">{product.title.slice(0, 20)}</td>
                <td className="px-6 py-4">
                  {product.description.slice(0, 20)}
                </td>
                <td className="px-6 py-4">{product.price}</td>
                <td className="px-6 py-4">{product.category}</td>
                <td className="px-6 py-4">
                  {product.sold === true ? "Yes" : "No"}
                </td>
                <td className="px-6 py-4">
                  <img
                    src={product.image}
                    alt="product"
                    className="w-20 h-20"
                  />
                </td>
              </tr>
            ))}
        </tbody>
      </table>

      <nav
        className="flex items-center flex-column flex-wrap md:flex-row justify-between pt-4"
        aria-label="Table navigation"
      >
        {/* <span className="text-sm font-normal text-gray-400 mb-4 md:mb-0 block w-full md:inline md:w-auto">
          Showing{" "}
          <span className="font-semibold">
            {page * LIMIT - 10}-{page * LIMIT}
          </span>{" "}
          of <span className="font-semibold">{totalPages * LIMIT}</span>
        </span> */}
        <ul className="inline-flex -space-x-px rtl:space-x-reverse text-sm h-8">
          <li>
            <button
              className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-900 border border-gray-900 rounded-s-lg hover:text-blue-700 cursor-pointer disabled:cursor-not-allowed"
              disabled={page <= 1}
              onClick={() => setPage((prev) => prev - 1)}
            >
              Previous
            </button>
          </li>

          <li>
            <button
              className="flex items-center justify-center px-3 h-8 leading-tight text-gray-900 border border-gray-900 rounded-e-lg hover:text-blue-700 cursor-pointer disabled:cursor-not-allowed"
              disabled={page === totalPages}
              onClick={() => setPage((prev) => prev + 1)}
            >
              Next
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
}

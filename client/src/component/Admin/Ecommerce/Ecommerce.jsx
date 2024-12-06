import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Doughnut, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
} from "chart.js";
import { FaListAlt } from "react-icons/fa";
import { BsBoxSeam, BsCurrencyDollar } from "react-icons/bs";
import { MdOutlineSupervisorAccount } from "react-icons/md";
import { getAdminProduct } from "../../../actions/productAction";
import { getAllOrders } from "../../../actions/orderAction";
import { getAllUsers } from "../../../actions/userAction";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement
);

const Ecommerce = () => {
  const dispatch = useDispatch();
  const {products} = useSelector((state) => state.adminProducts);
  const orders = useSelector((state) => state.allOrders?.orders || []);
  const users = useSelector((state) => state.allUsers?.users || []);

  const [totalAmount, setTotalAmount] = useState(0);
  const [outOfStock, setOutOfStock] = useState(0);

  useEffect(() => {
    dispatch(getAdminProduct());
    dispatch(getAllOrders());
    dispatch(getAllUsers());
  }, [dispatch]);

  useEffect(() => {
    if (products.length) {
      let outOfStockCount = 0;
      products.forEach((item) => {
        if (item.Stock === 0) {
          outOfStockCount += 1;
        }
      });
      setOutOfStock(outOfStockCount);
    }
  }, [products]);

  useEffect(() => {
    if (orders.length) {
      let amount = 0;
      orders.forEach((item) => {
        amount += item.totalPrice;
      });
      setTotalAmount(amount);
    }
  }, [orders]);

  const stockData = {
    labels: ["Out of Stock", "In Stock"],
    datasets: [
      {
        label: "Stock Status",
        data: [outOfStock, products.length - outOfStock],
        backgroundColor: ["#ff6384", "#36a2eb"],
      },
    ],
  };

  const financialData = {
    labels: ["Initial Amount", "Amount Earned"],
    datasets: [
      {
        label: "Financial Data",
        data: [0, totalAmount],
        borderColor: "#ff6384",
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        pointBackgroundColor: "#ff6384",
        fill: true,
      },
    ],
  };

  return (
    <div className="bg-white font-[sans-serif] px-4 max-w-6xl mx-auto">
      <div className="flex flex-wrap lg:flex-nowrap justify-center">
        <div className="h-40 rounded-xl w-full lg:w-80 p-8 pt-9 m-3 bg-blue-50">
          <div className="flex justify-between items-center">
            <div>
              <p className="font-semibold text-gray-400">Earnings</p>
              <p className="text-2xl">${totalAmount.toLocaleString()}</p>
            </div>
            <button
              type="button"
              className="text-2xl cursor-default bg-blue-500 opacity-0.9 text-white hover:drop-shadow-xl rounded-full p-4"
            >
              <BsCurrencyDollar />
            </button>
          </div>
        </div>
        {/* Cards */}
        <div className="flex m-3 flex-wrap justify-center gap-1 items-center">
          <div className="bg-blue-50 h-40 md:w-40 p-4  rounded-2xl">
            <Link to="/admin/products">
              <button
                type="button"
                className="text-white bg-green-400 text-2xl opacity-0.9 rounded-full p-4 hover:drop-shadow-xl"
              >
                <BsBoxSeam />
              </button>
            </Link>
            <p className="mt-3">
              <span className="text-lg font-semibold">{products.length}</span>
            </p>
            <p className="text-sm text-gray-400 mt-1">Products</p>
          </div>

          <div className="bg-blue-50 h-40 md:w-40 p-4  rounded-2xl">
            <Link to="/admin/orders">
              <button
                type="button"
                className="text-white bg-orange-500 text-2xl opacity-0.9 rounded-full p-4 hover:drop-shadow-xl"
              >
                <FaListAlt />
              </button>
            </Link>
            <p className="mt-3">
              <span className="text-lg font-semibold">{orders.length}</span>
            </p>
            <p className="text-sm text-gray-400 mt-1">Orders</p>
          </div>

          <div className="bg-blue-50 h-40 md:w-40 p-4  rounded-2xl">
            <Link to="/admin/users">
              <button
                type="button"
                className="text-white bg-gray-300 text-2xl opacity-0.9 rounded-full p-4 hover:drop-shadow-xl"
              >
                <MdOutlineSupervisorAccount />
              </button>
            </Link>
            <p className="mt-3">
              <span className="text-lg font-semibold">{users.length}</span>
            </p>
            <p className="text-sm text-gray-400 mt-1">Users</p>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="flex flex-col lg:flex-row mt-10 gap-10 justify-center items-center w-full">
        <div className="w-full lg:w-1/2 p-4">
          <Doughnut data={stockData} />
        </div>
        <div className="w-full lg:w-1/2 p-4">
          <Line data={financialData} />
        </div>
      </div>
    </div>
  );
};

export default Ecommerce;

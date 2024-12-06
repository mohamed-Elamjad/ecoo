import { useEffect } from "react";
import { DataGrid } from "@material-ui/data-grid";
import { useSelector, useDispatch } from "react-redux";
import { useAlert } from "react-alert";
import { clearErrors, myOrders } from "../../actions/orderAction";
import Loader from "../Layout/Loader/Loader";
import LaunchIcon from "@material-ui/icons/Launch";
import { Link } from "react-router-dom";

const MyOrders = () => {
  const dispatch = useDispatch();
  const alert = useAlert();

  // Providing a default empty array for orders
  const { loading, error, orders = [] } = useSelector((state) => state.myOrders);
  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    dispatch(myOrders());
  }, [dispatch, alert, error]);

  const columns = [
    { field: "id", headerName: "ID", flex: 1, minWidth: 200 },
    {
      field: "status",
      headerName: "Status",
      flex: 1,
      minWidth: 120,
      renderCell: (params) => (
        <span
          className={`font-semibold ${
            params.value === "Delivered" ? "text-green-500" : "text-red-500"
          }`}
        >
          {params.value}
        </span>
      ),
    },
    { field: "amount", headerName: "Amount", flex: 1, minWidth: 100 },
    { field: "date", headerName: "Date", flex: 1, minWidth: 120 },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      minWidth: 100,
      sortable: false,
      renderCell: (params) => (
        <Link to={`/account/order/${params.id}`}>
          <button className="bg-transparent hover:bg-gray-50 border flex items-center justify-center w-11 h-10 rounded-lg">
            <LaunchIcon className="text-blue-500 cursor-pointer" />
          </button>
        </Link>
      ),
    },
  ];

  const rows = orders.map((order) => ({
    id: order._id,
    status: order.orderStatus,
    amount: `$${order.totalPrice.toFixed(2)}`,
    date: new Date(order.createdAt).toLocaleDateString(),
  }));
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="bg-white  font-[sans-serif] px-4 max-w-6xl mx-auto">
          <h1 className="py-2 text-center text-2xl font-bold">
            All Orders
          </h1>
          <div className="w-full min-h-[45vh] pt-5 rounded flex justify-center">
            <div className="w-[97%] flex justify-center"> 
            <DataGrid
              rows={rows}
              columns={columns}
              pageSize={5} 
              disableSelectionOnClick
              className="bg-white"
              autoHeight
            />
            </div>
            
          </div>
          <div className="text-center text-blue-300 mt-4">
            {user.name}'s Orders
          </div>
        </div>
      )}
    </>
  );
};

export default MyOrders;

import { useSelector, useDispatch } from "react-redux";
import { useAlert } from "react-alert";
import { useEffect } from "react";
import { deleteOrder, getAllOrders, clearErrors } from "../../../actions/orderAction";
import { DELETE_ORDER_RESET } from "../../../constants/orderConstants";
import { DataGrid } from "@material-ui/data-grid";
import LaunchIcon from "@material-ui/icons/Launch";
import { Link } from "react-router-dom";

const AdminOrders = () => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const { error, orders = [] } = useSelector((state) => state.allOrders);
  const { error: deleteError, isDeleted } = useSelector((state) => state.order);

  const deleteOrderHandler = (id) => {
    dispatch(deleteOrder(id));
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (deleteError) {
      alert.error(deleteError);
      dispatch(clearErrors());
    }

    if (isDeleted) {
      alert.success("Order Deleted Successfully");
      dispatch({ type: DELETE_ORDER_RESET });
    }

    dispatch(getAllOrders());
  }, [dispatch, alert, error, deleteError, isDeleted]);

  const columns = [
    { field: "id", headerName: "Order ID", flex: 1, minWidth: 200 },
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
    { 
      field: "amount", 
      headerName: "Amount", 
      flex: 1, 
      minWidth: 100,
      renderCell: (params) => (
        <span>
          ${params.value}
        </span>
      ),
    },
    { field: "date", headerName: "Date", flex: 1, minWidth: 120 },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      minWidth: 100,
      sortable: false,
      renderCell: (params) => (
        <div className="flex gap-2">
          <button
            onClick={() => deleteOrderHandler(params.id)}
            type="button"
            className="bg-transparent border flex items-center hover:bg-gray-50 justify-center w-11 h-10 rounded-lg"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 fill-red-500 inline"
              viewBox="0 0 24 24"
            >
              <path
                d="M19 7a1 1 0 0 0-1 1v11.191A1.92 1.92 0 0 1 15.99 21H8.01A1.92 1.92 0 0 1 6 19.191V8a1 1 0 0 0-2 0v11.191A3.918 3.918 0 0 0 8.01 23h7.98A3.918 3.918 0 0 0 20 19.191V8a1 1 0 0 0-1-1Zm1-3h-4V2a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v2H4a1 1 0 0 0 0 2h16a1 1 0 0 0 0-2ZM10 4V3h4v1Z"
                data-original="#000000"
              ></path>
              <path
                d="M11 17v-7a1 1 0 0 0-2 0v7a1 1 0 0 0 2 0Zm4 0v-7a1 1 0 0 0-2 0v7a1 1 0 0 0 2 0Z"
                data-original="#000000"
              ></path>
            </svg>
          </button>
          <Link to={`/admin/order/${params.id}`}>
            <button className="bg-transparent hover:bg-gray-50 border flex items-center justify-center w-11 h-10 rounded-lg">
              <LaunchIcon className="text-blue-500 cursor-pointer" />
            </button>
          </Link>
        </div>
      ),
    },
  ];

  const rows = orders.map((order) => ({
    id: order._id,
    status: order.orderStatus,
    amount: order.totalPrice.toFixed(2),  // Ensure the amount is formatted to 2 decimal places
    date: new Date(order.createdAt).toLocaleDateString(),
  }));

  return (
    <div className="bg-white  px-4 max-w-6xl mx-auto">
      <h1 className="py-2 text-center text-2xl font-semibold">
        All Orders
      </h1>
      <div className="w-full min-h-[45vh] pt-5 rounded flex justify-center">
        <div className="w-[97%] flex justify-center">
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={5}
            disableSelectionOnClick
            autoHeight
            className="bg-white"
          />
        </div>
      </div>
    </div>
  );
};

export default AdminOrders;

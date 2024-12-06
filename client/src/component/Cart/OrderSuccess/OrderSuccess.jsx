import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import { Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { clearCart } from "../../../actions/cartAction";

const OrderSuccess = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(clearCart())
  }, [dispatch]);
  return (
    <div className="flex flex-col font-[sans-serif]  items-center justify-center min-h-screen bg-gray-100 px-4">
      <CheckCircleIcon className="text-green-500" style={{ fontSize: "4rem" }} />

      <Typography className="text-3xl md:text-3xl font-bold  mt-4">
        Your Order has been Placed Successfully
      </Typography>

      <Link
        to="/account/orders"
        className="mt-6 text-white bg-blue-500 hover:bg-blue-600 font-medium py-2 px-4 rounded transition duration-200"
      >
        View Orders
      </Link>
    </div>
  );
};

export default OrderSuccess;

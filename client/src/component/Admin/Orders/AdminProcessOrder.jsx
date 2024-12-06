import  { Fragment, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getOrderDetails, clearErrors, updateOrder } from "../../../actions/orderAction";
import Loader from "../../Layout/Loader/Loader";
import { useAlert } from "react-alert";
import { UPDATE_ORDER_RESET } from "../../../constants/orderConstants";

const AdminProcessOrder = () => {
  const { order, error, loading } = useSelector((state) => state.orderDetails);
  const { error: updateError, isUpdated } = useSelector((state) => state.order);
  const navigate=useNavigate()
  const [status, setStatus] = useState("");

  const dispatch = useDispatch();
  const alert = useAlert();
  const { id } = useParams();

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (updateError) {
      alert.error(updateError);
      dispatch(clearErrors());
    }
    if (isUpdated) {
      alert.success("Order Updated Successfully");
      dispatch({ type: UPDATE_ORDER_RESET });
      navigate("/admin/orders");
    }

    dispatch(getOrderDetails(id));
  }, [dispatch, alert, error, id, isUpdated, updateError, navigate]);

  const updateOrderSubmitHandler = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.set("status", status);

    dispatch(updateOrder(id, formData));
  };

  return (
    <Fragment>
      <div className="min-h-screen pt-4 px-4">
        <div className="max-w-5xl mx-auto bg-white p-6 md:p-8 border border-gray-200 rounded-lg">
          {loading ? (
            <Loader />
          ) : (
            <Fragment>
              <h1 className="py-2 text-center text-2xl font-semibold underline mb-8">Process Order</h1>

              <div className="mb-8">
                <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-4">Shipping Info</h2>
                <div className="border border-gray-200 p-4 rounded-lg space-y-2">
                  <div className="flex justify-between">
                    <p className="font-medium text-gray-600">Name:</p>
                    <span className="text-gray-800">{order.user && order.user.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <p className="font-medium text-gray-600">Phone:</p>
                    <span className="text-gray-800">{order.shippingInfo && order.shippingInfo.phoneNo}</span>
                  </div>
                  <div className="flex justify-between">
                    <p className="font-medium text-gray-600">Address:</p>
                    <span className="text-gray-800">
                      {order.shippingInfo &&
                        `${order.shippingInfo.address}, ${order.shippingInfo.city}, ${order.shippingInfo.state}, ${order.shippingInfo.pinCode}, ${order.shippingInfo.country}`}
                    </span>
                  </div>
                </div>
              </div>

              <div className="mb-8">
                <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-4">Payment</h2>
                <div className="border border-gray-200 p-4 rounded-lg space-y-2">
                  <div>
                    <p
                      className={`font-medium ${
                        order.paymentInfo && order.paymentInfo.status === "succeeded"
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {order.paymentInfo && order.paymentInfo.status === "succeeded" ? "PAID" : "NOT PAID"}
                    </p>
                  </div>
                  <div>
                    Amount:{" "}
                    <span className="text-red-500">${order.totalPrice && order.totalPrice}</span>
                  </div>
                </div>
              </div>

              <div className="mb-8">
                <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-4">Order Status</h2>
                <div className="border border-gray-200 p-4 rounded-lg">
                  <p
                    className={`font-medium ${
                      order.orderStatus && order.orderStatus === "Delivered"
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {order.orderStatus && order.orderStatus}
                  </p>
                </div>
              </div>

              <div className="mb-8">
                <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-4">Order Items</h2>
                <div className="space-y-4">
                  {order.orderItems &&
                    order.orderItems.map((item) => (
                      <div key={item.product} className="flex items-center space-x-4 border border-gray-200 p-4 rounded-lg">
                        <img src={item.image} alt="Product" className="w-16 h-16 object-cover rounded" />
                        <Link
                          to={`/product/${item.product}`}
                          className="text-blue-500 hover:text-blue-600 text-sm md:text-base"
                        >
                          {item.name}
                        </Link>
                        <span className="ml-auto text-gray-800 text-sm md:text-base">
                          {item.quantity} X ${item.price} = <b>${item.price * item.quantity}</b>
                        </span>
                      </div>
                    ))}
                </div>
              </div>

              <form className="space-y-6" onSubmit={updateOrderSubmitHandler}>
                <div className="flex flex-col space-y-4">
                  <label htmlFor="status" className="text-sm font-medium text-gray-600">
                    Order Status
                  </label>
                  <select
                    id="status"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="p-2 border border-gray-200 rounded"
                  >
                    <option value="">Choose Status</option>
                    {order.orderStatus === "Processing" && <option value="Shipped">Shipped</option>}
                    {order.orderStatus === "Shipped" && <option value="Delivered">Delivered</option>}
                  </select>
                </div>

                <button
                  type="submit"
                  disabled={loading || status === ""}
                  className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 disabled:bg-blue-300"
                >
                  Process
                </button>
              </form>
            </Fragment>
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default AdminProcessOrder;

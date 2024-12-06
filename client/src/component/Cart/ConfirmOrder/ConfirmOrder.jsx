import { Fragment } from "react";
import CheckoutSteps from "../CheckoutSteps/CheckoutSteps";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Typography } from "@material-ui/core";

const ConfirmOrder = () => {
  const navigate = useNavigate();
  const { shippingInfo, cartItems } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0
  );

  const shippingCharges = subtotal > 1000 ? 0 : 200;
  const tax = subtotal * 0.18;
  const totalPrice = subtotal + tax + shippingCharges;
  const address = `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.state}, ${shippingInfo.pinCode}, ${shippingInfo.country}`;

  const proceedToPayment = () => {
    const data = {
      subtotal,
      shippingCharges,
      tax,
      totalPrice,
    };

    sessionStorage.setItem("orderInfo", JSON.stringify(data));
    navigate("/process-payment");
  };

  return (
    <Fragment>
      <CheckoutSteps activeStep={1} />

      <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10 px-4 md:px-0">
        <div className="w-full max-w-5xl bg-white p-6 md:p-8 shadow-lg rounded-lg">
          <div className="mb-8">
            <Typography className="text-3xl font-bold text-gray-800 mb-4">
              Shipping Info
            </Typography>
            <div className="border border-gray-200 p-4  rounded-lg">
              <div className="mb-2">
                Name:{" "}
                <span className="text-sm  text-gray-600">
                  {user.name}
                </span>
              </div>
              <div className="mb-2">
                Phone:{" "}
                <span className="text-sm md:text-base text-gray-600">
                  {shippingInfo.phoneNo}
                </span>
              </div>
              <div>
                Address:{" "}
                <span className="text-sm md:text-base text-gray-600">
                  {address}
                </span>
              </div>
            </div>
          </div>

          <div className="mb-8">
            <Typography className="text-xl md:text-2xl font-bold  mb-4">
              Your Cart Items:
            </Typography>
            <div className="space-y-4">
              {cartItems &&
                cartItems.map((item) => (
                  <div
                    key={item.product}
                    className="flex items-center space-x-4 border border-gray-200 p-4 rounded-lg"
                  >
                    <img
                      src={item.image}
                      alt="Product"
                      className="w-16 h-16 object-cover rounded"
                    />
                    <Link
                      to={`/product/${item.product}`}
                      className="text-blue-500 hover:text-blue-600 text-sm md:text-base"
                    >
                      {item.name}
                    </Link>
                    <span className="ml-auto text-gray-800 text-sm md:text-base">
                      {item.quantity} X ${item.price} ={" "}
                      <b>${item.price * item.quantity}</b>
                    </span>
                  </div>
                ))}
            </div>
          </div>

          <div>
            <Typography className="text-xl md:text-2xl font-semibold text-gray-800 mb-4">
              Order Summary
            </Typography>
            <div className="border border-gray-200 p-4 rounded-lg">
              <div className="flex justify-between mb-2">
                <p className="font-medium text-sm md:text-base text-gray-600">
                  Subtotal:
                </p>
                <span className="text-sm md:text-base text-gray-800">
                  ${subtotal}
                </span>
              </div>
              <div className="flex justify-between mb-2">
                <p className="font-medium text-sm md:text-base text-gray-600">
                  Shipping Charges:
                </p>
                <span className="text-sm md:text-base text-gray-800">
                  ${shippingCharges}
                </span>
              </div>
              <div className="flex justify-between mb-2">
                <p className="font-medium text-sm md:text-base text-gray-600">
                  Tax:
                </p>
                <span className="text-sm md:text-base text-gray-800">
                  ${tax}
                </span>
              </div>
              <div className="flex justify-between font-semibold text-base md:text-lg mt-4 border-t border-gray-200 pt-4">
                <p>Total:</p>
                <span>${totalPrice}</span>
              </div>
            </div>

            <button
              onClick={proceedToPayment}
              className="w-full mt-6 py-2 text-white bg-blue-500 rounded hover:bg-blue-600 transition duration-200"
            >
              Proceed To Payment
            </button>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default ConfirmOrder;

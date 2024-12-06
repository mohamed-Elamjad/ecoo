import { Fragment } from "react";
import RemoveShoppingCartIcon from "@material-ui/icons/RemoveShoppingCart";
import { useDispatch, useSelector } from "react-redux";
import {
  addItemsToCart,
  removeItemsFromCart,
} from "../../../actions/cartAction.js";
import { Link, useNavigate } from "react-router-dom";
import { Typography } from "@material-ui/core";
import { useAlert } from "react-alert";
const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const alert = useAlert();
  const { cartItems } = useSelector((state) => state.cart);
  const increaseQuantity = (id, quantity, stock) => {
    if (stock > quantity) {
      dispatch(addItemsToCart(id, quantity + 1));
    }
  };
  const decreaseQuantity = (id, quantity) => {
    if (quantity > 1) {
      dispatch(addItemsToCart(id, quantity - 1));
    }
  };
  const deleteCartItems = (id) => {
    alert.success("Product Deleted Successfully");
    dispatch(removeItemsFromCart(id));
  };
  const checkoutHandler = () => {
    navigate("/shipping");
  };
  return (
    <Fragment>
      {cartItems.length === 0 ? (
        <div className="flex flex-col font-[sans-serif] items-center justify-center h-[50vh] p-6 text-center bg-white">
          <RemoveShoppingCartIcon className=" text-blue-500 text-7xl mb-4]" />
          <Typography className="text-2xl font-semibold mb-4">
            Your Cart is Empty
          </Typography>
          <Link
            to="/products"
            className="text-blue-500 hover:underline text-lg"
          >
            Browse Products
          </Link>
        </div>
      ) : (
        <div className=" bg-white py-10 px-4 max-w-6xl mx-auto ">
          <h2 className="text-3xl font-bold text-center">Your Cart</h2>{" "}
          <div className="overflow-x-auto">
            <table className="mt-12 w-full border-collapse divide-y">
              <thead className="whitespace-nowrap text-left">
                <tr>
                  <th className="font-medium p-2">Product</th>
                  <th className="font-medium p-2">Quantity</th>
                  <th className="font-medium p-2">Remove</th>
                  <th className="font-medium p-2">Price</th>
                </tr>
              </thead>
              <tbody className="whitespace-nowrap divide-y">
                {cartItems.map((item) => (
                  <tr key={item.product}>
                    <td className="px-2 py-4">
                      <div className="flex items-center gap-4 w-max">
                        <div className="w-20 h-20 border-2 border-gray-300">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-20 h-20 object-cover"
                          />
                        </div>
                        <div>
                          <p className="font-semibold text-gray-700">
                            {" "}
                            <Link
                              to={`/product/${item.product}`}
                              className=" hover:underline "
                            >
                              {item.name}
                            </Link>
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="px-2 py-4">
                      <div className="flex overflow-hidden border w-max rounded-lg">
                        <button
                          onClick={() =>
                            decreaseQuantity(item.product, item.quantity)
                          }
                          type="button"
                          className="bg-gray-300 text-white flex items-center justify-center w-11 h-10 font-semibold"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-3 fill-current"
                            viewBox="0 0 124 124"
                          >
                            <path
                              d="M112 50H12C5.4 50 0 55.4 0 62s5.4 12 12 12h100c6.6 0 12-5.4 12-12s-5.4-12-12-12z"
                              data-original="#000000"
                            ></path>
                          </svg>
                        </button>
                        <span className="bg-transparent bg-gray-100 flex items-center justify-center w-11 h-10 font-semibold">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            increaseQuantity(
                              item.product,
                              item.quantity,
                              item.stock
                            )
                          }
                          type="button"
                          className="bg-gray-600 text-white flex items-center justify-center w-11 h-10 font-semibold"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-3 fill-current"
                            viewBox="0 0 42 42"
                          >
                            <path
                              d="M37.059 16H26V4.941C26 2.224 23.718 0 21 0s-5 2.224-5 4.941V16H4.941C2.224 16 0 18.282 0 21s2.224 5 4.941 5H16v11.059C16 39.776 18.282 42 21 42s5-2.224 5-4.941V26h11.059C39.776 26 42 23.718 42 21s-2.224-5-4.941-5z"
                              data-original="#000000"
                            ></path>
                          </svg>
                        </button>
                      </div>
                    </td>

                    <td className="px-2 py-4">
                      <button
                        onClick={() => deleteCartItems(item.product)}
                        type="button"
                        className="bg-transparent border flex items-center justify-center w-11 h-10 rounded-lg"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-4 fill-red-500 inline"
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
                    </td>

                    <td className="px-2 py-4">
                      <h4 className="font-semibold text-gray-700">
                        ${item.price}
                      </h4>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="max-w-xl ml-auto">
            <ul className="text-blue-500 divide-y">
              <li className="flex flex-wrap gap-3 text-[20px] py-3 font-semibold">
                Total{" "}
                <span className="ml-auto">{`$${cartItems.reduce(
                  (acc, item) => acc + item.quantity * item.price,
                  0
                )}`}</span>
              </li>
            </ul>
            <button
              onClick={checkoutHandler}
              type="button"
              className="mt-6 text-base tracking-wide px-5 py-2.5 w-full bg-blue-500 hover:bg-blue-600 text-white rounded"
            >
              {" "}
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default Cart;

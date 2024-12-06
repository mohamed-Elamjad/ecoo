import { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import Footer from "./component/Layout/Footer/Footer";
import Header from "./component/Layout/Header/Header";
import Home from "./component/Home/Home";
import ProductDetails from "./component/Product/ProductDetails";
import Products from "./component/Product/Products";
import Search from "./component/Product/Search";
import Register from "./component/User/Register";
import Login from "./component/User/Login";
import ProfileLayout from "./component/User/Profile/ProfileLayout";
import Profile from "./component/User/Profile/Profile";
import ProfileEdit from "./component/User/Profile/ProfileEdit";
import UpdatePassword from "./component/User/Profile/UpdatePassword";
import Contact from "./component/Contact/Contact";
import About from "./component/About/About";
import ProtectedRoute from "./component/Route/ProtectedRoute";
import MyOrders from "./component/Order/MyOrders";
import AdminLayout from "./component/Admin/AdminLayout";
import AdminProducts from "./component/Admin/Products/AdminProducts";
import PageNotFound from "./component/PageNotFound/PageNotFound";
import Cart from "./component/Cart/Cart/Cart";
import AdminNewProduct from "./component/Admin/Products/AdminNewProduct";
import AdminUpdateProduct from "./component/Admin/Products/AdminUpdateProduct";
import AdminReviews from "./component/Admin/Reviews/AdminReviews";
import AdminUsers from "./component/Admin/Users/AdminUsers";
import AdminUserUpdate from "./component/Admin/Users/AdminUserUpdate";
import Shipping from "./component/Cart/Shipping/Shipping";
import ConfirmOrder from "./component/Cart/ConfirmOrder/ConfirmOrder";
import OrderSuccess from "./component/Cart/OrderSuccess/OrderSuccess";
import Payment from "./component/Cart/Payment/Payment";
import Ecommerce from "./component/Admin/Ecommerce/Ecommerce";
import MyOrderDetails from "./component/Order/MyOrderDetails";
import AdminOrders from "./component/Admin/Orders/AdminOrders";
import AdminProcessOrder from "./component/Admin/Orders/AdminProcessOrder";
import AdminContacts from "./component/Admin/Contacts/AdminContacts";

const App = () => {
  const [stripeApiKey, setStripeApiKey] = useState("");

  // Fetch the Stripe API key from your server
  async function getStripeApiKey() {
    const { data } = await axios.get("/api/v1/stripeapikey");
    setStripeApiKey(data.stripeApiKey);
  }

  useEffect(() => {
    getStripeApiKey();
  }, []);

  return (
    <Router>
      <Header />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/about" element={<About />} />
        <Route exact path="/contact" element={<Contact />} />
        <Route exact path="/product/:id" element={<ProductDetails />} />
        <Route exact path="/products" element={<Products />} />
        <Route path="/products/:keyword" element={<Products />} />
        <Route exact path="/search" element={<Search />} />
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/cart" element={<Cart />} />

        <Route element={<ProtectedRoute isAdmin={false} />}>
          <Route exact path="/account" element={<ProfileLayout />}>
            <Route index element={<Profile />} />
            <Route path="edit" element={<ProfileEdit />} />
            <Route path="passwordUpdate" element={<UpdatePassword />} />
            <Route path="orders" element={<MyOrders />} />
            <Route path="order/:id" element={<MyOrderDetails />} />
          </Route>
          <Route path="/shipping" element={<Shipping />} />
          <Route path="/order-confirm" element={<ConfirmOrder />} />
          <Route path="/success" element={<OrderSuccess />} />

          {/* Stripe Payment Route wrapped with Elements provider */}
          {stripeApiKey && (
            <Route
              path="/process-payment"
              element={
                <Elements stripe={loadStripe(stripeApiKey)}>
                  <Payment />
                </Elements>
              }
            />
          )}
        </Route>

        <Route element={<ProtectedRoute isAdmin={true} />}>
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Ecommerce />} />
            <Route path="users" element={<AdminUsers />} />
            <Route path="users/update-user/:id" element={<AdminUserUpdate />} />
            <Route path="products" element={<AdminProducts />} />
            <Route path="products/new-product" element={<AdminNewProduct />} />
            <Route
              path="products/update-product/:id"
              element={<AdminUpdateProduct />}
            />
            <Route path="orders" element={<AdminOrders />} />
            <Route path="order/:id" element={<AdminProcessOrder />} />

            <Route path="reviews" element={<AdminReviews />} />
            <Route path="messages" element={<AdminContacts />} />

          </Route>
        </Route>

        {/* Catch-all route for 404 errors */}
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;

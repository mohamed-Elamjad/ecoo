import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login, clearErrors } from "../../actions/userAction";
import { useAlert } from "react-alert";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../Layout/Loader/Loader";

const Login = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();
  const { error, loading, isAuthenticated } = useSelector(
    (state) => state.user
  );

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const loginSubmit = (e) => {
    e.preventDefault();

    if (!loginEmail || !loginPassword) {
      alert.error("Please fill all the fields");
      return;
    }

    dispatch(login(loginEmail, loginPassword));
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (isAuthenticated) {
      navigate("/");
    }
  }, [dispatch, error, alert, navigate, isAuthenticated]);

  return (
    <div className="flex justify-center items-center py-16 font-[sans-serif]">
      {loading ? (
        <Loader />
      ) : (
        <div className="w-full max-w-md bg-white shadow-md rounded-lg p-8 border border-gray-200">
          <h2 className="text-2xl font-bold mb-6 text-center text-blue-500">
            Login
          </h2>
          <form className="space-y-4" onSubmit={loginSubmit}>
            <input
              type="email"
              placeholder="Email"
              value={loginEmail}
              onChange={(e) => setLoginEmail(e.target.value)}
              className="w-full text-gray-700 rounded-md py-2.5 px-4 border  outline-blue-500"
            />
            <input
              type="password"
              placeholder="Password"
              value={loginPassword}
              onChange={(e) => setLoginPassword(e.target.value)}
              className="w-full text-gray-700 rounded-md py-2.5 px-4 border outline-blue-500"
            />
            <div className="flex  items-center">
              <button
                type="submit"
                className="text-white w-full bg-blue-500 hover:bg-blue-600 rounded-md text-sm px-4 py-3"
              >
                Login
              </button>
            </div>
          </form>
          <p className="mt-4 text-center text-blue-500 cursor-pointer">
            Don't have an account?{" "}
            <Link to={"/register"} className="text-blue-600 hover:underline">
              Register here.
            </Link>
          </p>
        </div>
      )}
    </div>
  );
};

export default Login;

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, register } from "../../actions/userAction";
import { FaUserCircle } from "react-icons/fa";
import { MdImage } from "react-icons/md";
import { useAlert } from "react-alert";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../Layout/Loader/Loader";

const Register = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();
  const { error, loading, isAuthenticated } = useSelector(
    (state) => state.user
  );

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [avatar, setAvatar] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(null);

  const { name, email, password } = user;

  const registerSubmit = (e) => {
    e.preventDefault();

    if (!name || !email || !password) {
      alert.error("Please fill all the fields");
      return;
    }

    if (!avatar) {
      alert.error("Please select an avatar");
      return;
    }

    const myForm = new FormData();
    myForm.set("name", name);
    myForm.set("email", email);
    myForm.set("password", password);
    myForm.append("avatar", avatar);
    dispatch(register(myForm));
  };

  const registerDataChange = (e) => {
    if (e.target.name === "avatar") {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setAvatarPreview(reader.result);
          setAvatar(reader.result);
        }
      };

      reader.readAsDataURL(e.target.files[0]);
    } else {
      setUser({ ...user, [e.target.name]: e.target.value });
    }
  };

  useEffect(() => {
    if (error) {
      if (error === "Internal Server Error") {
        alert.error("Something went wrong! Please try again later.");
      } else {
        alert.error(error);
      }
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
            Register
          </h2>
          <form className="space-y-4" onSubmit={registerSubmit}>
            <input
              type="text"
              placeholder="Name"
              name="name"
              value={name}
              onChange={registerDataChange}
              className="w-full text-gray-700 rounded-md py-2.5 px-4 border outline-blue-500"
            />
            <input
              type="email"
              placeholder="Email"
              name="email"
              value={email}
              onChange={registerDataChange}
              className="w-full text-gray-700 rounded-md py-2.5 px-4 border outline-blue-500"
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              value={password}
              onChange={registerDataChange}
              className="w-full text-gray-700 rounded-md py-2.5 px-4 border outline-blue-500"
            />

            <div className="flex flex-col items-center border border-gray-300 rounded-md p-2 mb-4">
              <div className="w-24 h-24 mb-2 flex items-center justify-center border border-gray-300 rounded-full overflow-hidden">
                {avatarPreview ? (
                  <img
                    src={avatarPreview}
                    alt="Avatar Preview"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <FaUserCircle size={96} className="text-gray-400" />
                )}
              </div>
              <label className="flex items-center cursor-pointer text-blue-500">
                <MdImage size={24} />
                <input
                  type="file"
                  name="avatar"
                  accept="image/*"
                  onChange={registerDataChange}
                  className="hidden"
                />
                <span className="ml-2">Choose Avatar</span>
              </label>
            </div>

            <div className="flex  items-center">
              <button
                type="submit"
                className="text-white w-full bg-blue-500 hover:bg-blue-600 rounded-md text-sm px-4 py-3"
              >
                Register
              </button>
            </div>
          </form>
          <p className="mt-4 text-center text-blue-500 cursor-pointer">
            Already have an account?{" "}
            <Link to={"/login"} className="text-blue-600 hover:underline">
              Login here.
            </Link>
          </p>
        </div>
      )}
    </div>
  );
};

export default Register;

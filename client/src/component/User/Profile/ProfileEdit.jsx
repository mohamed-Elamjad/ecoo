import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updateProfile, loadUser } from "../../../actions/userAction";
import { clearErrors } from "../../../actions/productAction";
import { UPDATE_PROFILE_RESET } from "../../../constants/userConstants";
import { useAlert } from "react-alert";
import Loader from "../../Layout/Loader/Loader";

const ProfileEdit = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const alert = useAlert();

  const { error, isUpdated, loading } = useSelector((state) => state.profile);
  const { user } = useSelector((state) => state.user);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const onSubmitProfile = (e) => {
    e.preventDefault();
    const myForm = new FormData();
    myForm.set("name", name);
    myForm.set("email", email);

    dispatch(updateProfile(myForm));
  };

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
    }

    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      alert.success("Profile Updated Successfully");
      navigate("/account");
      dispatch(loadUser());
      dispatch({ type: UPDATE_PROFILE_RESET });
    }
  }, [dispatch, error, alert, navigate, isUpdated, user]);

  return (
    <div className="mt-12 mb-10">
      {loading ? (
        <Loader/>
      ) : (
        <div
          className="grid sm:grid-cols-2 items-start gap-14 p-8 mx-auto max-w-4xl
            border rounded-md shadow-md hover:shadow-lg transition-shadow duration-300 font-[sans-serif] bg-white"
        >
          <div>
            <h1 className="text-3xl font-bold">Edit Profile</h1>
            <p className="text-sm text-gray-500 mt-4">
              Update your profile information below:
            </p>

            <div className="mt-8">
              <h2 className="text-gray-700 font-bold">User Details</h2>
              <ul className="mt-4">
                <li className="flex items-center">
                  <div className="bg-gray-200 h-10 w-10 rounded-full flex items-center justify-center shrink-0">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-blue-500"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <span className="ml-4">{user.name}</span>
                </li>
              </ul>
            </div>
          </div>

          <form
            encType="multipart/form-data"
            onSubmit={onSubmitProfile}
            className="flex flex-col w-full space-y-6"
          >
            <div className="flex flex-col space-y-2">
              <label htmlFor="name" className="font-bold text-gray-700">
                Name
              </label>
              <input
                type="text"
                id="name"
                placeholder="Enter your name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex flex-col space-y-2">
              <label htmlFor="email" className="font-bold text-gray-700">
                Email
              </label>
              <input
                type="email"
                id="email"
                placeholder="Enter your email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <button
              type="submit"
              className="self-end mt-4 rounded-lg bg-blue-500 hover:bg-blue-600 px-8 py-2 text-white transition-colors duration-300"
            >
              Save Changes
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default ProfileEdit;
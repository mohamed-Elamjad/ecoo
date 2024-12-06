import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Loader from "../../Layout/Loader/Loader";
import { updatePassword } from "../../../actions/userAction";
import { clearErrors } from "../../../actions/productAction";
import { UPDATE_PASSWORD_RESET } from "../../../constants/userConstants";
import { useAlert } from "react-alert";

const UpdatePassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const alert = useAlert();

  const { error, isUpdated, loading } = useSelector((state) => state.profile);
  const { user } = useSelector((state) => state.user);

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const updatePasswordSubmit = (e) => {
    e.preventDefault();
    const myForm = new FormData();
    myForm.set("oldPassword", oldPassword);
    myForm.set("newPassword", newPassword);
    myForm.set("confirmPassword", confirmPassword);

    dispatch(updatePassword(myForm));
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      alert.success("Password Updated Successfully");
      navigate("/account");
      dispatch({ type: UPDATE_PASSWORD_RESET });
    }
  }, [dispatch, error, alert, navigate, isUpdated]);

  return (
    <div className="mt-12 mb-10">
      {loading ? (
        <Loader />
      ) : (
        <div
          className="grid sm:grid-cols-2 items-start gap-14 p-8 mx-auto max-w-4xl
            border rounded-md shadow-md hover:shadow-lg transition-shadow duration-300 font-[sans-serif] bg-white"
        >
          <div>
            <h1 className="text-3xl font-bold">Update Password</h1>
            <p className="text-sm text-gray-500 mt-4">
              Ensure your account is using a strong, unique password:
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
            onSubmit={updatePasswordSubmit}
            className="flex flex-col w-full space-y-6"
          >
            <div className="flex flex-col space-y-2">
              <label htmlFor="oldPassword" className="font-bold text-gray-700">
                Old Password
              </label>
              <input
                type="password"
                id="oldPassword"
                placeholder="Enter old password"
                required
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex flex-col space-y-2">
              <label htmlFor="newPassword" className="font-bold text-gray-700">
                New Password
              </label>
              <input
                type="password"
                id="newPassword"
                placeholder="Enter new password"
                required
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex flex-col space-y-2">
              <label htmlFor="confirmPassword" className="font-bold text-gray-700">
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                placeholder="Confirm your password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
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

export default UpdatePassword;

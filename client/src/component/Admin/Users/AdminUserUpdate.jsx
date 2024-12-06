import { useEffect, useState } from "react";
import {
  clearErrors,
  getUserDetails,
  updateUser,
} from "../../../actions/userAction";
import { UPDATE_USER_RESET } from "../../../constants/userConstants";
import {  useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import Loader from "../../Layout/Loader/Loader";

const AdminUserUpdate = () => {
  const dispatch = useDispatch();
  const {id} = useParams();
  const navigate=useNavigate()

  const alert = useAlert();
  const { loading, error, user } = useSelector((state) => state.userDetails);
  console.log(user)

  const {
    loading: updateLoading,
    error: updateError,
    isUpdated,
  } = useSelector((state) => state.profile);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");


  useEffect(() => {
    if (user && user._id !== id) {
      dispatch(getUserDetails(id));
    } else {
      setName(user.name);
      setEmail(user.email);
      setRole(user.role);
    }
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (updateError) {
      alert.error(updateError);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      alert.success("User Updated Successfully");
      dispatch({ type: UPDATE_USER_RESET });
      navigate("/admin/users")
    }
  }, [dispatch, alert, error, navigate,isUpdated, updateError, user, id]);

  const updateUserSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("email", email);
    myForm.set("role", role);

    dispatch(updateUser(id, myForm));
  };

  return (
    <>
    {
      loading ?(
        <Loader/>
      ):(
        <div>
        <div className="pt-4 px-4">
          <h1 className="py-2 text-2xl font-semibold">Update Product</h1>
        </div>
        <hr className="mt-4 mb-8" />
        
        <div className="rounded-md border bg-white">
          <form
            onSubmit={updateUserSubmitHandler}
            className="flex flex-col space-y-3 px-4 py-6 sm:px-10"
          >
            <div className="flex items-center border border-gray-300 rounded-md p-2">
              <input
                type="text"
                placeholder="Name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-2 border-none outline-none"
              />
            </div>
            <div className="flex items-center border border-gray-300 rounded-md p-2">
              <input
                type="email"
                placeholder="Email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2 border-none outline-none"
              />
            </div>
            
            <div className="flex items-center border border-gray-300 rounded-md p-2">
              <select
                className="w-full p-2 border-none outline-none"
                value={role}
                onChange={(e) => setRole(e.target.value)}
              >
                <option value="">Choose Role</option>
                <option value="admin">Admin</option>
                <option value="user">User</option>
              </select>
            </div>
            <button
              type="submit"
              disabled={
                updateLoading ? true : false || role === "" ? true : false
              }
              className="mt-4 ml-auto rounded-lg bg-blue-500 hover:bg-blue-600 px-10 py-2 text-white"
            >
              update
            </button>
          </form>
        </div>
      </div>
      )
    }
    </>
  );
};

export default AdminUserUpdate;

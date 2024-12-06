import AdminUsersList from "./AdminUsersList";
import { FiSearch } from "react-icons/fi";
import {
  clearErrors,
  deleteUser,
  getAllUsers,
} from "../../../actions/userAction";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { useEffect, useState } from "react";
import { DELETE_USER_RESET } from "../../../constants/userConstants";
import Pagination from "react-js-pagination";
import "./Pagination.css";

const AdminUsers = () => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const { error, users, usersCount, resultPerPage, filteredUsersCount } =
    useSelector((state) => state.allUsers);
  const {
    error: deleteError,
    isDeleted,
    message,
  } = useSelector((state) => state.profile);

  const [currentPage, setCurrentPage] = useState(1);
  const [keyword, setKeyword] = useState("");
  const [role, setRole] = useState("user");

  const searchSubmitHandler = (e) => {
    e.preventDefault();
    setCurrentPage(1); // Reset to first page when searching
  };

  const setCurrentPageNo = (e) => {
    setCurrentPage(e);
  };

  let count = filteredUsersCount;

  const deleteUserHandler = (id) => {
    dispatch(deleteUser(id));
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (deleteError) {
      alert.error(deleteError);
      dispatch(clearErrors());
    }
    if (isDeleted) {
      alert.success(message);
      dispatch({ type: DELETE_USER_RESET });
    }
    dispatch(getAllUsers(keyword, currentPage, role));
  }, [
    dispatch,
    keyword,
    currentPage,
    role,
    alert,
    error,
    deleteError,
    isDeleted,
    message,
  ]);

  return (
    <div className="bg-white font-[sans-serif]  px-4 max-w-6xl mx-auto">
      <h1 className="py-2 text-center text-2xl font-bold">
        All Users
      </h1>
      <div className="flex justify-between gap-4 mt-10 max-lg:flex-col">
        <form onSubmit={searchSubmitHandler} className="relative max-w-lg  h-[41px]">
          <input
            type="text"
            className="block w-full py-2.5 pl-10 pr-16 leading-5 rounded-md border border-gray-300 bg-gray-100 text-black placeholder-gray-500 focus:outline-none focus:bg-white"
            placeholder="Search a User ..."
            onChange={(e) => setKeyword(e.target.value)}
          />
          <button
            type="submit"
            className="absolute py-2 inset-y-0 right-0 flex  items-center px-4 bg-blue-500 text-white rounded-r border-transparent hover:bg-blue-600 focus:outline-none"
          >
            <FiSearch className="text-white" />
          </button>
        </form>
        <div className="relative max-w-lg">
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="block w-full py-2.5 pl-3 pr-10 leading-5 rounded-md border border-gray-300 bg-white text-black focus:outline-none focus:ring focus:border-blue-500"
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="mt-4 w-full border-collapse divide-y">
          <thead className="whitespace-nowrap bg-gray-100 text-left">
            <tr>
              <th className="text-base font-medium p-2">Name</th>
              <th className="text-base font-medium p-2">Email</th>
              <th className="text-base font-medium p-2">Role</th>
              <th className="text-base font-medium p-2">Actions</th>
            </tr>
          </thead>
          <tbody className="whitespace-nowrap divide-y">
            {users.length === 0 ? (
              <tr>
                <td
                  colSpan="4"
                  className="text-center py-10 text-gray-500"
                >
                  No Users Found
                </td>
              </tr>
            ) : (
              users.map((user) => (
                <AdminUsersList
                  key={user._id}
                  item={user}
                  deleteUserHandler={deleteUserHandler}
                />
              ))
            )}
          </tbody>
        </table>
        <hr />
        {resultPerPage < count && (
          <div className="paginationBox mt-4">
            <Pagination
              activePage={currentPage}
              itemsCountPerPage={resultPerPage}
              totalItemsCount={usersCount}
              onChange={setCurrentPageNo}
              nextPageText="Next"
              prevPageText="Prev"
              firstPageText="1st"
              lastPageText="Last"
              itemClass="page-item"
              linkClass="page-link"
              activeClass="pageItemActive"
              activeLinkClass="pageLinkActive"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminUsers;

import { Link } from "react-router-dom";
import EditIcon from "@material-ui/icons/Edit";
const AdminUsersList = ({ item, deleteUserHandler }) => {
  return (
    <tr>
      <td className="px-2 py-2">
        <div className="flex items-center gap-4 w-max">
          <div className="h-24 shrink-0">
            <img
              src={item.avatar.url}
              alt={item.name}
              className="w-20 h-20 object-contain rounded-lg"
            />
          </div>
          <div>
            <p className="text-base font-bold text-gray-800">{item.name}</p>
          </div>
        </div>
      </td>

      <td className="px-2 py-2">
        <span className="text-base font-semibold text-gray-700">
          {item.email}
        </span>
      </td>

      <td className="px-2 py-2">
        <span className="text-base font-semibold text-gray-700">
          {item.role}
        </span>
      </td>

      <td className="px-2 py-2">
        <div className="flex gap-2">
          <button
            onClick={() => deleteUserHandler(item._id)}
            type="button"
            className="bg-transparent border flex items-center hover:bg-gray-50 justify-center w-11 h-10 rounded-lg"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 fill-red-500 inline"
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
          <Link to={`/admin/users/update-user/${item._id}`}>
            <button
              type="button"
              className="bg-transparent hover:bg-gray-50 border flex items-center justify-center w-11 h-10 rounded-lg"
            >
              <EditIcon className="text-blue-500" />
            </button>
          </Link>
        </div>
      </td>
    </tr>
  );
};
export default AdminUsersList;

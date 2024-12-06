const AdminReviewsList = ({ item, deleteReviewHandler }) => {
  return (
    <tr>
      <td className="px-2 py-2">
        <span className="text-base font-semibold text-gray-700">
          {item.name}
        </span>
      </td>

      <td className="px-2 py-2">
        <span className="text-base font-semibold text-gray-700">
          {item.comment}
        </span>
      </td>

      <td className="px-2 py-2">
        <span className="text-base font-semibold text-gray-700">
          {item.rating}
        </span>
      </td>

      <td className="px-2 py-2">
        <div className="flex gap-2">
          <button
            onClick={() => deleteReviewHandler(item._id)}
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
        </div>
      </td>
    </tr>
  );
};
export default AdminReviewsList;

import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";

const AdminLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleSelectChange = (e) => {
    navigate(e.target.value);
  };

  return (
    <div className="flex flex-col font-[sans-serif] lg:flex-row py-10 px-4 sm:px-6  lg:px-8 mx-4 max-w-screen-xl sm:mx-8 xl:mx-auto">
      {/* Sidebar */}
      <div className="flex-none w-full lg:w-56 lg:sticky lg:top-16 lg:h-screen lg:border-r lg:border-gray-200 lg:pr-4">
        <div className="lg:hidden mb-4">
          <select
            className="w-full cursor-pointer outline-none rounded-lg border p-2 text-sm text-gray-700 border-blue-500"
            value={location.pathname}
            onChange={handleSelectChange}
          >
            <option value="/admin">Ecommerce</option>
            <option value="/admin/users">Users</option>
            <option value="/admin/products">Products</option>
            <option value="/admin/orders">Orders</option>
            <option value="/admin/reviews">Reviews</option>
            <option value="/admin/messages">Messages</option>
          </select>
        </div>
        <div className="hidden lg:block">
          <ul className="space-y-4">
            
            <li
              className={`cursor-pointer px-4 py-2 font-semibold transition hover:text-blue-600 ${
                location.pathname === "/admin"
                  ? "border-l-4 border-blue-500 text-blue-500"
                  : ""
              }`}
            >
              <NavLink to="/admin">Ecommerce</NavLink>
            </li>
            <li
              className={`cursor-pointer px-4 py-2 font-semibold transition hover:text-blue-600 ${
                location.pathname === "/admin/users"
                  ? "border-l-4 border-blue-500 text-blue-500"
                  : ""
              }`}
            >
              <NavLink to="/admin/users">Users</NavLink>
            </li>
            <li
              className={`cursor-pointer px-4 py-2 font-semibold transition hover:text-blue-600 ${
                location.pathname === "/admin/products"
                  ? "border-l-4 border-blue-500 text-blue-500"
                  : ""
              }`}
            >
              <NavLink to="/admin/products">Products</NavLink>
            </li>
            <li
              className={`cursor-pointer px-4 py-2 font-semibold transition hover:text-blue-600 ${
                location.pathname === "/admin/orders"
                  ? "border-l-4 border-blue-500 text-blue-500"
                  : ""
              }`}
            >
              <NavLink to="/admin/orders">Orders</NavLink>
            </li>
            <li
              className={`cursor-pointer px-4 py-2 font-semibold transition hover:text-blue-600 ${
                location.pathname === "/admin/reviews"
                  ? "border-l-4 border-blue-500 text-blue-500"
                  : ""
              }`}
            >
              <NavLink to="/admin/reviews">Reviews</NavLink>
            </li>



            <li
              className={`cursor-pointer px-4 py-2 font-semibold transition hover:text-blue-600 ${
                location.pathname === "/admin/messages"
                  ? "border-l-4 border-blue-500 text-blue-500"
                  : ""
              }`}
            >
              <NavLink to="/admin/messages">Messages</NavLink>
            </li>



          </ul>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1   rounded-lg overflow-hidden lg:ml-4 pb-10">
        <div className="py-6 px-4 sm:px-6 lg:px-8">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;

import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Loader from "../../Layout/Loader/Loader";

const Profile = () => {
  const { user, loading } = useSelector((state) => state.user);
  if (loading) {
    return <Loader />;
  }
  if (!user) {
    return <div>User not found</div>;
  }

  return (
    <div className="pt-4 px-4 font-[sans-serif]">
      <h1 className="py-2 text-2xl font-semibold">Your Profile</h1>
      <p className="text-slate-600">
        Welcome to your profile! Here, you can view and manage your personal
        information.
      </p>

      <hr className="mt-4 mb-8" />

      <div className="space-y-1">
        {/* Profile Card */}
        <div className="max-w-sm">
          <div className="rounded-lg border bg-white px-4 pt-8 pb-6 shadow-lg">
            <div className="relative mx-auto w-24 h-24 rounded-full overflow-hidden border-4 border-gray-300 bg-gray-50">
              <span className="absolute right-0 m-3 h-3 w-3 rounded-full bg-green-500 ring-2 ring-green-300 ring-offset-2"></span>
              <img
                className="w-full h-full object-cover"
                src={user.avatar.url}
                alt={user.name}
              />
            </div>

            <h1 className="my-1 text-center text-xl font-bold leading-8 text-gray-900">
              {user.name}
            </h1>

            <ul className="mt-3 divide-y rounded bg-gray-50 py-2 px-3 text-gray-600 shadow-sm hover:text-gray-700 hover:shadow">
              <li className="flex items-center py-3 text-sm">
                <span>Name</span>
                <span className="ml-auto">{user.name}</span>
              </li>
              <li className="flex items-center py-3 text-sm">
                <span>Email</span>
                <span className="ml-auto">{user.email}</span>
              </li>
              <li className="flex items-center py-3 text-sm">
                <span>Joined On</span>
                <span className="ml-auto">
                  {String(user.createdAt).substr(0, 10)}
                </span>
              </li>
              <li className="flex items-center py-3 text-sm">
                <span>Role</span>
                <span className="ml-auto">{user.role}</span>
              </li>
              <li className="py-3">
                <Link to="/account/edit">
                  <button className="mt-4 w-full ml-auto rounded-lg bg-blue-500 hover:bg-blue-600 px-10 py-2 text-white">
                    Update Profile
                  </button>
                </Link>
              </li>
              <li className="py-3">
                <Link to="/account/passwordUpdate">
                  <button className="mt-4 w-full ml-auto rounded-lg bg-blue-500 hover:bg-blue-600 px-10 py-2 text-white">
                    Update Password
                  </button>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;

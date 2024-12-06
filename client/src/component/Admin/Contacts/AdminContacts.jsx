import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteContact, getAllContacts } from "../../../actions/contactAction";
import { clearErrors } from "../../../actions/userAction";
import { useAlert } from "react-alert";

const AdminContacts = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const { contacts, loading, error } = useSelector((state) => state.contact);
  const { isDeleted, error: deleteError } = useSelector(
    (state) => state.contact
  );

  useEffect(() => {
    dispatch(getAllContacts());

    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (deleteError) {
      alert.error(deleteError);
      dispatch(clearErrors());
    }

    if (isDeleted) {
      dispatch(getAllContacts());
    }
  }, [dispatch, error, alert, deleteError, isDeleted]);

  const handleDeleteContact = (id) => {
    dispatch(deleteContact(id));
    alert.success("Message deleted successfully");
  };

  return (
    <div className="bg-white font-[sans-serif] px-4 max-w-6xl mx-auto">
      <h1 className="py-2 text-center text-2xl font-bold">Messages</h1>

      {/* Display Contacts */}
      {loading ? (
        <p className="text-center py-10 text-gray-500">Loading...</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="mt-4 w-full border-collapse divide-y">
            <thead className="whitespace-nowrap bg-gray-100 text-left">
              <tr>
                <th className="text-base font-medium p-2">Name</th>
                <th className="text-base font-medium p-2">Email</th>
                <th className="text-base font-medium p-2">Message</th>
                <th className="text-base font-medium p-2">Actions</th>
              </tr>
            </thead>
            <tbody className="whitespace-nowrap divide-y">
              {contacts && contacts.length > 0 ? (
                contacts.map((contact) => (
                  <tr key={contact._id}>
                    <td className="p-2">{contact.name}</td>
                    <td className="p-2">{contact.email}</td>
                    <td className="p-2">{contact.message}</td>
                    <td className="p-2">
                      <button
                        onClick={() => handleDeleteContact(contact._id)}
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
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center py-10 text-gray-500">
                    No contacts found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminContacts;

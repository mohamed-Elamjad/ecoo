import { FiSearch } from "react-icons/fi";
import {
  clearErrors,
  deleteReviews,
  getAllReviews,
} from "../../../actions/productAction";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import AdminReviewsList from "./AdminReviewsList";
import { DELETE_REVIEW_RESET } from "../../../constants/productConstants";

const AdminReviews = () => {
  const dispatch = useDispatch();

  const alert = useAlert();

  const { error: deleteError, isDeleted } = useSelector(
    (state) => state.review
  );

  const { error, reviews, loading } = useSelector(
    (state) => state.productReviews
  );
  console.log(reviews);

  const [productId, setProductId] = useState("");

  const deleteReviewHandler = (reviewId) => {
    dispatch(deleteReviews(reviewId, productId));
  };
  const productReviewsSubmitHandler = (e) => {
    e.preventDefault();
    dispatch(getAllReviews(productId));
  };

  useEffect(() => {
    if (productId.length === 24) {
      dispatch(getAllReviews(productId));
    }
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (deleteError) {
      alert.error(deleteError);
      dispatch(clearErrors());
    }

    if (isDeleted) {
      alert.success("Review Deleted Successfully");
      dispatch({ type: DELETE_REVIEW_RESET });
    }
  }, [dispatch, alert, error, deleteError, isDeleted, productId]);

  return (
    <div className=" bg-white  px-4 max-w-6xl mx-auto ">
      <h1 className="py-2 text-center text-2xl font-semibold">
        All Reviews
      </h1>
      <div className="flex justify-center gap-2  mt-10 max-lg:flex-col  ">
        <form
          onSubmit={productReviewsSubmitHandler}
          className="relative h-[41px]"
        >
          <input
            type="text"
            className="block w-full py-2.5 pl-10 pr-16 leading-5 rounded-md border border-gray-300 bg-gray-100 text-black placeholder-gray-500 focus:outline-none focus:bg-white"
            placeholder="Id product ..."
            value={productId}
            required
            onChange={(e) => setProductId(e.target.value)}
          />
          <button
            type="submit"
            disabled={loading ? true : false || productId === "" ? true : false}
            className="absolute py-2 inset-y-0 right-0 flex items-center px-4 bg-blue-500 text-white rounded-r  border-transparent hover:bg-blue-600 focus:outline-none"
          >
            <FiSearch className="text-white" />
          </button>
        </form>
      </div>
      <div className="overflow-x-auto">
        <table className="mt-4 w-full border-collapse divide-y">
          <thead className="whitespace-nowrap bg-gray-100 text-left">
            <tr>
              <th className="text-base  font-medium p-2">Name</th>
              <th className="text-base  font-medium p-2">Comment</th>
              <th className="text-base  font-medium p-2">Rating</th>
              <th className="text-base  font-medium p-2">Actions</th>
            </tr>
          </thead>

          <tbody className="whitespace-nowrap  divide-y">
            {reviews.length === 0 ? (
              <tr className="flex justify-center items-center">
                <td className="text-center py-10 ">Review Not Found</td>
              </tr>
            ) : (
              reviews.map((rev) => (
                <AdminReviewsList
                  key={rev._id}
                  item={rev}
                  deleteReviewHandler={deleteReviewHandler}
                />
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default AdminReviews;

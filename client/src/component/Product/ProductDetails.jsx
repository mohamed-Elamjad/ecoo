import { useEffect, useState, Fragment } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useNavigate, useParams } from "react-router-dom";
import RatingStars from "react-rating-stars-component";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { addItemsToCart } from "../../actions/cartAction";
import {
  clearErrors,
  getAllReviews,
  getProductDetails,
  newReview,
} from "../../actions/productAction";
import { BsFillCartPlusFill } from "react-icons/bs";
import Loader from "../Layout/Loader/Loader";
import ReviewCard from "./ReviewCard";
import { Rating } from "@material-ui/lab";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
} from "@material-ui/core";
import { NEW_REVIEW_RESET } from "../../constants/productConstants";

const ProductDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const  navigate=useNavigate()
  const alert = useAlert();

  const { product, loading, error } = useSelector(
    (state) => state.productDetails
  );


  const { isAuthenticated } = useSelector(
    (state) => state.user
  );

  const [quantity, setQuantity] = useState(1);
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const { success, error: reviewError } = useSelector(
    (state) => state.newReview
  );

  const ratingOptions = {
    count: 5,
    value: product.ratings,
    edit: false,
    size: 24,
    activeColor: "#ffd700",
    isHalf: true,
    readOnly: true,
    precision: 0.5,
  };

  const increaseQuantity = () => {
    if (product.Stock <= quantity) return;
    setQuantity(quantity + 1);
  };

  const decreaseQuantity = () => {
    if (quantity <= 1) return;
    setQuantity(quantity - 1);
  };

  const submitReviewToggle = () => {
    setOpen(!open);
  };
  const reviewSubmitHandler = () => {
    if (!isAuthenticated) {
      alert.error("Please login to add rating and comment.");
      navigate("/login")
      return;
    }
    if (!rating || !comment) {
      alert.error("Please provide both rating and comment.");
      return;
    }
    const myForm = new FormData();
    myForm.set("rating", rating);
    myForm.set("comment", comment);
    myForm.set("productId", id);

    dispatch(newReview(myForm));

    setOpen(false);
  };
  const addToCartHandler = () => {
    dispatch(addItemsToCart(id, quantity));
    alert.success("Item Added To Cart");
  };
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (reviewError) {
      alert.error(reviewError);
      dispatch(clearErrors());
    }

    if (success) {
      alert.success("Review Submitted Successfully");
      dispatch({ type: NEW_REVIEW_RESET });
    }
    dispatch(getProductDetails(id));
    dispatch(getAllReviews(id));     // Fetch reviews for the product
  }, [dispatch, id, error, alert, reviewError, success]);
  return (
    <div className=" px-4 font-[sans-serif]">
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16">
            <div className="flex flex-col md:flex-row items-center">
              <div className="w-full  md:w-1/2 mb-8 md:mb-0">
                <img
                  src={product.images && product.images[0].url}
                  alt={product.name}
                  className="rounded-md h-[480px] bg-contain  shadow-md w-full"
                />
              </div>

              <div className="w-full md:w-1/2 pl-0 md:pl-12">
                <h1 className="text-3xl font-bold text-gray-800 mb-4">
                  {product.name}
                </h1>
                <p className="mb-2">
                  <span className="text-gray-800  font-semibold">Price: </span>{" "}
                  <span className="text-gray-600  text-sm">{`$${product.price}`}</span>
                </p>
                <div className="mb-4 flex items-center">
                  <RatingStars {...ratingOptions} />
                  <span className="ml-4 text-gray-600 text-base">
                    ({product.numOfReviews} Reviews)
                  </span>
                </div>
                <div className="flex items-center mb-6">
                  <button
                    onClick={decreaseQuantity}
                    type="button"
                    className="bg-gray-300 w-12 h-10 font-semibold rounded-l"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-3 fill-current inline"
                      viewBox="0 0 124 124"
                    >
                      <path d="M112 50H12C5.4 50 0 55.4 0 62s5.4 12 12 12h100c6.6 0 12-5.4 12-12s-5.4-12-12-12z"></path>
                    </svg>
                  </button>
                  <button
                    type="button"
                    className="bg-gray-100 w-12 h-10 text-gray-800"
                  >
                    {quantity}
                  </button>
                  <button
                    onClick={increaseQuantity}
                    type="button"
                    className="bg-gray-600 text-white w-12 h-10 font-semibold rounded-r"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-3 fill-current inline"
                      viewBox="0 0 42 42"
                    >
                      <path d="M37.059 16H26V4.941C26 2.224 23.718 0 21 0s-5 2.224-5 4.941V16H4.941C2.224 16 0 18.282 0 21s2.224 5 4.941 5H16v11.059C16 39.776 18.282 42 21 42s5-2.224 5-4.941V26h11.059C39.776 26 42 23.718 42 21s-2.224-5-4.941-5z"></path>
                    </svg>
                  </button>
                  <button
                    onClick={addToCartHandler}
                    className="ml-4 px-4 py-2 bg-blue-500  hover:bg-blue-600 text-white rounded"
                    disabled={product.Stock < 1}
                  >
                    <BsFillCartPlusFill size={24} />
                  </button>
                </div>
                <p>
                  Status:{" "}
                  <b
                    className={
                      product.Stock < 1 ? "text-red-500" : "text-green-600"
                    }
                  >
                    {product.Stock < 1 ? "OutOfStock" : "InStock"}
                  </b>
                </p>
                <div className="text-gray-600 mt-4">
                  <p className="text-xl font-semibold text-gray-800">
                    Description:
                  </p>
                  {product.description}
                </div>
                <button
                  onClick={submitReviewToggle}
                  className="mt-4 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded"
                >
                  Submit Review
                </button>
              </div>
            </div>

            <div className="mt-10">
              <h3 className="text-xl  mb-6 font-bold text-center text-blue-500">
                Reviews
              </h3>
              {product.reviews && product.reviews[0] ? (
                <div className="grid mb-6  grid-cols-1 md:grid-cols-2 gap-6">
                  {product.reviews.map((review) => (
                    <ReviewCard key={review._id} review={review} />
                  ))}
                </div>
              ) : (
                <p className="my-10 text-gray-700 text-center">
                  No Reviews Yet
                </p>
              )}
            </div>
            <Dialog
              aria-labelledby="simple-dialog-title"
              open={open}
              onClose={submitReviewToggle}
            >
              <DialogTitle>Submit Review</DialogTitle>
              <DialogContent className="flex flex-col gap-4">
                <Rating
                  onChange={(e) => setRating(e.target.value)}
                  value={rating}
                  size="large"
                />
                <textarea
                  className="border border-gray-300 rounded p-2 w-full outline-blue-500"
                  cols="30"
                  rows="5"
                  placeholder="Write your review here..."
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                ></textarea>
              </DialogContent>
              <DialogActions>
                <Button onClick={submitReviewToggle} color="secondary">
                  Cancel
                </Button>
                <Button onClick={reviewSubmitHandler} color="primary">
                  Submit
                </Button>
              </DialogActions>
            </Dialog>
          </div>
        </Fragment>
      )}
    </div>
  );
};

export default ProductDetails;

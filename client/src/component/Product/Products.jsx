import { useEffect, useState } from "react";
import Loader from "../Layout/Loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { clearErrors, getProduct } from "../../actions/productAction";
import ProductCard from "../Home/ProductCard";
import { useParams } from "react-router-dom";
import Pagination from "react-js-pagination";
import Slider from "@material-ui/core/Slider";
import "./Pagination.css";

const categories = [
  "Books",
  "Electronics",
  "Fashion",
  "Games",
  "Sports"
];

const Products = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const [currentPage, setCurrentPage] = useState(1);
  const [price, setPrice] = useState([0, 2000]);
  const [category, setCategory] = useState("");
  const [ratings, setRatings] = useState(0);

  const { keyword } = useParams();

  const {
    products,
    loading,
    error,
    productsCount,
    resultPerPage,
    filteredProductsCount,
  } = useSelector((state) => state.products);

  const setCurrentPageNo = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const priceHandler = (event, newPrice) => {
    setPrice(newPrice);
  };

  let count = filteredProductsCount;

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    dispatch(getProduct(keyword, currentPage, price, category, ratings));
  }, [dispatch, keyword, currentPage, price, category, ratings, alert, error]);

  return (
    <div className="px-4 py-8 font-[sans-serif]">
      <h2 className="text-3xl font-bold text-center">
        Products
      </h2>
      <div className="mx-auto px-4 py-4">
        {/* Sidebar */}
        <div className="w-full  flex justify-center items-center m-2  bg-white p-6 gap-20 border border-gray-200 rounded shadow-md">

          <div className="w-[200px]">
            <label className="block text-gray-600 text-sm font-medium mb-2">
              Categories
            </label>
            <select
              name="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <div className="w-[200px]">
            <label className="block text-gray-600 text-sm font-medium mb-2">
              Price
            </label>
            <div className="flex flex-col space-y-4">
              <Slider
                value={price}
                onChange={priceHandler}
                valueLabelDisplay="auto"
                aria-labelledby="range-slider"
                min={0}
                max={2000}
              />
            </div>
          </div>

          <div className="w-[200px]">
            <label className="block text-gray-600 text-sm font-medium mb-2">
              Ratings Above
            </label>
            <div className="flex flex-col space-y-4">
              <Slider
                value={ratings}
                onChange={(e, newRating) => {
                  setRatings(newRating);
                }}
                aria-labelledby="continuous-slider"
                valueLabelDisplay="auto"
                min={0}
                max={5}
              />
            </div>
          </div>
        </div>

        {/* Products */}
        <div className="flex-1 mt-7 m-2">
          {loading ? (
            <Loader />
          ) : (
            <>
              {products && products.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                  {products.map((product) => (
                    <ProductCard key={product._id} product={product} />
                  ))}
                </div>
              ) : (
                <div className="flex py-20 justify-center items-center h-full">
                  <h3 className="text-2xl font-semibold text-gray-700">
                    Product not found
                  </h3>
                </div>
              )}

              {resultPerPage < count && (
                <div className="mt-8 flex justify-center">
                  <Pagination
                    activePage={currentPage}
                    itemsCountPerPage={resultPerPage}
                    totalItemsCount={productsCount}
                    onChange={setCurrentPageNo}
                    nextPageText="Next"
                    prevPageText="Prev"
                    firstPageText="First"
                    lastPageText="Last"
                    itemClass="page-item"
                    linkClass="page-link"
                    activeClass="bg-blue-500 text-white"
                    activeLinkClass="page-link"
                  />
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Products;

import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useAlert } from "react-alert";
import { useEffect } from "react";
import { FiSearch } from "react-icons/fi";
import { DELETE_PRODUCT_RESET } from "../../../constants/productConstants";
import {
  clearErrors,
  deleteProduct,
  getAdminProduct,
} from "../../../actions/productAction";
import AdminProductsList from "./AdminProductsList";
import Pagination from "react-js-pagination";
import "./Pagination.css";

const AdminProducts = () => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const {
    error,
    products,
    productsCount,
    resultPerPage,
    filteredProductsCount,
  } = useSelector((state) => state.adminProducts);

  
  const { error: deleteError, isDeleted } = useSelector(
    (state) => state.product
  );
  const [currentPage, setCurrentPage] = useState(1);

  const [keyword, setKeyword] = useState("");
  
  const searchSubmitHandler = (e) => {
    e.preventDefault();
  };
  const setCurrentPageNo = (e) => {
    setCurrentPage(e);
  };
  let count = filteredProductsCount;

  const deleteProductHandler = (id) => {
    dispatch(deleteProduct(id));
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
      alert.success("Product Deleted Successfully");
      dispatch({ type: DELETE_PRODUCT_RESET });
    }
    dispatch(getAdminProduct(keyword,currentPage));
  }, [dispatch,keyword,currentPage, alert, error, deleteError, isDeleted]);
  return (
    <div className=" bg-white  font-[sans-serif] px-4 max-w-6xl mx-auto ">
      <h1 className="py-2 text-center text-2xl font-bold">
        All Products
      </h1>
      <div className="flex justify-between gap-2  mt-10 max-lg:flex-col  ">
        <form onSubmit={searchSubmitHandler} className="relative">
          <input
            type="text"
            className="block w-full py-2.5 pl-10 pr-16 leading-5 rounded-md border border-gray-300 bg-gray-100 text-black placeholder-gray-500 focus:outline-none focus:bg-white"
            placeholder="Search a Product ..."
            onChange={(e) => setKeyword(e.target.value)}
          />
          <button
            type="submit"
            className="absolute py-2 inset-y-0 right-0 flex items-center px-4 bg-blue-500 text-white rounded-r  border-transparent hover:bg-blue-600 focus:outline-none"
          >
            <FiSearch className="text-white" />
          </button>
        </form>

        <Link
          to="/admin/products/new-product"
          className="px-5 py-2 text-center bg-blue-500 hover:bg-blue-700 text-white rounded  "
        >
          New Product
        </Link>
      </div>
      <div className="overflow-x-auto">
        <table className="mt-4 w-full border-collapse divide-y">
          <thead className="whitespace-nowrap bg-gray-100 text-left">
            <tr>
              <th className="text-base  font-medium p-2">Name</th>
              <th className="text-base  font-medium p-2">Stock</th>
              <th className="text-base  font-medium p-2">Price</th>
              <th className="text-base  font-medium p-2">Actions</th>
            </tr>
          </thead>

          <tbody className="whitespace-nowrap  divide-y">
            {products.length === 0 ? (
              <tr className="flex justify-center items-center">
                <td className="text-center py-10 ">Product Not Found</td>
              </tr>
            ) : (
              products.map((product) => (
                <AdminProductsList
                  key={product._id}
                  item={product}
                  deleteProduct={deleteProductHandler}
                />
              ))
            )}
          </tbody>
        </table>
        {resultPerPage < count && (
          <div className="paginationBox">
            <Pagination
              activePage={currentPage}
              itemsCountPerPage={resultPerPage}
              totalItemsCount={productsCount}
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

export default AdminProducts;

import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useAlert } from "react-alert";
import {
  clearErrors,
  getProductDetails,
  updateProduct,
} from "../../../actions/productAction";
import { UPDATE_PRODUCT_RESET } from "../../../constants/productConstants";
import { useNavigate, useParams } from "react-router-dom";

const AdminUpdateProduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const alert = useAlert();
  const { id } = useParams();
  const { error, product } = useSelector((state) => state.productDetails);
  const {
    loading,
    error: updateError,
    isUpdated,
  } = useSelector((state) => state.product);

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [Stock, setStock] = useState(0);
  const [images, setImages] = useState([]);
  const [oldImages, setOldImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);

  const categories = [
    "Books",
    "Electronics",
    "Fashion",
    "Games",
    "Sports" 
  ];

  useEffect(() => {
    if (product && product._id !== id) {
      dispatch(getProductDetails(id));
    } else if (product) {
      setName(product.name);
      setDescription(product.description);
      setPrice(product.price);
      setCategory(product.category);
      setStock(product.Stock);
      setOldImages(product.images); // Assuming `product.images` is an array of image URLs
    }

    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (updateError) {
      alert.error(updateError);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      alert.success("Product Updated Successfully");
      dispatch({ type: UPDATE_PRODUCT_RESET });
      navigate("/admin/products");
    }
  }, [dispatch, alert, error, navigate, isUpdated, id, product, updateError]);

  const updateProductSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("price", price);
    myForm.set("description", description);
    myForm.set("category", category);
    myForm.set("Stock", Stock);
    images.forEach((image) => {
      myForm.append("images", image);
    });

    dispatch(updateProduct(id, myForm));
  };

  const updateProductImagesChange = (e) => {
    const files = Array.from(e.target.files);

    setImages([]);
    setImagesPreview([]);
    setOldImages([]);

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagesPreview((old) => [...old, reader.result]);
          setImages((old) => [...old, reader.result]);
        }
      };

      reader.readAsDataURL(file);
    });
  };
  return (
    <>
      <div className="pt-4 px-4">
        <h1 className="py-2 text-2xl font-semibold">Update Product</h1>
      </div>
      <hr className="mt-4 mb-8" />

      <div className="rounded-md border bg-white">
        <form
          encType="multipart/form-data"
          onSubmit={updateProductSubmitHandler}
          className="flex flex-col space-y-3 px-4 py-6 sm:px-10"
        >
          <div className="flex items-center border border-gray-300 rounded-md p-2">
            <input
              type="text"
              placeholder="Product Name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 border-none outline-none"
            />
          </div>

          <div className="flex items-center border border-gray-300 rounded-md p-2">
            <input
              type="number"
              placeholder="Price"
              required
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full p-2 border-none outline-none"
            />
          </div>

          <div className="flex items-center border border-gray-300 rounded-md p-2">
            <textarea
              placeholder="Product Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows="3"
              className="w-full p-2 border-none outline-none"
            />
          </div>

          <div className="flex items-center border border-gray-300 rounded-md p-2">
            <input
              type="number"
              placeholder="Stock"
              required
              value={Stock}
              onChange={(e) => setStock(e.target.value)}
              className="w-full p-2 border-none outline-none"
            />
          </div>

          <div className="flex items-center border border-gray-300 rounded-md p-2">
            <select
              value={category}
              className="w-full p-2 border-none outline-none"
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">Choose Category</option>
              {categories.map((cate) => (
                <option key={cate} value={cate}>
                  {cate}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center border border-gray-300 rounded-md p-2">
            <input
              type="file"
              name="avatar"
              accept="image/*"
              onChange={updateProductImagesChange}
              className="w-full p-2 border-none outline-none"
            />
          </div>

          <div className="flex gap-2">
            <div className="flex flex-wrap gap-4 mt-4">
              {oldImages &&
                oldImages.map((image, index) => (
                  <img
                    key={index}
                    src={image.url}
                    alt="Old Product Preview"
                    className="h-20 w-20 rounded-md object-cover"
                  />
                ))}
            </div>

            <div className="flex flex-wrap gap-4 mt-4">
              {imagesPreview.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt="Product Preview"
                  className="h-20 w-20 rounded-md object-cover"
                />
              ))}
            </div>
          </div>

          <button
            disabled={loading ? true : false}
            type="submit"
            className="mt-4 ml-auto rounded-lg bg-blue-500 hover:bg-blue-600 px-10 py-2 text-white"
          >
            {loading ? "Update...":"Update"}
            </button>
        </form>
      </div>
    </>
  );
};

export default AdminUpdateProduct;

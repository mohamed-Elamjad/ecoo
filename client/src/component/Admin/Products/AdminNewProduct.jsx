import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useAlert } from "react-alert";
import { clearErrors, createProduct } from "../../../actions/productAction";
import { NEW_PRODUCT_RESET } from "../../../constants/productConstants";
import { useNavigate } from "react-router-dom";

const AdminNewProduct = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate=useNavigate()

  const { loading, error, success } = useSelector((state) => state.newProduct);
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [Stock, setStock] = useState(0);
  const [images, setImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);
  const categories = [
    "Books",
    "Electronics",
    "Fashion",
    "Games",
    "Sports"
  ];
  

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (success) {
      alert.success("Product Created Successfully");
      dispatch({ type: NEW_PRODUCT_RESET });
      navigate('/admin/products')
    }
  }, [dispatch, alert, navigate,error, success]);

  const createProductSubmitHandler = (e) => {
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
    dispatch(createProduct(myForm));
  };

  const createProductImagesChange = (e) => {
    const files = Array.from(e.target.files);

    setImages([]);
    setImagesPreview([]);

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
        <h1 className="py-2 text-2xl font-semibold">Add Product</h1>
      </div>
      <hr className="mt-4 mb-8" />

      <div className="rounded-md border bg-white">
        <form
          encType="multipart/form-data"
          onSubmit={createProductSubmitHandler}
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
              onChange={(e) => setPrice(e.target.value)}
              className="w-full p-2 border-none outline-none"
            />
          </div>

          <div className="flex items-center border border-gray-300 rounded-md p-2">
            <input
              placeholder="Product Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              cols="30"
              rows="1"
              className="w-full p-2 border-none outline-none"
              required
            />
          </div>

          <div className="flex items-center border border-gray-300 rounded-md p-2">
            <select
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
              type="number"
              placeholder="Stock"
              required
              onChange={(e) => setStock(e.target.value)}
              className="w-full p-2 border-none outline-none"
            />
          </div>

          <div className="flex items-center border border-gray-300 rounded-md p-2">
            <input
              type="file"
              name="avatar"
              accept="image/*"
              onChange={createProductImagesChange}
              className="w-full p-2 border-none outline-none"
              required
            />
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

          <button
            type="submit"
            disabled={loading ? true : false}
            className="mt-4 ml-auto rounded-lg bg-blue-500 hover:bg-blue-600 px-10 py-2 text-white"
          >
            {loading ? "Create...":"Create"}
          </button>
        </form>
      </div>
    </>
  );
};

export default AdminNewProduct;

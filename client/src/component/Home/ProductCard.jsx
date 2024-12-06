import { Link } from "react-router-dom";
import RatingStars from "react-rating-stars-component";

const ProductCard = ({ product }) => {
  // Rating stars options
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
  return (
    <div
      className="bg-white  font-[sans-serif] 
    
    border rounded-md p-4 shadow-md hover:shadow-lg transition-shadow duration-300"
    >
      <Link to={`/product/${product._id}`}>
        <div className="mb-4">
          <img
            src={product.images[0].url}
            alt={product.name}
            className="w-full h-48 object-cover rounded-md"
          />
        </div>
      </Link>
      <h3 className=" font-semibold text-xl mb-2">{product.name}</h3>
      <p className="text-sm text-gray-600 mb-2">{product.category}</p>
      <p className=" mb-2">
        <span className="text-gray-800 font-semibold">Price: </span>{" "}
        <span className="text-gray-600  text-sm">$ {product.price}</span>
      </p>
      <div className="mb-2 flex items-center">
        <RatingStars {...ratingOptions} />
        <span className="ml-2 text-gray-600">
          ({product.numOfReviews} Reviews)
        </span>
      </div>
      <Link
        to={`/product/${product._id}`}
        className="bg-blue-500 text-white px-4 py-2 rounded-md  hover:bg-blue-600 transition duration-300 block text-center"
      >
        View Details
      </Link>
    </div>
  );
};

export default ProductCard;

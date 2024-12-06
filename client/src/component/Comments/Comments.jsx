import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Comments = () => {
  const { products } = useSelector((state) => state.products);

  // Filter products that have at least one review
  const productsWithReviews = products.filter(
    (product) => product.reviews.length > 0
  );

  // Get the first 3 products with reviews
  const currentProducts = productsWithReviews.slice(0, 3);

  return (
    <div className="comments-section max-w-4xl py-4 px-4 mb-10 mx-auto p-6">
      <h2 className="text-2xl font-bold text-center mb-6">Testimonials</h2>
      {currentProducts.length === 0 ? (
        <p className="text-center text-gray-500">
          No products with reviews available
        </p>
      ) : (
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentProducts.map((product) => (
            <Link to={`/product/${product._id}`} key={product._id}>
              <li className="bg-white shadow-md rounded-lg p-4 border border-gray-200 transition-transform transform hover:scale-105">
                <h3 className="text-[17px] font-semibold text-gray-700 mb-2">
                  {product.name}
                </h3>
                <div className="testimonial border-t border-gray-200 pt-4">
                  <h4 className="text-blue-500 mb-1">
                    {product.reviews[0].name}
                  </h4>
                  <p className="text-sm text-yellow-500">
                    Rating: {product.reviews[0].rating} ⭐
                  </p>
                  <p className="text-gray-600 mt-1 w-full   overflow-hidden">
                    {product.reviews[0].comment}
                  </p>
                </div>
              </li>
            </Link>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Comments;

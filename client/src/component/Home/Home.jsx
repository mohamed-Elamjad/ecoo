import  { useEffect } from "react";
import ProductCard from "./ProductCard";
import { clearErrors, getProduct } from "../../actions/productAction";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../Layout/Loader/Loader";
import { useAlert } from "react-alert";
import { Link } from "react-router-dom";
import Images from "../images";
import { FaRocket, FaShieldAlt, FaStar, FaRegHeart } from 'react-icons/fa';
import Contact from "../Contact/Contact";
import Comments from "../Comments/Comments";


const features = [
  {
    title: 'Fast Performance',
    description: 'Our application runs at lightning speed, ensuring a seamless user experience.',
    icon: <FaRocket className="text-blue-500 text-2xl" />
  },
  {
    title: 'Secure Transactions',
    description: 'We prioritize your security with top-notch encryption and safety measures.',
    icon: <FaShieldAlt className="text-blue-500 text-2xl" />
  },
  {
    title: 'User-Friendly Interface',
    description: 'Enjoy a clean and intuitive interface that makes navigation a breeze.',
    icon: <FaStar className="text-blue-500 text-2xl" />
  },
  {
    title: 'Customer Support',
    description: 'Get 24/7 support from our dedicated team, ready to assist you anytime.',
    icon: <FaRegHeart className="text-blue-500 text-2xl" />
  },
  {
    title: 'Customizable Settings',
    description: 'Tailor the application to fit your preferences and needs effortlessly.',
    icon: <FaStar className="text-blue-500 text-2xl" />
  },
  {
    title: 'Regular Updates',
    description: 'Stay updated with the latest features and improvements automatically.',
    icon: <FaRocket className="text-blue-500 text-2xl" />
  },
];


const Home = () => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const { loading, error, products } = useSelector((state) => state.products);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    dispatch(getProduct());
  }, [dispatch, error,alert]);
  
  return (
    <div className="font-[sans-serif]">
      <div
      className="relative px-4 font-[sans-serif] w-full h-[500px] bg-cover bg-center rounded-md shadow-lg overflow-hidden"
      style={{ backgroundImage: `url(${Images.HeroI})` }}
    >
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-70"></div>
      <div className="relative flex flex-col justify-center items-center h-full text-white text-center px-4">
        <h1 className="text-5xl md:text-6xl font-bold mb-4 transition duration-300 transform hover:scale-105">
          Welcome to Our Store!
        </h1>
        <p className="text-lg md:text-xl mb-6 max-w-2xl">
          Discover the best products at unbeatable prices. Shop now and enjoy amazing discounts!
        </p>
        <Link to="/products">
          <button className="bg-blue-500 text-white px-8 py-3 rounded-full shadow transition duration-300 hover:bg-blue-600 hover:shadow-lg transform hover:scale-105">
            Shop Now
          </button>
        </Link>
      </div>
    </div>

    <div>
      {/* Content Section for Features */}
      <main className="px-4 pt-8">
        <h1 className="text-3xl font-bold text-center">Our Features</h1>
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Feature Items */}
          {features.map((feature, index) => (
            <div key={index} className="border rounded-md p-4 shadow-md hover:shadow-lg transition-shadow duration-300">
              <div className="flex  items-center mb-4">
                {feature.icon}
                <h2 className="font-semibold text-xl ml-2">{feature.title}</h2>
              </div>
              <p className="mt-2 text-gray-600">{feature.description}</p>
              <Link to="#" className="mt-4 text-sm inline-block text-blue-500 hover:underline">Learn More</Link>
            </div>
          ))}
        </div>
      </main>
    </div>
      {/* Featured Products Section */}
      {loading ? (
        <Loader />
      ) : (
        <div className="pt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center">
              Featured Products
            </h2>
            <div className="grid mt-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {products &&
                products.map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))}
            </div>
          </div>
        </div>
      )}



      <div className="mt-20 px-4">
        <Contact/>
        <Comments/>
      </div>
    </div>
  );
};

export default Home;

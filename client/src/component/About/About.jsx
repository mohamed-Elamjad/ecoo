import { FaRocket, FaShieldAlt, FaStar, FaRegHeart } from 'react-icons/fa';
import Images from '../images';


const About = () => {
  return (
    <div className="font-[sans-serif] mb-16">
      {/* Hero Section */}
      <div
        className="relative px-4 w-full h-[400px] bg-cover bg-center rounded-md shadow-lg overflow-hidden"
        style={{ backgroundImage: `url(${Images.About})` }} // Use your own hero image
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-70"></div>
        <div className="relative flex flex-col justify-center items-center h-full text-white text-center px-4">
          <h1 className="text-5xl md:text-6xl font-bold mb-4">About Us</h1>
          <p className="text-lg md:text-xl mb-6 max-w-2xl">
            We are dedicated to providing you with the best shopping experience.
          </p>
        </div>
      </div>

      {/* About Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold text-center mb-6">Who We Are</h2>
        <p className="text-lg text-gray-700 text-center max-w-2xl mx-auto mb-8">
          Founded in 2021, we are an eCommerce platform built on trust and excellence.
          Our mission is to offer a wide range of high-quality products at unbeatable
          prices, ensuring customer satisfaction and security.
        </p>

        <div className="flex justify-center mt-10">
          <img src={Images.Team} alt="Our Team" className="rounded-lg  h-14 w-14  max-w-full" />
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold text-center mb-6">Why Choose Us</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="flex flex-col  mt-6 items-center text-center">
            <FaRocket className="text-blue-500 text-3xl mb-4" />
            <h3 className="font-semibold text-xl">Fast Performance</h3>
            <p className="text-gray-600">Enjoy seamless shopping with our fast platform.</p>
          </div>
          <div className="flex flex-col mt-6 items-center text-center">
            <FaShieldAlt className="text-blue-500 text-3xl mb-4" />
            <h3 className="font-semibold text-xl">Secure Payments</h3>
            <p className="text-gray-600">We ensure the highest level of payment security.</p>
          </div>
          <div className="flex flex-col mt-6 items-center text-center">
            <FaStar className="text-blue-500 text-3xl mb-4" />
            <h3 className="font-semibold text-xl">Quality Products</h3>
            <p className="text-gray-600">Our products are carefully selected for quality.</p>
          </div>
          <div className="flex flex-col mt-6 items-center text-center">
            <FaRegHeart className="text-blue-500 text-3xl mb-4" />
            <h3 className="font-semibold text-xl">Customer Support</h3>
            <p className="text-gray-600">We are here 24/7 to assist you with any queries.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;

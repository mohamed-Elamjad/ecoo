import React from 'react';
import { FiFacebook, FiTwitter, FiInstagram, FiLinkedin, FiYoutube } from 'react-icons/fi';

const Footer = () => {
  return (
    <footer className="bg-gray-50 shadow-md font-[sans-serif]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-wrap justify-between items-start">
          <div className="w-full md:w-1/4 mb-6 md:mb-0">
            <h2 className="text-2xl font-bold text-blue-500 mb-4">Logo</h2>
            <p className="text-gray-600 mb-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            <div className="flex space-x-4">
              <a href="https://facebook.com" className="text-gray-600 hover:text-blue-500">
                <FiFacebook size={24} />
              </a>
              <a href="https://twitter.com" className="text-gray-600 hover:text-blue-500">
                <FiTwitter size={24} />
              </a>
              <a href="https://instagram.com" className="text-gray-600 hover:text-blue-500">
                <FiInstagram size={24} />
              </a>
              <a href="https://linkedin.com" className="text-gray-600 hover:text-blue-500">
                <FiLinkedin size={24} />
              </a>
              <a href="https://youtube.com" className="text-gray-600 hover:text-blue-500">
                <FiYoutube size={24} />
              </a>
            </div>
          </div>
          <div className="w-full md:w-1/4 mb-6 md:mb-0">
            <h3 className="text-xl font-bold text-black mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="/about" className="text-gray-600 hover:text-blue-500">About Us</a></li>
              <li><a href="/products" className="text-gray-600 hover:text-blue-500">Products</a></li>
              <li><a href="/contact" className="text-gray-600 hover:text-blue-500">Contact Us</a></li>
              <li><a href="/faq" className="text-gray-600 hover:text-blue-500">FAQ</a></li>
              <li><a href="/terms" className="text-gray-600 hover:text-blue-500">Terms & Conditions</a></li>
            </ul>
          </div>
          <div className="w-full md:w-1/4 mb-6 md:mb-0">
            <h3 className="text-xl font-bold text-black mb-4">Customer Service</h3>
            <ul className="space-y-2">
              <li><a href="/support" className="text-gray-600 hover:text-blue-500">Support Center</a></li>
              <li><a href="/shipping" className="text-gray-600 hover:text-blue-500">Shipping Information</a></li>
              <li><a href="/returns" className="text-gray-600 hover:text-blue-500">Returns & Exchanges</a></li>
              <li><a href="/track" className="text-gray-600 hover:text-blue-500">Track Your Order</a></li>
            </ul>
          </div>
          <div className="w-full md:w-1/4">
            <h3 className="text-xl font-bold text-black mb-4">Subscribe to our Newsletter</h3>
            <p className="text-gray-600 mb-4">Get the latest updates on new products and upcoming sales</p>
            <form className="flex flex-col space-y-2">
              <input type="email" className="px-4 py-2 border border-gray-300 outline-blue-500 rounded-md" placeholder="Enter your email" />
              <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">Subscribe</button>
            </form>
          </div>
        </div>
        <div className="border-t border-gray-200 mt-8 pt-8 text-center">
          <p className="text-gray-600">&copy; 2024 E-commerce. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

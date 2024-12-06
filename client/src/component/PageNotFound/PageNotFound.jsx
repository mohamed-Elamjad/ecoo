import { Link } from 'react-router-dom';

const PageNotFound = () => {
  return (
    <div className="flex flex-col font-[sans-serif] items-center justify-center h-screen bg-white p-4">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-red-500">404</h1>
        <p className="text-2xl mt-4">Page Not Found</p>
        <p className="mt-2 text-gray-600">The page you're looking for doesn't exist.</p>
        <div className="mt-6">
          <Link 
            to="/" 
            className="text-blue-500  hover:text-blue-600 text-lg font-medium"
          >
            Go to Home
          </Link>
        
        </div>
      </div>
    </div>
  );
};

export default PageNotFound;

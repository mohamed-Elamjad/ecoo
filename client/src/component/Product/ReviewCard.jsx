import RatingStars from "react-rating-stars-component";
import { FaRegCircleUser } from "react-icons/fa6";

const ReviewCard = ({ review }) => {
  const ratingOptions = {
    count: 5,
    value: review.rating,
    edit: false,
    size: 24,
    activeColor: "#ffd700",
    isHalf: true,
    readOnly: true,
    precision: 0.5,
  };

  return (
    <div className="bg-gray-100 p-4 rounded-lg mb-4 shadow-sm">
      <div className="flex items-center mb-2">
        <FaRegCircleUser size={24} className="text-gray-500 mr-2" />
        <p className="font-semibold text-gray-800">{review.name}</p>
      </div>
      <div className="flex items-center mb-2">
        <RatingStars {...ratingOptions} />
      </div>
      <p className="text-gray-700">{review.comment}</p>
    </div>
  );
};

export default ReviewCard;

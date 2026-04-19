import React, { useState } from 'react';
import { ChevronLeftIcon, StarIcon } from '@heroicons/react/24/solid';
import { StarIcon as StarOutlineIcon } from '@heroicons/react/24/outline';

interface CustomerFeedbackProps {
  onBack: () => void;
  stopNumber: number;
  onSubmit: (rating: number, comment: string) => void;
}

const CustomerFeedback: React.FC<CustomerFeedbackProps> = ({ onBack, stopNumber, onSubmit }) => {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (rating > 0) {
      onSubmit(rating, comment);
      setSubmitted(true);
      setTimeout(() => onBack(), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="bg-gradient-to-r from-green-700 via-green-600 to-emerald-700 px-5 pt-12 pb-6 rounded-b-3xl shadow-xl">
        <div className="flex items-center gap-4">
          <button onClick={onBack} className="text-white p-2 hover:bg-white/20 rounded-full transition-all">
            <ChevronLeftIcon className="h-6 w-6" />
          </button>
          <div>
            <h1 className="text-white text-xl font-bold">Customer Feedback</h1>
            <p className="text-green-200 text-sm mt-1">Stop #{stopNumber} - 45 Main Street</p>
          </div>
        </div>
      </div>

      <div className="px-5 py-8">
        {!submitted ? (
          <div className="bg-white rounded-2xl shadow-xl p-6">
            <div className="text-center mb-6">
              <h3 className="text-lg font-bold text-gray-800">How was your collection experience?</h3>
              <p className="text-gray-500 text-sm mt-1">Your feedback helps us improve</p>
            </div>

            {/* Rating Stars */}
            <div className="flex justify-center gap-2 mb-6">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  className="transform hover:scale-110 transition-all"
                >
                  {(hoverRating || rating) >= star ? (
                    <StarIcon className="h-10 w-10 text-yellow-400" />
                  ) : (
                    <StarOutlineIcon className="h-10 w-10 text-gray-300" />
                  )}
                </button>
              ))}
            </div>

            {/* Rating Labels */}
            <div className="flex justify-between text-xs text-gray-500 mb-6 px-2">
              <span>Poor</span>
              <span>Fair</span>
              <span>Good</span>
              <span>Very Good</span>
              <span>Excellent</span>
            </div>

            {/* Comment */}
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Leave a comment (optional)..."
              className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 mb-4"
              rows={4}
            />

            {/* Submit Button */}
            <button
              onClick={handleSubmit}
              disabled={rating === 0}
              className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white font-bold py-3 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed hover:from-green-700 hover:to-emerald-700 transition-all"
            >
              Submit Feedback
            </button>
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-xl p-8 text-center animate-fadeIn">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <StarIcon className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Thank You!</h3>
            <p className="text-gray-500">Your feedback has been recorded</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomerFeedback;
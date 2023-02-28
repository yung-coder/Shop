import React from "react";
import ReactStars from "react-rating-stars-component";

const ReviewCard = ({ review }) => {
  const options = {
    size: "22",
    readOnly: true,
    precision: 0.5,
  };
  return (
    <div>
      <div class="block max-w-sm rounded-lg bg-white p-6 shadow-lg w-96">
        <div className="flex justify-between items-center">
          <h5 class="mb-2 text-xl font-medium leading-tight text-black ">
            User
          </h5>
          <img
            src="https://icon-library.com/images/default-profile-icon/default-profile-icon-24.jpg"
            alt=""
            className="w-12 h-12 rounded-lg"
          />
        </div>
        <ReactStars {...options} />
        <p class="mb-4 text-base text-black">
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </p>
      </div>
    </div>
  );
};

export default ReviewCard;

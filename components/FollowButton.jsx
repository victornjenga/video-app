import React, { useEffect, useState } from "react";
import { MdFavorite } from "react-icons/md";

import useAuthStore from "../store/authStore";

const LikeButton = ({ follows, flex, handleLike, handleDislike }) => {
  const [alreadyFollowed, setAlreadyFollowed] = useState(false);
  const { userProfile } = useAuthStore();
  let filterFollows = follows?.filter((item) => item._ref === userProfile?._id);

  useEffect(() => {
    if (filterFollows?.length > 0) {
      setAlreadyFollowed(true);
    } else {
      setAlreadyFollowed(false);
    }
  }, [filterFollows, follows]);

  return (
    <div className={`${flex} gap-6`}>
      <div className="mt-4 flex flex-col justify-center items-center cursor-pointer">
        {alreadyFollowed ? (
          <div
            className="bg-primary rounded-full p-2 md:p-4 text-[#F51997] "
            onClick={handleDislike}
          >
            <MdFavorite className="text-lg md:text-2xl" />
          </div>
        ) : (
          <div
            className="bg-primary rounded-full p-2 md:p-4 "
            onClick={handleLike}
          >
            <MdFavorite className="text-lg md:text-2xl" />
          </div>
        )}
        <p className="text-md font-semibold ">{follows?.length || 0}</p>
      </div>
    </div>
  );
};

export default LikeButton;

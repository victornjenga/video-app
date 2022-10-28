import React, { useEffect, useState } from "react";
import Image from "next/image";
import { GoVerified } from "react-icons/go";
import axios from "axios";
import { GoogleLogin, googleLogout } from "@react-oauth/google";
import useAuthStore from "/store/authStore";
import { createOrGetUser } from "/utils";
import VideoCard from "../../components/VideoCard";
import NoResults from "../../components/NoResults";
import { BASE_URL } from "../../utils";
const Profile = ({ data }) => {
  const [showUserVideos, setShowUserVideos] = useState(true);
  const [videosList, setVideosList] = useState([]);

  const { user, userVideos, userLikedVideos } = data;
  const videos = showUserVideos ? "border-b-2 border-black" : "text-gray-400";
  const liked = !showUserVideos ? "border-b-2 border-black" : "text-gray-400";
  const { userProfile, addUser, removeUser } = useAuthStore();

  useEffect(() => {
    const fetchVideos = async () => {
      if (showUserVideos) {
        setVideosList(userVideos);
      } else {
        setVideosList(userLikedVideos);
      }
    };

    fetchVideos();
  }, [showUserVideos, userLikedVideos, userVideos]);

  return (
    <div className="w-full">
      <div className="flex gap-6 md:gap-10 ml-6 mb-4 bg-white w-full">
        <div className="w-20 h-20 md:w-32 md:h-32">
          <Image
            width={130}
            height={130}
            layout="responsive"
            className="rounded-full"
            src={user.image}
            alt="user-profile"
          />
        </div>
        <div>
          <div className="text-md md:text-2xl font-bold tracking-wider flex flex-col  items-center justify-center lowercase">
            <span>{user.userName.replace(/\s+/g, "")} </span>
            <p className="text-sm font-medium"> {user.userName}</p>
          </div>
          {userProfile ? (
            <button
              onClick={() => {
                googleLogout();
                removeUser();
              }}
              className="px-2 py-1 rounded-lg font-medium text-white my-2 bg-[#F51997]"
            >
              Logout
            </button>
          ) : (
            <GoogleLogin
              onSuccess={(response) => createOrGetUser(response, addUser)}
              onError={() => console.log("Login Failed")}
            />
          )}
        </div>
      </div>
      <div className="ml-4">
        <div className="flex gap-10 mb-10 mt-10 border-b-2 border-gray-200 bg-white w-full">
          <p
            className={`text-xl font-semibold cursor-pointer ${videos} mt-2`}
            onClick={() => setShowUserVideos(true)}
          >
            Videos
          </p>
          <p
            className={`text-xl font-semibold cursor-pointer ${liked} mt-2`}
            onClick={() => setShowUserVideos(false)}
          >
            Liked
          </p>
        </div>
        <div className="flex gap-6 flex-wrap md:justify-start">
          {videosList.length > 0 ? (
            videosList.map((post, idx) => <VideoCard key={idx} post={post} />)
          ) : (
            <NoResults
              text={`No ${showUserVideos ? "" : "Liked"} Videos Yet`}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps = async ({ params: { userId } }) => {
  const res = await axios.get(`${BASE_URL}/api/profile/${userId}`);

  return {
    props: { data: res.data },
  };
};
export default Profile;

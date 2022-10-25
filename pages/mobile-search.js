import React, { useEffect, useState } from "react";
import { BiSearch } from "react-icons/bi";
import Discover from "../components/Discover";
import SuggestedAccounts from "../components/SuggestedAccounts";
import useAuthStore from "../store/authStore";
import { useRouter } from "next/router";

function Mobilesearch() {
  const { fetchAllUsers, allUsers } = useAuthStore();
  const router = useRouter();
  const { userProfile, addUser, removeUser } = useAuthStore();
  const [searchValue, setSearchValue] = useState("");
  const [user, setUser] = useState();

  useEffect(() => {
    setUser(userProfile);
  }, [userProfile]);

  const handleSearch = (e) => {
    e.preventDefault();

    if (searchValue) {
      router.push(`/search/${searchValue}`);
    }
  };
  return (
    <div className="xl:w-[400px] w-full sm:hidden  flex flex-col  justify-center mb-10 ">
      <div className="flex justify-center items-center sticky">
        <form onSubmit={handleSearch} className="top-10 flex  bg-white">
          <input
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            className="bg-primary p-3 md:text-md font-medium border-2 border-gray-100 focus:outline-none focus:border-2 focus:border-gray-300 w-[300px] md:w-[350px] rounded-full  md:top-0"
            placeholder="Search accounts and videos"
          />
          <button
            onClick={handleSearch}
            className="absolute md:right-5 right-6 top-4 border-l-2 border-gray-300 pl-4 text-2xl text-gray-300"
          >
            <BiSearch />
          </button>
        </form>
      </div>
      <Discover />
      <SuggestedAccounts fetchAllUsers={fetchAllUsers} allUsers={allUsers} />
    </div>
  );
}

export default Mobilesearch;

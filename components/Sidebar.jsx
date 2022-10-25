import React, { useState } from "react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import Link from "next/link";
import { AiFillHome, AiOutlineMenu } from "react-icons/ai";
import { ImCancelCircle } from "react-icons/im";
import { GoogleLogin, googleLogout } from "@react-oauth/google";
import Discover from "./Discover";
import SuggestedAccounts from "./SuggestedAccounts";
import useAuthStore from '../store/authStore';

function Sidebar() {
  const [showSidebar, setShowSidebar] = useState(true);
  const userProfile = false;
  const { pathname } = useRouter();

  const { fetchAllUsers, allUsers } = useAuthStore();

  return (
    <div className="hidden md:flex md:flex-col">
      <div
        className="block xl:hidden m-2 ml-4 mt-3 text-xl"
        onClick={() => setShowSidebar(!showSidebar)}
      >
        {" "}
        {showSidebar ? <ImCancelCircle /> : <AiOutlineMenu />}
      </div>
      {showSidebar && (
        <div className='xl:w-[400px] w-20  flex flex-col  justify-start mb-10 border-r-2 border-gray-100 xl:border-0 p-3 '>
          <div className="xl:border-b-2 justify-center items-center border-gray-200 xl:pb-4">
            <Link href="/">
              <div>
                <p className="text-2xl">
                  <AiFillHome />
                </p>
                <span className="capitalize text-xl hidden xl:block">
                  For You
                </span>
              </div>
            </Link>
          </div>
        
          <Discover />
          <SuggestedAccounts
            fetchAllUsers={fetchAllUsers}
            allUsers={allUsers}
          />
        </div>
      )}
    </div>
  );
}

export default Sidebar;

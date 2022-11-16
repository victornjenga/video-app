import React, { useState } from "react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import Link from "next/link";
import { AiFillHome, AiOutlineMenu } from "react-icons/ai";
import { ImCancelCircle } from "react-icons/im";
import { GoogleLogin, googleLogout } from "@react-oauth/google";
import Discover from "./Discover";
import SuggestedAccounts from "./SuggestedAccounts";
import useAuthStore from "../store/authStore";

function Sidebar() {
  const [showSidebar, setShowSidebar] = useState(true);
  const userProfile = false;
  const { pathname } = useRouter();

  const { fetchAllUsers, allUsers } = useAuthStore();

  return (
    <div className="hidden md:flex md:flex-col">
      <div className="block xl:hidden m-2 ml-4 mt-3 text-xl"></div>

      <div className="xl:w-[500px] w-[250px]   flex flex-col  justify-start mb-10 border-r-2 border-gray-100 xl:border-0 p-3 ">
        <Discover />
        <SuggestedAccounts fetchAllUsers={fetchAllUsers} allUsers={allUsers} />
      </div>
    </div>
  );
}

export default Sidebar;

import "../styles/globals.css";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { GoogleOAuthProvider } from "@react-oauth/google";
import NextNprogress from "nextjs-progressbar";
import FooterBar from "../components/FooterBar";

function MyApp({ Component, pageProps }) {
  const [isSSR, setIsSSR] = useState(true);

  useEffect(() => {
    setIsSSR(false);
  }, []);

  if (isSSR) return null;
  return (
    <GoogleOAuthProvider
      clientId={`${process.env.NEXT_PUBLIC_GOOGLE_API_TOKEN}`}
    >
      <>
        <NextNprogress />
        <div className="  xl:w-[1200px] m-auto overflow-hidden h-[100vh]">
          {" "}
          <Navbar className=" hidden md:block" />
          <div className="flex  ">
            <div className="h-[92vh] overflow-hidden xl:hover:overflow-auto">
              <Sidebar />
            </div>
            <div className="mt-4 flex flex-col overflow-auto h-[88vh] videos ">
              <Component {...pageProps} />
            </div>
          </div>
        </div>{" "}
        <div className="fixed">
          <FooterBar />
        </div>
      </>
    </GoogleOAuthProvider>
  );
}

export default MyApp;

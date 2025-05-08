import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import rat from "../assets/ratmain.png";

const Banner = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    setIsLoggedIn(!!storedUser);
  }, []);

  return (
    <section className="flex flex-col md:flex-row items-center justify-center gap-10 mt-16 px-6 text-center md:text-left">
      <div className="flex flex-col gap-5">
        <p className="text-[#FF577F] font-bold text-4xl sm:text-5xl lg:text-[48px]">
          Crocheted Masterpieces
        </p>

        <p className="font-flair text-[#FF577F] text-5xl sm:text-6xl lg:text-7xl">
          That Click!
        </p>

        <p className="text-[#FF884B] font-bold text-2xl sm:text-3xl lg:text-[30px] mb-10">
          Made by hand, felt by heart.
        </p>

        {!isLoggedIn && (
          <Link
            to="/signup"
            className="inline-block bg-[#FF577F] text-white font-bold rounded px-6 py-2 w-fit hover:opacity-90 transition mx-auto md:mx-0"
          >
            Sign Up&nbsp;Now!
          </Link>
        )}
      </div>

      <div className="md:ml-[5%] mt-2 md:mt-0 flex justify-center">
        <img
          src={rat}
          alt="crocheted-monsieur-rat"
          className="
            w-[220px] h-[220px]
            sm:w-[300px] sm:h-[300px]
            lg:w-[400px] lg:h-[400px]
            xl:w-[500px] xl:h-[500px]
          "
        />
      </div>
    </section>
  );
};

export default Banner;

import { useEffect, useState } from "react";
import "../css/main.css";
import Banner from "../components/Banner.jsx";
import Reasons from "../components/Reasons.jsx";
import ServicesSec from "../components/ServicesSec.jsx";
import ProductsSec from "../components/ProductsSec.jsx";
import CraftSec from "../components/CraftSec.jsx";
import Header from "../components/header.jsx";
import Footer from "../components/footer.jsx";

const MainPage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem("user");
    setIsLoggedIn(!!user);
  }, []);

  return (
    <>
      <Banner />

      {/* Only show when not logged in */}
      {!isLoggedIn && (
        <>
          <Reasons />
          <ServicesSec />
          <ProductsSec />
          <CraftSec />
        </>
      )}
    </>
  );
};

export default MainPage;

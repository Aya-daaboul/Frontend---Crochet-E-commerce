import "../css/main.css";
import Banner from "../components/Banner.jsx";
import Reasons from "../components/Reasons.jsx";
import ServicesSec from "../components/ServicesSec.jsx";
import ProductsSec from "../components/ProductsSec.jsx";
import CraftSec from "../components/CraftSec.jsx";

const MainPage = () => {
  return (
    <>
      <Banner />
      <Reasons />
      <ServicesSec />
      <ProductsSec />
      <CraftSec />
    </>
  );
};

export default MainPage;

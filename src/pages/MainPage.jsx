import Header from '../components/header.jsx'
import '../css/main.css'
import Banner from '../components/Banner.jsx'
import Reasons from '../components/Reasons.jsx'
import ServicesSec from '../components/ServicesSec.jsx';
import ProductsSec from '../components/ProductsSec.jsx';
import Craft from '../components/craft.jsx';

const MainPage = () => {
    return (
      <>
      <Header/>
      <Banner/>
      <Reasons/>
      <ServicesSec/>
      <ProductsSec/>
      <Craft/>


      </>
      
    );
  };
  
  export default MainPage;
import Banner from "../Components/Banner";
import Coverage from "../Components/Coverage";
import CTABanner from "../Components/CTABanner";
import HowItWorks from "../Components/HowItWorks";
import LatestBooks from "../Components/LatestBooks";
import WhyChooseBookCourier from "../Components/WhyChooseBookCourier";

const Home = () => {
  return (
  <div className="space-y-20">
  <Banner/>
  <LatestBooks/>
  <WhyChooseBookCourier/>
  <Coverage/>
  <HowItWorks/>
  <CTABanner/>
  </div>

    // <div>
    //     <p className='h-10 w-10 bg-primary'></p>
    //     <p className='h-10 w-10 bg-secondary'></p>
    //     <p className='h-10 w-10 bg-accent'></p>
    //     <p className='h-10 w-10 bg-base-100'></p>
    //     <p className='h-10 w-10 bg-neutral'></p>
    // </div>
  );
};

export default Home;

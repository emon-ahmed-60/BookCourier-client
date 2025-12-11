import Banner from "../Components/Banner";
import Coverage from "../Components/Coverage";
import CTABanner from "../Components/CTABanner";
import HowItWorks from "../Components/HowItWorks";
import LatestBooks from "../Components/LatestBooks";
import WhyChooseBookCourier from "../Components/WhyChooseBookCourier";

const Home = () => {
  return (
    <div className="space-y-20">
      <Banner />
      <LatestBooks />
      <WhyChooseBookCourier />
      <Coverage />
      <HowItWorks />
      <CTABanner />
    </div>
  );
};

export default Home;

import HeroSlider from "../pages/homePage-part/HeroSlider";
import Movies from "../pages/homePage-part/Movies";
import "../style/homePage.scss";

export default function HomePage() {
  return (
    <div className="home-page">
      <div className="content-wrapper">
        <HeroSlider />
        <Movies />
      </div>
    </div>
  );
}

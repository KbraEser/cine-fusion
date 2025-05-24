import HeroSlider from "./HeroSlider";
import "../style/homePage.scss";

export default function HomePage() {
  return (
    <div className="home-page">
      <div className="content-wrapper">
        <HeroSlider />
      </div>
    </div>
  );
}

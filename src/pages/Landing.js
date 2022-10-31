import main from "../assets/images/main.svg";
import Wrapper from "../assets/wrappers/LandingPage";
import { Logo } from "../components";
import { Link } from "react-router-dom";

const Landing = () => {
  return (
    // Main
    <Wrapper>
      <nav>
        <Logo />
      </nav>

      {/* Two column layout */}
      <div className="container page">
        <div className="info">
          <h1>
            job <span>tracking</span> app
          </h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores
            similique exercitationem cupiditate amet, iste inventore, dicta
            reiciendis facilis ipsum optio harum aliquid mollitia excepturi
            placeat error culpa, libero officiis atque?
          </p>
          <Link to="/register" className="btn btn-hero">
            Login / Register
          </Link>
        </div>

        <img src={main} alt="job hunt" className="img main-img" />
      </div>
    </Wrapper>
  );
};

export default Landing;

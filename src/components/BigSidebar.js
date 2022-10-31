import NavLinks from "./NavLinks";
import Logo from "../components/Logo";
import Wrapper from "../assets/wrappers/BigSidebar";
import { useSelector } from "react-redux";

const BigSidebar = () => {
  const { isSidebarOpen } = useSelector((store) => store.user); // Control margin-left of component.

  return (
    // Aside
    <Wrapper>
      {/* show-sidebar slides sidebar in */}
      <div
        className={
          isSidebarOpen ? "sidebar-container" : "sidebar-container show-sidebar"
        }
      >
        <div className="content">
          <header>
            <Logo />
          </header>

          {/* Here in BigSidebar we will not pass in toggleSidebar action creator */}
          <NavLinks />
        </div>
      </div>
    </Wrapper>
  );
};

export default BigSidebar;

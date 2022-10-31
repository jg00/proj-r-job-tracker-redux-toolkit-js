import Wrapper from "../assets/wrappers/SmallSidebar";
import { FaTimes } from "react-icons/fa";
import Logo from "./Logo";
import { useSelector, useDispatch } from "react-redux";
import NavLinks from "./NavLinks";

// Action creators
import { toggleSidebar } from "../features/user/userSlice";

const SmallSidebar = () => {
  const { isSidebarOpen } = useSelector((store) => store.user);
  const dispatch = useDispatch();

  // Close sidebar
  const toggle = () => {
    dispatch(toggleSidebar());
  };

  return (
    // Aside - @ 992px display hidden
    <Wrapper>
      {/* .sidebar-container gray overlay, .content nav layer */}
      <div
        className={
          isSidebarOpen
            ? "sidebar-container show-sidebar"
            : "sidebar-container "
        }
      >
        <div className="content">
          <button className="close-btn" onClick={toggle}>
            <FaTimes />
          </button>

          <header>
            <Logo />
          </header>

          <NavLinks toggleSidebar={toggle} />
        </div>
      </div>
    </Wrapper>
  );
};
export default SmallSidebar;

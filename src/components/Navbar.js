import Wrapper from "../assets/wrappers/Navbar";
import { FaAlignLeft, FaUserCircle, FaCaretDown } from "react-icons/fa";
import Logo from "./Logo";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

// Action creators
import {
  toggleSidebar,
  // logoutUser, // Replace with clearStore to reset all values
  clearStore,
} from "../features/user/userSlice";

const Navbar = () => {
  const [showLogout, setShowLogout] = useState(false); // Local state
  const { user } = useSelector((store) => store.user); // App state
  const dispatch = useDispatch();

  // Display/hide left side bar (ie BigSidebar component)
  const toggle = () => {
    dispatch(toggleSidebar());
  };

  return (
    // Nav
    <Wrapper>
      {/* Flex - toggle, logo, user/login/logout*/}
      <div className="nav-center">
        <button type="button" className="toggle-btn" onClick={toggle}>
          <FaAlignLeft />
        </button>

        {/* @992px display h3, Logo hidden  */}
        <div>
          <Logo />
          <h3 className="logo-text">dashboard</h3>
        </div>

        {/* Position: relative */}
        <div className="btn-container">
          <button
            type="button"
            className="btn"
            onClick={() => setShowLogout(!showLogout)} // Display/hide logout button
          >
            <FaUserCircle />
            {user?.name}
            <FaCaretDown />
          </button>

          {/* Position: absolute, hidden by default, controlled via local state */}
          <div className={showLogout ? "dropdown show-dropdown" : "dropdown"}>
            <button
              className="dropdown-btn"
              type="button"
              // onClick={() => dispatch(logoutUser("Logging out..."))} // Argument passed into logoutUser is treated as the action.payload
              onClick={() => dispatch(clearStore("Logging out..."))}
            >
              logout
            </button>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};
export default Navbar;

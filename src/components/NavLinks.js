import { NavLink, useLocation } from "react-router-dom";
import links from "../utils/links";

const NavLinks = ({ toggleSidebar }) => {
  // extract pathname from location
  const { pathname } = useLocation();

  return (
    <div className="nav-links">
      {links.map((link) => {
        const { text, path, id, icon } = link;

        // console.log(pathname, path);

        return (
          <NavLink
            to={path}
            // className={({ isActive }) => {
            //   return isActive ? "nav-link active" : "nav-link";
            // }}

            // Fix
            className={() => {
              return pathname === path ? "nav-link active" : "nav-link";
            }}
            key={id}
            onClick={toggleSidebar}
          >
            <span className="icon">{icon}</span>
            {text}
          </NavLink>
        );
      })}
    </div>
  );
};

export default NavLinks;

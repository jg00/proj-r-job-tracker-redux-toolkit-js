import { Outlet } from "react-router-dom"; // Component where we will display the content of the dashboard pages
import { Navbar, SmallSidebar, BigSidebar } from "../../components";
import Wrapper from "../../assets/wrappers/SharedLayout";

const SharedLayout = () => {
  return (
    // Section
    <Wrapper>
      <main className="dashboard">
        {/* Column One - @992px display BigSidebar, SmallSidebar display none */}
        <SmallSidebar />
        <BigSidebar />

        {/* Column Two - two rows nav and section for dashboard */}
        <div>
          {/* nav */}
          <Navbar />

          {/* section */}
          <div className="dashboard-page">
            <Outlet />
          </div>
        </div>
      </main>
    </Wrapper>
  );
};

export default SharedLayout;

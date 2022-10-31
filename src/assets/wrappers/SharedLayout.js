import styled from "styled-components";

// Section for whole dashboard page
const Wrapper = styled.section`
  /* Deals with setting up left nav column and right column which will have the dashboard page */
  .dashboard {
    display: grid;
    grid-template-columns: 1fr;
  }

  /* Deals with width of the dashboard area */
  .dashboard-page {
    width: 90vw;
    margin: 0 auto;
    padding: 2rem 0;
  }
  @media (min-width: 992px) {
    .dashboard {
      grid-template-columns: auto 1fr;
    }
    .dashboard-page {
      width: 90%;
    }
  }
`;
export default Wrapper;

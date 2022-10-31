import { useEffect } from "react";
import Job from "./Job";
import Wrapper from "../assets/wrappers/JobsContainer";
import { useSelector, useDispatch } from "react-redux";
import Loading from "./Loading";
import PageBtnContainer from "./PageBtnContainer";

// Async Action Creators
import { getAllJobs } from "../features/allJobs/allJobsSlice.js";

const JobsContainer = () => {
  const {
    jobs,
    isLoading,
    page,
    totalJobs,
    numOfPages,
    search,
    searchStatus,
    searchType,
    sort,
  } = useSelector((store) => store.allJobs);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllJobs()); // Not passing any data for payload
  }, [page, search, searchStatus, searchType, sort]);

  // Note this is also checked after deleting a job
  if (isLoading) {
    // Loading is a styled div
    return <Loading center />;
  }

  if (jobs.length === 0) {
    return (
      <Wrapper>
        <h2>No jobs to display...</h2>
      </Wrapper>
    );
  }

  return (
    // Section
    <Wrapper>
      <h5>
        {totalJobs} job{jobs.length > 1 && "s"} found
      </h5>

      {/* Two column grid at 992px */}
      <div className="jobs">
        {jobs.map((job) => {
          // console.log(job); {_id, company, position, status, jobType, …}
          return <Job key={job._id} {...job} />;
        })}
      </div>

      {numOfPages > 1 && <PageBtnContainer />}
    </Wrapper>
  );
};

export default JobsContainer;

import { JobsContainer, SearchContainer } from "../../components";

const AllJobs = () => {
  return (
    <>
      <SearchContainer />
      <JobsContainer />
    </>
  );
};

export default AllJobs;

/*
  SearchContainer - Search form criteria 
  JobsContainer - List all jobs and pagination
*/

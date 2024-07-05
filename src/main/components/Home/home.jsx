/* eslint-disable react/prop-types */
import Hero from "./Hero";
import Navbar from "./navbar";
import dayjs from "dayjs";
import JobDummyData from "./JobDummyData";
const Home = () => {
  return (
    <>
      <Navbar />
      <Hero />
      <SearchBar />
      {JobDummyData?.map((job) => {
        return <JobCard key={job.id} {...job} />;
      })}
    </>
  );
};

export default Home;

function SearchBar() {
  return (
    <div className="flex flex-col items-start justify-start   p-8">
      <div className="flex space-x-4">
        <select className="flex flex-col items-start justify-start w-64 py-3 pl-4 bg-zinc-200 font-semibold rounded-md">
          <option value="" hidden>
            {" "}
            Job Role{" "}
          </option>
          <option value="iOS Developer">iOS Developer</option>
          <option value="Frontend Developer">Frontend Developer</option>
          <option value="Backend Developer">Backend Developer</option>
          <option value="Android Developer">Android Developer</option>
          <option value="Developer Advocate">Developer Advocate</option>
        </select>

        <select className="flex flex-col items-start justify-start w-64 py-3 pl-8 bg-zinc-200 font-semibold rounded-md">
          <option values="" hidden>
            {" "}
            Job Type
          </option>

          <option value="Full Time">Full Time</option>
          <option value="Part Time">Part Time</option>
          <option value="Contract">Contract</option>
        </select>

        <select className="flex flex-col items-start justify-start w-64 py-3 pl-8 bg-zinc-200 font-semibold rounded-md">
          <option values=""> Location</option>
          <option value="Full Time">In-office</option>
          <option value="Part Time">Hybrid</option>
          <option value="Contract">Remote</option>
        </select>

        <select className="flex flex-col items-start justify-start w-64 py-3 pl-8 bg-zinc-200 font-semibold rounded-md">
          <option values=" " hidden>
            {" "}
            Experience
          </option>
          <option value="Full Time">Fresher</option>
          <option value="Part Time">Junior level</option>
          <option value="Contract">Senior level</option>
        </select>
        <button className="w-64 bg-blue-500 text-white font-bold py-3 rounded-md">
          Search
        </button>
      </div>
    </div>
  );
}

function JobCard(props) {
  const skill = ["Javascript ", "React ", "Nodejs"];
  const date1 = dayjs(props?.postedOn);
  const diffindays = date1.diff(Date.now(), "day");
  console.log(diffindays)
  return (
    <div className="mx-40 mb-4">
      <div className="flex justify-between items-center px-6 py-4 bg-zinc-200 rounded-md border-black shadow-lg  hover:translate-y-1 hover:scale-105">
        <div className="flex flex-col intems-start gap-3">
          <h1 className="text-lg font-semibold ">
            {props?.title} -{props?.company}{" "}
          </h1>
          <p>
            {props?.type} &#x2022;{props?.experience}&#x2022; {props?.location}
            &#x2022;
          </p>
          <div className="flex items-center gap-2">
            {props?.skill?.map((skill) => (
              <p
                key={skill}
                className="text-gray-500 py-1 px-2 rounded-md border border-black"
              >
                {skill}
              </p>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-4">
          <p className="text-gray-500">Posted {diffindays} ago</p>
          <a href={props.job_link}>
            <button className="text-blue-500 border border-blue-500 px-10 py-2 rounded-md">
              Apply
            </button>
          </a>
        </div>
      </div>
    </div>
  );
}

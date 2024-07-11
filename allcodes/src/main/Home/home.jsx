/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState, useEffect, useCallback } from "react";
import Hero from "./hero";
import dayjs from "dayjs";
import useServer from "../hooks/useServer";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
const Home = () => {
  const Server = useServer();
  const [loader, setLoader] = useState(false)
  const [jobs, setJobs] = useState([]);
  const applied = JSON.parse(localStorage.getItem('apply') || '[]');

  const fetchData = useCallback(async () => {
    try {
      setLoader(true);
      const res = await fetch(`${Server}/user/getall`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        withCredentials: true,
      });
      const resData = await res.json();
      const { error, message, data } = resData;
      if (error) {
        return toast.error(message);
      }
      const check = data.map((item, i) => {
        const appliedOrNot = applied.find((id) => id === item._id);
        if (appliedOrNot) {
          item.applied = true;
          return item
        }
        else return item
      })
      setJobs(check);
    } catch (error) {
      console.log(error);
      if (error?.response?.data?.message) {
        return toast.error(error?.response?.data?.message);
      } else {
        return toast.error("Failed to fetch Data");
      }
    } finally {
      setLoader(false);
    }
  }, [Server]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);
  return (
    <>
      <Hero />
      <SearchBar />

      {
        loader ? <h1 className=" text-xl py-10">Fetching Jobs....</h1> :
          jobs?.map((job) => {
            return (
              <div key={job._id}>
                <JobCard {...job} />;
              </div>
            );
          })}
    </>
  );
};
export default Home;

function SearchBar() {
  return (
    <div className="flex flex-col    p-8">
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
        <button className="w-64 bg-blue-500 text-black font-bold py-3 rounded-md">
          Search
        </button>
      </div>
    </div>
  );
}
function JobCard(props) {
  const date1 = dayjs(props?.postedOn);
  const diffindays = date1.diff(Date.now(), "day");
  return (
    <div className="mx-40 mb-4">
      <div className="flex justify-between items-center px-6 py-4 bg-zinc-200 rounded-md border-black shadow-lg  ">
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
          <Link to={`/job/${props._id}`}>
            <button className="text-blue-500 border border-blue-500  hover:duration-150 px-10 py-2 rounded-md">
              Learn More
            </button>
          </Link>
          <Link to={`/job/${props._id}`}>
            <button disabled={props?.applied} className=" border border-blue-500 bg-blue-500  disabled:bg-gray-400 text-black hover:duration-150 px-10 py-2 rounded-md">
              {props.applied ? 'Already applied' : 'Apply'}

            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

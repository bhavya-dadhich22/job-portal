import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import useServer from "../hooks/useServer";
import toast from "react-hot-toast";
import { useAuthUser } from "../zustand/useAuth";

const JobDetails = () => {
  const [isApplied, setIsApplied] = useState(false);
  const { AuthUser } = useAuthUser()
  const { jobId } = useParams();
  const Server = useServer();
  const [loading, setLoading] = useState(false);
  const [jobData, setJobData] = useState(null);
  const applied = JSON.parse(localStorage.getItem('apply') || '[]');
  const navigate = useNavigate();

  useEffect(() => {
    const checkIfApplied = () => {
      if (applied.includes(jobId)) {
        setIsApplied(true);
      }
    };


    !jobData && fetchData();

    checkIfApplied();
  }, [Server, jobId, applied]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${Server}/user/getone/${jobId}`, {
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
      setJobData(data);
    } catch (error) {
      console.log(error);
      if (error?.response?.data?.message) {
        return toast.error(error?.response?.data?.message);
      } else {
        return toast.error("Failed to fetch Data");
      }
    } finally {
      setLoading(false);
    }
  };

  const ApplyJob = async () => {
    try {
      if (!AuthUser) {
        navigate('/login')
        return toast.error('Please login to continue')
      }
      setLoading(true);
      const res = await fetch(`${Server}/user/apply/${jobId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        withCredentials: true,
      });
      const resData = await res.json();
      const { error, message } = resData;
      if (error) {
        return toast.error(message);
      }
      localStorage.setItem('apply', JSON.stringify([...applied, jobId]));
      setIsApplied(true);
      toast.success(message);
    } catch (error) {
      console.log(error);
      if (error?.response?.data?.message) {
        return toast.error(error?.response?.data?.message);
      } else {
        return toast.error("Failed to apply for job");
      }
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="min-h-screen  py-10">
      {loading ? (
        <div className="flex  items-left justify-center text-3xl">
          Fetching Data...
          <h1 className="h-7 w-7 rounded-full border-2 mx-4 border-t-transparent border-black animate-spin"></h1>
        </div>
      ) : (
        <div className="container mx-auto p-4">
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-4xl mx-auto">
            <div className="mb-6">
              <h1 className="text-3xl font-bold text-blue-700">{jobData?.title}</h1>
              <h2 className="text-xl text-gray-700 mb-2">{jobData?.companyName}</h2>
              <div className="flex  items-left text-gray-600">
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20"><path d="M10 2C6.14 2 3 5.14 3 9s3.14 7 7 7 7-3.14 7-7-3.14-7-7-7zm0 12.93c-3.19 0-5.79-2.6-5.79-5.79S6.81 3.36 10 3.36 15.79 5.97 15.79 9.14 13.19 14.93 10 14.93zm0-1.71c-2.24 0-4.07-1.83-4.07-4.07 0-2.24 1.83-4.07 4.07-4.07 2.24 0 4.07 1.83 4.07 4.07 0 2.24-1.83 4.07-4.07 4.07z" /></svg>
                {jobData?.location}
              </div>
            </div>


            <div className="mb-6 flex items-left space-x-4">
              <span className="inline-block bg-green-100 text-green-600 px-3 py-1 rounded-lg">Posted today</span>
              <span className="inline-block bg-gray-200 text-gray-700 px-3 py-1 rounded-lg">Internship</span>
              <div className="flex  items-left text-gray-600">

              </div>
            </div>

            <div className="mb-6 text-left">
              <h3 className="text-xl font-semibold mb-2 text-gray-900">About the job</h3>
              <p className="text-gray-700 mb-4">{jobData?.description}</p>
            </div>

            <div className="mb-6 text-left">
              <h3 className="text-xl font-semibold mb-2 text-gray-900">Qualifications</h3>
              <ul className="list-disc list-inside text-gray-700">
                {jobData?.qualifications?.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>

            <div className="mb-6 text-left">
              <h3 className="text-xl font-semibold mb-2 text-gray-900">Responsibilities</h3>
              <ul className="list-disc list-inside text-gray-700">
                {jobData?.responsibilities?.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>

            <div className="mb-6 text-left">
              <h3 className="text-xl font-semibold mb-2 text-gray-900">Skills</h3>
              <div className="flex flex-wrap gap-2">
                {jobData?.skills?.map((item, i) => (
                  <span key={i} className="bg-gray-200 text-gray-700 px-3 py-1 rounded-lg">
                    {item}
                  </span>
                ))}
              </div>
            </div>

            <div className="mb-6 text-left">
              <h3 className="text-xl font-semibold mb-2 text-gray-900">Salary Range</h3>
              <p className="text-lg text-gray-600">{jobData?.salaryRange?.min} - {jobData?.salaryRange?.max}</p>
            </div>


            <button disabled={isApplied} onClick={ApplyJob} type="submit" className="text-white mx-5 inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center :bg-blue-600 :hover:bg-blue-700 :focus:ring-blue-800 disabled:bg-gray-600">
              {isApplied ? 'Already Applied' : 'Apply'}
            </button>
            <Link to={'/user/applied'} className={isApplied ? '' : 'hidden'}>
              <h1 type="submit" className="text-white mx-5 inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center :bg-blue-600 :hover:bg-blue-700 :focus:ring-blue-800 disabled:bg-gray-600">
                {'View'}
              </h1>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default JobDetails;

import React, { useCallback, useEffect, useState } from "react";
import Modal from "react-modal";
import useServer from '../../hooks/useServer'
import toast from 'react-hot-toast'
import useToken from "../../hooks/useToken";



const Dashboard = () => {

  const [selectedJob, setSelectedJob] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const Server = useServer();
  const [loader, setLoader] = useState(false)
  const [jobs, setJobs] = useState([]);
  const token = useToken();

  const fetchData = useCallback(async () => {
    try {
      setLoader(true);
      const res = await fetch(`${Server}/emp/posted`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ token }),
        withCredentials: true,
      });
      const resData = await res.json();
      const { error, message, data } = resData;
      if (error) {
        return toast.error(message);
      }
      if (data)
        setJobs(data)
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


  const handleEdit = (job) => {
    setSelectedJob(job);
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    console.log(id);
    try {
      setLoader(true);
      const res = await fetch(`${Server}/emp/delete/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token }),
        credentials: 'include',
        withCredentials: true,
      });
      const resData = await res.json();
      const { error, message, data } = resData;
      if (error) {
        return toast.error(message);
      }
      console.log(data);
      fetchData();
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
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSelectedJob({
      ...selectedJob,
      [name]: value,
    });
  };


  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedJob(null);
  };

  const SaveUpdate = async () => {
    try {
      console.log(selectedJob);
      if (!selectedJob) return toast.error('failed');
      setLoader(true);
      const res = await fetch(`${Server}/emp/update/${selectedJob?._id}`, {
        method: 'PUT',
        body: JSON.stringify({ selectedJob, token }),
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
      console.log(data);
      setSelectedJob(null)
      fetchData();
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
  };



  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold mb-6">Jobs Posted by Tech Solutions Inc.</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {jobs.map((job) => (
            <div key={job._id} className="bg-white p-4 rounded-lg shadow-md">
              <h2 className="text-xl font-bold mb-2">{job.title}</h2>
              <p className="text-gray-600 mb-2">{job.description}</p>
              <p className="text-gray-800 font-semibold">Location: {job.location}</p>
              <p className="text-gray-800 font-semibold">Employment Type: {job.employmentType}</p>
              <p className="text-gray-800 font-semibold">Experience Level: {job.experienceLevel}</p>
              <p className="text-gray-800 font-semibold">
                Salary: ${job.salaryRange.min} - ${job.salaryRange.max}
              </p>
              <div className="mt-4">
                <h3 className="text-lg font-semibold">Qualifications:</h3>
                <ul className="list-disc list-inside">
                  {job.qualifications.map((qual, index) => (
                    <li key={index}>{qual}</li>
                  ))}
                </ul>
              </div>
              <div className="mt-4">
                <h3 className="text-lg font-semibold">Responsibilities:</h3>
                <ul className="list-disc list-inside">
                  {job.responsibilities.map((resp, index) => (
                    <li key={index}>{resp}</li>
                  ))}
                </ul>
              </div>
              <div className="mt-4">
                <h3 className="text-lg font-semibold">Skills:</h3>
                <ul className="list-disc list-inside">
                  {job.skills.map((skill, index) => (
                    <li key={index}>{skill}</li>
                  ))}
                </ul>
              </div>
              <p className="text-gray-600 mt-4">Posted At: {new Date(job.postedAt).toLocaleDateString()}</p>
              <div className="mt-4 flex space-x-2">
                <a href="#modal">

                  <button
                    onClick={() => handleEdit(job)}
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                  >
                    Edit
                  </button>
                </a>
                <button
                  onClick={() => handleDelete(job._id)}
                  className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-700"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      {selectedJob && (
        <Modal
          isOpen={isModalOpen}
          onRequestClose={closeModal}
          contentLabel="Edit Job"
          className="modal"
          overlayClassName="modal-overlay"
        >
          <div id="modal" className="p-6  bg-white rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4">Edit Job</h2>
            <form>
              <div className="mb-4">
                <label className="block text-gray-700">Title</label>
                <input
                  type="text"
                  name="title"
                  value={selectedJob.title}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Description</label>
                <textarea
                  name="description"
                  value={selectedJob.description}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Location</label>
                <input
                  type="text"
                  name="location"
                  value={selectedJob.location}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Employment Type</label>
                <input
                  type="text"
                  name="employmentType"
                  value={selectedJob.employmentType}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Experience Level</label>
                <input
                  type="text"
                  name="experienceLevel"
                  value={selectedJob.experienceLevel}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Salary Range</label>
                <div className="flex space-x-2">
                  <input
                    type="number"
                    name="salaryRangeMin"
                    value={selectedJob.salaryRange.min}
                    onChange={(e) =>
                      handleInputChange({ target: { name: "salaryRange", value: { ...selectedJob.salaryRange, min: e.target.value } } })
                    }
                    className="w-full p-2 border rounded"
                  />
                  <input
                    type="number"
                    name="salaryRangeMax"
                    value={selectedJob.salaryRange.max}
                    onChange={(e) =>
                      handleInputChange({ target: { name: "salaryRange", value: { ...selectedJob.salaryRange, max: e.target.value } } })
                    }
                    className="w-full p-2 border rounded"
                  />
                </div>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Qualifications</label>
                <textarea
                  name="qualifications"
                  value={selectedJob.qualifications.join("\n")}
                  onChange={(e) =>
                    handleInputChange({ target: { name: "qualifications", value: e.target.value.split("\n") } })
                  }
                  className="w-full p-2 border rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Responsibilities</label>
                <textarea
                  name="responsibilities"
                  value={selectedJob.responsibilities.join("\n")}
                  onChange={(e) =>
                    handleInputChange({ target: { name: "responsibilities", value: e.target.value.split("\n") } })
                  }
                  className="w-full p-2 border rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Skills</label>
                <textarea
                  name="skills"
                  value={selectedJob.skills.join("\n")}
                  onChange={(e) =>
                    handleInputChange({ target: { name: "skills", value: e.target.value.split("\n") } })
                  }
                  className="w-full p-2 border rounded"
                />
              </div>
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={closeModal}
                  className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-700"
                >
                  Cancel
                </button>
                <button
                  onClick={SaveUpdate}
                  type="button"
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default Dashboard;

// Modal styles
const modalStyles = {
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.75)",
  },
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

Modal.setAppElement("#root");

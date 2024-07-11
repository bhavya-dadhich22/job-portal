import React, { useState, useCallback, useEffect } from "react";
import Modal from "react-modal";
import toast from "react-hot-toast";
import useServer from "../hooks/useServer";
import { useAuthUser } from '../zustand/useAuth';

const Profile = () => {
  const [isUser, setIsUser] = useState(true);
  const Server = useServer();
  const [updateModal, setUpdateModal] = useState(null);
  const [loader, setLoader] = useState(false);
  const [userData, setUserData] = useState(null);
  const { setAuthUser, AuthUser } = useAuthUser();

  const fetchData = useCallback(async () => {
    try {
      setLoader(true);
      const res = await fetch(`${Server}/profile`, {
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
      if (data.type === 'user') {
        setIsUser(true);
      } else {
        setIsUser(false);
      }
      setUserData(data.user);
    } catch (error) {
      toast.error("Failed to fetch Data");
    } finally {
      setLoader(false);
    }
  }, [Server]);

  useEffect(() => {
    if (AuthUser && !userData) {
      setUserData(AuthUser.user);
      setIsUser(AuthUser.type === 'user');
    } else if (!userData) {
      fetchData();
    }
  }, [AuthUser, fetchData, userData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (isUser) {
      setUpdateModal((prev) => ({
        ...prev,
        [name]: value,
      }));
    } else {
      setUpdateModal((prev) => ({
        ...prev,
        about: {
          ...prev.about,
          [name]: value,
        },
      }));
    }
  };

  const closeModal = () => setUpdateModal(null);

  const handleSave = async () => {
    try {
      const res = await fetch(`${Server}/emp/updateinfo`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(updateModal),
      });
      const resData = await res.json();
      const { error, message } = resData;
      if (error) {
        return toast.error(message);
      }
      fetchData();
      toast.success("Profile updated successfully!");
      closeModal();
    } catch (error) {
      console.log(error);
      toast.error("Failed to update profile");
    }
  };

  return (
    <>
      {loader ? (
        <h1>Loading...</h1>
      ) : isUser ? (
        <div className="w-full relative max-w-2xl mx-auto bg-white border border-gray-300 rounded-lg shadow-lg overflow-hidden">
          <div className="bg-gradient-to-r from-blue-700 to-purple-600 h-40"></div>
          <div className="relative -mt-20 flex flex-col items-center pb-10">
            <img
              className="w-36 h-36 mb-3 rounded-full border-4 border-white shadow-lg"
              alt={`${userData?.name} image`}
            />
            <button onClick={() => setUpdateModal(userData)} className="absolute right-4 top-24 bg-blue-500 p-2 rounded-md text-white">
              Update
            </button>
            <h5 className="mb-1 text-3xl font-bold text-gray-900">{userData?.name}</h5>
            <span className="text-md text-gray-500">Full Stack Developer</span>
            <div className="mt-3 flex space-x-4">
              <a href={`mailto:${userData?.email}`} className="text-sm text-black hover:text-blue-700 transition duration-300">
                Contact
              </a>
              <a href={userData?.userInfo?.linkedInProfile} className="text-sm text-black hover:text-blue-700 transition duration-300">
                LinkedIn
              </a>
            </div>
          </div>
          <div className="px-8">
            <div className="mb-8">
              <h6 className="text-xl font-semibold text-gray-900">Education</h6>
              <ul className="mt-2 divide-y divide-gray-200">
                {userData?.userInfo?.education?.map((edu, index) => (
                  <li key={index} className="py-2">
                    <p className="text-md text-gray-700">
                      {edu.course}, {edu.collegeName}, {edu.year}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
            <div className="mb-8">
              <h6 className="text-xl font-semibold text-gray-900">Experience</h6>
              <ul className="mt-2 divide-y divide-gray-200">
                {userData?.userInfo?.experience?.map((exp, index) => (
                  <li key={index} className="py-2">
                    <p className="text-md text-gray-700">
                      {exp.position} at {exp.company}, {exp.years} years
                    </p>
                  </li>
                ))}
              </ul>
            </div>
            <div className="mb-8">
              <h6 className="text-xl font-semibold text-gray-900">Contact Details</h6>
              <p className="text-md text-gray-700">Email: {userData?.email}</p>
              <p className="text-md text-gray-700">Phone: {userData?.userInfo?.phone}</p>
              <p className="text-md text-gray-700">LinkedIn: {userData?.userInfo?.linkedInProfile}</p>
              <p className="text-md text-gray-700">GitHub: {userData?.userInfo?.githubProfile}</p>
              {userData?.userInfo?.website && <p className="text-md text-gray-700">Website: {userData?.userInfo?.website}</p>}
            </div>
            <div className="mb-8">
              <h6 className="text-xl font-semibold text-gray-900">Location</h6>
              <p className="text-md text-gray-700">{userData?.userInfo?.address}, {userData?.userInfo?.city}, {userData?.userInfo?.state}, {userData?.userInfo?.country}, {userData?.userInfo?.postalCode}</p>
            </div>
            <div className="mb-8">
              <h6 className="text-xl font-semibold text-gray-900">Skills</h6>
              <ul className="mt-2 flex flex-wrap justify-center gap-2">
                {userData?.userInfo?.skills?.map((skill, index) => (
                  <li key={index} className="bg-blue-100 text-blue-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded">
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      ) : (
        <div className="w-full relative max-w-2xl mx-auto bg-white border border-gray-300 rounded-lg shadow-lg overflow-hidden">
          <div className="bg-gradient-to-r from-blue-700 to-purple-600 h-40"></div>
          <div className="relative -mt-20 flex flex-col items-center pb-10">
            <img
              className="w-36 h-36 mb-3 rounded-full border-4 border-white shadow-lg"
              src="https://via.placeholder.com/150"
              alt="Company Logo"
            />
            <button onClick={() => setUpdateModal(userData)} className="absolute right-4 top-24 bg-blue-500 p-2 rounded-md text-white">
              Update
            </button>
            <h5 className="mb-1 text-3xl font-bold text-gray-900">{userData?.about?.title}</h5>
            <span className="text-md text-gray-500">{userData?.about?.industry}</span>
            <div className="mt-3 flex space-x-4">
              <a href={userData?.about?.website} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-500 hover:text-blue-700 transition duration-300">
                Visit Website
              </a>
            </div>
          </div>
          <div className="px-8">
            <div className="mb-8">
              <h6 className="text-xl font-semibold text-gray-900">About Us</h6>
              <p className="mt-2 text-md text-gray-700">{userData?.about?.desc}</p>
            </div>
            <div className="mb-8">
              <h6 className="text-xl font-semibold text-gray-900">Contact Details</h6>
              <p className="text-md text-gray-700">Email: {userData?.email}</p>
              <p className="text-md text-gray-700">Phone: {userData?.about?.phone}</p>
            </div>
            <div className="mb-8">
              <h6 className="text-xl font-semibold text-gray-900">Location</h6>
              <p className="text-md text-gray-700">{userData?.about?.address}</p>
            </div>
            <div className="mb-8">
              <h6 className="text-xl font-semibold text-gray-900">Jobs Posted</h6>
              <ul className="mt-2 divide-y divide-gray-200">
                {userData?.jobs?.map((job, index) => (
                  <li key={index} className="py-2">
                    <p className="text-md text-gray-700">{job.title}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      <Modal
        isOpen={!!updateModal}
        onRequestClose={closeModal}
        contentLabel="Update Information Modal"
        ariaHideApp={false}
        className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg"
      >
        <h2 className="text-xl font-semibold mb-4">Update Information</h2>
        {isUser ? (
          <>
            <label className="block mb-2 text-sm font-medium text-gray-900">
              Name:
              <input
                type="text"
                name="name"
                value={updateModal?.name || ""}
                onChange={handleInputChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </label>
            <label className="block mb-2 text-sm font-medium text-gray-900">
              Email:
              <input
                type="text"
                name="email"
                value={updateModal?.email || ""}
                onChange={handleInputChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </label>
            <label className="block mb-2 text-sm font-medium text-gray-900">
              Phone:
              <input
                type="text"
                name="phone"
                value={updateModal?.userInfo?.phone || ""}
                onChange={handleInputChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </label>
          </>
        ) : (
          <>
            <label className="block mb-2 text-sm font-medium text-gray-900">
              Company Name:
              <input
                type="text"
                name="title"
                value={updateModal?.about?.title || ""}
                onChange={handleInputChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </label>
            <label className="block mb-2 text-sm font-medium text-gray-900">
              Industry:
              <input
                type="text"
                name="industry"
                value={updateModal?.about?.industry || ""}
                onChange={handleInputChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </label>
            <label className="block mb-2 text-sm font-medium text-gray-900">
              Website:
              <input
                type="text"
                name="website"
                value={updateModal?.about?.website || ""}
                onChange={handleInputChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </label>
            <label className="block mb-2 text-sm font-medium text-gray-900">
              Description:
              <textarea
                name="description"
                value={updateModal?.about?.desc || ""}
                onChange={handleInputChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              ></textarea>
            </label>
          </>
        )}
        <div className="flex justify-end space-x-4 mt-4">
          <button onClick={closeModal} className="bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600">
            Cancel
          </button>
          <button onClick={handleSave} className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600">
            Save
          </button>
        </div>
      </Modal>
    </>
  );
};

export default Profile;

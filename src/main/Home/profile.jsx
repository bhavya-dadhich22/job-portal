const Profile = () => {
    return (
      <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow">
        {/* Header Section */}
        <div className="flex justify-end px-4 pt-4">
          <button
            id="dropdownButton"
            data-dropdown-toggle="dropdown"
            className="inline-block text-gray-500  hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200  rounded-lg text-sm p-1.5"
            type="button"
          >
            <span className="sr-only">Open dropdown</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 16 3"
            >
              <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z" />
            </svg>
          </button>
          {/* Dropdown menu */}
          <div
            id="dropdown"
            className="z-10 hidden text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow w-44 "
          >
            <ul className="py-2" aria-labelledby="dropdownButton">
              <li>
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 "
                >
                  Edit
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Export Data
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                >
                  Delete
                </a>
              </li>
            </ul>
          </div>
        </div>
  
        {/* Profile Content */}
        <div className="flex flex-col items-center pb-10">
          <img
            className="w-24 h-24 mb-3 rounded-full shadow-lg"
            src="/docs/images/people/profile-picture-3.jpg"
            alt="Bonnie image"
          />
          <h5 className="mb-1 text-xl font-medium text-gray-900 ">
            Bonnie Green
          </h5>
          <span className="text-sm text-gray-500 ">
            Visual Designer
          </span>
  
          {/* Add Education Section */}
          <div className="mt-6">
            <h6 className="text-lg font-medium text-gray-900 ">
              Education
            </h6>
            <ul className="divide-y divide-gray-200 ">
              {/* Education items will go here */}
              <li className="py-2">
                <p className="text-sm text-gray-700 ">
                  B.A. in Graphic Design, University of Example, 2015
                </p>
              </li>
            </ul>
            {/* Add Education Button */}
            <button className="mt-2 text-sm text-blue-700 hover:underline focus:outline-none">
              Add Education
            </button>
          </div>
  
          {/* Add Experience Section */}
          <div className="mt-6">
            <h6 className="text-lg font-medium text-gray-900  mb-2">
              Experience
            </h6>
            <ul className="divide-y divide-gray-200 ">
              <li className="py-2">
                <p className="text-sm text-gray-700 ">
                  Senior UI/UX Designer at Company X, 2018 - Present
                </p>
              </li>
            </ul>
            <button className="mt-2 text-sm text-blue-700 hover:underline focus:outline-none">
              Add Experience
            </button>
          </div>
          <div className="mt-6">
            <h6 className="text-lg font-medium text-gray-900  mb-2">
              Company Information
            </h6>
            <p className="text-sm text-gray-700 ">
              Company Name: Example Corp
            </p>
            <p className="text-sm text-gray-700">
              Position: Visual Designer
            </p>
            <p className="text-sm text-gray-700 ">
              Location: New York, NY
            </p>
          </div>
          <div className="mt-6">
            <h6 className="text-lg font-medium text-gray-900 mb-2">
              Contact Details
            </h6>
            <p className="text-sm text-gray-700 ">
              Email: bonnie.green@example.com
            </p>
            <p className="text-sm text-gray-700 ">
              Phone: +1 (123) 456-7890
            </p>
            <p className="text-sm text-gray-700 ">
              LinkedIn: linkedin.com/bonniegreen
            </p>
          </div>
  
          {/* Buttons Section */}
          
        </div>
      </div>
    );
  };
  
  export default Profile;
  
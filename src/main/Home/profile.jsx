//import React from "react";

const Profile = () => {
  return (
    <div className="w-full max-w-2xl mx-auto bg-white border border-gray-300 rounded-lg shadow-lg overflow-hidden">
      {/* Profile Header */}
      <div className="bg-gradient-to-r from-blue-700 to-purple-600 h-40"></div>
      <div className="relative -mt-20 flex flex-col items-center pb-10">
        <img
          className="w-36 h-36 mb-3 rounded-full border-4 border-white shadow-lg"
          src="/docs/images/people/profile-picture-3.jpg"
          alt="Bonnie image"
        />
        <h5 className="mb-1 text-3xl font-bold text-gray-900">Bonnie Green</h5>
        <span className="text-md text-gray-500">Visual Designer</span>
        <div className="mt-3 flex space-x-4">
          <a
            href="#"
            className="text-sm text-black hover:text-blue-700 transition duration-300"
          >
            Contact
          </a>
          <a
            href="#"
            className="text-sm text-black hover:text-blue-700 transition duration-300"
          >
            Message
          </a>
        </div>
      </div>

      {/* Profile Content */}
      <div className="px-8">
        {/* Add Education Section */}
        <div className="mb-8">
          <h6 className="text-xl font-semibold text-gray-900">Education</h6>
          <ul className="mt-2 divide-y divide-gray-200">
            <li className="py-2">
              <p className="text-md text-gray-700">
                B.A. in Graphic Design, University of Example, 2015
              </p>
            </li>
          </ul>
         
        </div>

        {/* Add Experience Section */}
        <div className="mb-8">
          <h6 className="text-xl font-semibold text-gray-900">Experience</h6>
          <ul className="mt-2 divide-y divide-gray-200">
            <li className="py-2">
              <p className="text-md text-gray-700">
                Senior UI/UX Designer at Company X, 2018 - Present
              </p>
            </li>
          </ul>
          
        </div>

        {/* Company Information Section */}
        <div className="mb-8">
          <h6 className="text-xl font-semibold text-gray-900">Company Information</h6>
          <p className="text-md text-gray-700">Company Name: Example Corp</p>
          <p className="text-md text-gray-700">Position: Visual Designer</p>
          <p className="text-md text-gray-700">Location: New York, NY</p>
        </div>

        {/* Contact Details Section */}
        <div className="mb-8">
          <h6 className="text-xl font-semibold text-gray-900">Contact Details</h6>
          <p className="text-md text-gray-700">Email: bonnie.green@example.com</p>
          <p className="text-md text-gray-700">Phone: +1 (123) 456-7890</p>
          <p className="text-md text-gray-700">LinkedIn: linkedin.com/bonniegreen</p>
        </div>
      </div>

      {/* Profile Footer */}
      
    </div>
  );
};

export default Profile;

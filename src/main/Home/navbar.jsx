import  { useState } from 'react';
// import { FaGithub } from 'react-icons/fa';

function Navbar() {
  // Placeholder for authentication state
  const [isLoggedIn, ] = useState(false);

  return (
    <header className="flex items-center justify-between w-full text-white  py-4 px-6">
      <div className="flex items-center gap-4">
        <div className="text-3xl font-bold">JobHive</div>
        <div className="text-3xl font-bold">
          <a
            target="_blank"
            href="https://github.com/vrindaBindal2712/job-portal"
            rel="noreferrer"
          >
            {/* <FaGithub size={20} /> */}
          </a>
        </div>
      </div>
      <div className="flex items-center justify-between w-full">
        <div className="flex-1 md:flex md:items-center md:gap-12">
          <a className="block text-blue-600" href="#">
            <span className="sr-only">Home</span>
            
          </a>
        </div> 

        <nav aria-label="Global" className="hidden md:block">
          <ul className="flex items-center gap-6 text-sm">
            <li>
              <a
                className="text-white transition hover:text-white"
                href="#"
              >
                About
              </a>
            </li>
            <li>
              <a
                className="text-white transition hover:text-white"
                href="#"
              >
                Careers
              </a>
            </li>
            <li>
              <a
                className="text-white transition hover:text-white"
                href="#"
              >
                History
              </a>
            </li>
            <li>
              <a
                className="text-white transition hover:text-white"
                href="#"
              >
                Services
              </a>
            </li>
            <li>
              <a
                className="text-white transition hover:text-white"
                href="#"
              >
                Projects
              </a>
            </li>
            <li>
              
            </li>
          </ul>
        </nav>

        {!isLoggedIn && (
          <div className="flex items-center gap-4">
            <div className="sm:flex sm:gap-4">
              <a
                className="rounded-md bg-blue-500 px-5 py-2.5 text-sm font-medium text-white shadow"
                href="/login"
              >
                Login
              </a>

              <div className="hidden sm:flex">
                <a
                  className="rounded-md bg-gray-100 px-5 py-2.5 text-sm font-medium text-black"
                  href="/signup"
                >
                  Register
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

export default Navbar;

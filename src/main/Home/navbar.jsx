
import { useAuthUser } from '../zustand/useAuth';
import toast from 'react-hot-toast';
import { Link } from "react-router-dom";
import { useCookies } from 'react-cookie';



function Navbar() {
  const { AuthUser } = useAuthUser()

  const [cookies, setCookie, removeCookie] = useCookies(['token']);

  const Logout = () => {
    removeCookie('token');
    toast.success('Logout Success');
    setTimeout(() => {
      window.location.href = '/';
    }, 1000);
  }

  return (
    <header className="flex items-center justify-between w-full text-black  py-4 px-6">
      <div className="flex items-center gap-4">
        <Link to={AuthUser?.type == 'company' ? '/dashboard' : '/'} className="text-3xl font-bold">JobHive</Link>

      </div>
      <div className="flex items-center justify-between w-full">
        <div className="flex-1 md:flex md:items-center md:gap-12">
          <a className="block text-blue-600" href="/">
            <span className="sr-only">Home</span>

          </a>
        </div>

        <nav aria-label="Global" className="hidden md:block mx-10">
          <ul className="flex items-center gap-6 text-sm">
            {
              AuthUser?.type == 'user' &&
              <li>
                <Link
                  className="text-black transition hover:text-black"
                  to="/user/applied"
                >
                  Applied
                </Link>
              </li>
            }
            {
              AuthUser?.type == 'company' &&
              <li>
                <Link
                  className="text-black transition hover:text-black"
                  to="/dashboard"
                >
                  Dashboard
                </Link>
              </li>
            }
            {
              AuthUser?.type == 'company' &&
              <>
                <li>
                  <Link
                    className="text-black transition hover:text-black"
                    to="/add-job"
                  >
                    Add Job
                  </Link>
                </li>
                <li>
                  <Link
                    className="text-black transition hover:text-black"
                    to="/applications"
                  >
                    View Applications
                  </Link>
                </li>
              </>
            }
            {
              AuthUser &&
              <li>
                <Link
                  className="text-black transition hover:text-black"
                  to="/profile"
                >
                  Profile
                </Link>
              </li>
            }

          </ul>
        </nav>

        {!AuthUser ? (
          <div className="flex items-center gap-4">
            <div className="sm:flex sm:gap-4">
              <a
                className="rounded-md bg-blue-700 px-5 text-white py-2.5 text-sm font-medium  shadow"
                href="/login"
              >
                Login
              </a>

              <div className="hidden sm:flex">
                <a
                  className="rounded-md bg-gray-100  px-5 py-2.5 text-sm font-medium "
                  href="/signup"
                >
                  Register
                </a>
              </div>
            </div>
          </div>
        ) :
          <button
            onClick={Logout}
            className="rounded-md bg-gray-100 px-5  py-2.5 text-sm  "
          >
            Logout
          </button>

        }
      </div>
    </header>
  );
}

export default Navbar;

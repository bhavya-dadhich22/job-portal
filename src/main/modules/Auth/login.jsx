import { useState } from "react";
import toast from "react-hot-toast";
import Toggle from "../../components/widgets/toggle";
import useServer from '../../hooks/useServer'

const Login = () => {
  const Server = useServer();
  const [loader, setLoader] = useState(false);
  const [isUser, setIsUser] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let valid = true;

    if (!email) {
      setEmailError("Email is required.");
      valid = false;
    } else if (!validateEmail(email)) {
      setEmailError("Please enter a valid email address.");
      valid = false;
    } else {
      setEmailError("");
    }

    if (!password) {
      setPasswordError("Password is required.");
      valid = false;
    } else {
      setPasswordError("");
    }

    if (valid) {

      try {
        setLoader(true);
        const type = isUser ? "user" : "company";

        const res = await fetch(`${Server}/auth/login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password, type })
          , credentials: 'include',
        });
        const resData = await res.json();
        const { error, message, type: userType } = resData;
        if (error) {
          return toast.error(message);
        }

        toast.success(message);
        setTimeout(() => {
          userType == 'company' ?
            window.location.href = '/dashboard' :
            window.location.href = '/';
        }, 2000);
      } catch (error) {
        if (error?.response?.data?.message) {
          return toast.error(error?.response?.data?.message);
        } else {
          return toast.error("Login failed");
        }
      } finally {
        setLoader(false);
      }
    }
  };

  return (
    <div>
      <Toggle setIsUser={setIsUser} isUser={isUser} />
      <div className="flex items-center justify-center pt-20 pb-20">
        <div className="max-w-md w-full p-8 rounded-lg shadow-lg">
          <h1 className="text-3xl font-bold text-center text-white mb-8">
            Login
          </h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-black-300"
              >
                Email
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <input
                  type="email"
                  id="email"
                  className="w-full px-4 py-2 border rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                {emailError && (
                  <p className="text-red-500 text-sm mt-1">{emailError}</p>
                )}
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-black-300"
              >
                Password
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <input
                  type="password"
                  id="password"
                  className="w-full px-4 py-2 border rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                {passwordError && (
                  <p className="text-red-500 text-sm mt-1">{passwordError}</p>
                )}
              </div>
            </div>

            <div className="flex items-center justify-between text-black-300">
              <p className="text-sm">
                No account?
                <a
                  className="ml-1 underline text-blue-500 hover:text-blue-700"
                  href="./signup"
                >
                  Signup
                </a>
              </p>
            </div>

            <button
              type="submit"
              className="w-full py-2 px-4 bg-blue-500 hover:bg-blue-700 text-white font-bold rounded-lg transition duration-200 flex justify-center"
            >
              {loader ? (
                <h1 className="h-5 w-5 border-2 border-t-transparent border-white animate-spin rounded-full"></h1>
              ) : (
                "login"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;

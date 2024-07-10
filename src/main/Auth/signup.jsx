import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import Toggle from "../components/widgets/toggle";

const Signup = () => {
  const [loader, setLoader] = useState(false);
  const [isUser, setIsUser] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone) => {
    const phoneRegex = /^\d{10}$/;
    return phoneRegex.test(phone);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let valid = true;

    if (!name) {
      setNameError("Name is required.");
      valid = false;
    } else {
      setNameError("");
    }

    if (!email) {
      setEmailError("Email is required.");
      valid = false;
    } else if (!validateEmail(email)) {
      setEmailError("Please enter a valid email address.");
      valid = false;
    } else {
      setEmailError("");
    }

    if (!phone) {
      setPhoneError("Phone number is required.");
      valid = false;
    } else if (!validatePhone(phone)) {
      setPhoneError("Please enter a valid phone number.");
      valid = false;
    } else {
      setPhoneError("");
    }

    if (!password) {
      setPasswordError("Password is required.");
      valid = false;
    } else {
      setPasswordError("");
    }

    if (valid) {
    
      try {
        const type = isUser ? "user" : "company";
        if (!email || !password || !type || !name)
          return console.log("All field smandam");
        setLoader(true);
        console.log(type)
        const res = await axios.post(
          "https://1ob.vercel.app/api/auth/register",
          { name, type, email, password }
        );
        const { error, message } = res.data;
        if (error) {
          return toast.error(message);
        }
        toast.success(message);
      } catch (error) {
        if (error?.response?.data?.message) {
          return toast.error(error?.response?.data?.message);
        } else {
          return toast.error("Reg failed");
        }
      } finally {
        setLoader(false);
      }
    }
  };

  return (
    <div>
      <Toggle setIsUser={setIsUser} isUser={isUser} />
      <div className="flex items-center justify-center ">
        <div className="max-w-md w-full p-8 rounded-lg shadow-lg">
          <h1 className="text-3xl font-bold text-center text-white mb-8">
            Signup
          </h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-black-300"
              >
                Name
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <input
                  type="text"
                  id="name"
                  className="w-full px-4 py-2 border rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                {nameError && (
                  <p className="text-red-500 text-sm mt-1">{nameError}</p>
                )}
              </div>
            </div>

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
                htmlFor="phone"
                className="block text-sm font-medium text-black-300"
              >
                Phone Number
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <input
                  type="tel"
                  id="phone"
                  className="w-full px-4 py-2 border  rounded-lg  text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter phone number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
                {phoneError && (
                  <p className="text-red-500 text-sm mt-1">{phoneError}</p>
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
                Already have an account?
                <a
                  className="ml-1 underline text-blue-500 hover:text-blue-700"
                  href="./login"
                >
                  Login
                </a>
              </p>
            </div>

            <button
              type="submit"
              className="w-full   flex justify-center py-3 px-4 bg-blue-500 hover:bg-blue-700 text-white font-bold rounded-lg transition duration-200"
            >
              {loader ? (
                <h1 className=" h-5 w-5  border-2 border-t-transparent border-white animate-spin rounded-full"></h1>
              ) : (
                "Signup"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
export default Signup;

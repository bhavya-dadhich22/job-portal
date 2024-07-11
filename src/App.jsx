import { BrowserRouter, Route, Routes } from "react-router-dom";

import { Toaster } from "react-hot-toast";
import Navbar from "./main/Home/navbar";
import Home from "./main/Home/home";
import Login from "./main/modules/Auth/login";
import Signup from "./main/modules/Auth/signup";
import Footer from "./main/Home/footer";
import Profile from "./main/Home/profile";
import AppliedJobsPage from "./main/modules/User/jobs-applied";
import JobsPostedPage from "./main/modules/Emp/jobs-posted";
import JobDetails from "./main/Home/job-details";
import { useCallback, useEffect } from "react";
import { useAuthUser } from "./main/zustand/useAuth";
import useServer from "./main/hooks/useServer";
import Notfound from '../src/main/components/404'
import Dashboard from './main/modules/Emp/dashboard'
import CreateJobForm from "./main/modules/Emp/add-job";
import Applications from './main/modules/Emp/applications'
import AboutApplication from './main/modules/Emp/appli-about'
import { useCookies } from "react-cookie";
import useToken from "./main/hooks/useToken";


const App = () => {
  const { setAuthUser, AuthUser } = useAuthUser();
  const Server = useServer();
  const token = useToken();


  const fetchData = useCallback(async () => {

    const res = await fetch(`${Server}/profile`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({token}),
      withCredentials: true,
    });
    const resData = await res.json();
    const { data } = resData;
    if (data)
      setAuthUser(data);

  }, [Server, setAuthUser]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);



  return (
    <>
      <BrowserRouter>
        <Toaster
          position="bottom-center"
          toastOptions={{
            className: '  mb-5',
            style: {
              background: '#363636',
              color: '#fff',
            },
          }}
        />
        <Navbar />
        <Routes>
          {
            AuthUser?.type != 'company' &&
            <Route path="/" element={<Home />} />
          }
          {

            !AuthUser &&
            <>
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
            </>
          }
          {
            AuthUser?.type == 'company' &&
            <>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/add-job" element={<CreateJobForm />} />
              <Route path="/applications" element={<Applications />} />
              <Route path="/applications/details" element={<AboutApplication />} />

            </>
          }

          <Route path="/profile" element={<Profile />} />
          <Route path="/user/applied" element={<AppliedJobsPage />} />
          <Route path="/emp/jobs" element={<JobsPostedPage />} />
          <Route path="/job/:jobId" element={<JobDetails />} />
          <Route path="/*" element={<Notfound />} />
        </Routes>
        <Footer />
      </BrowserRouter >
    </>
  );
};

export default App;


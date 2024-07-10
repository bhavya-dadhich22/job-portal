import { BrowserRouter, Route, Routes } from "react-router-dom";

import { Toaster } from "react-hot-toast";
import Navbar from "./main/Home/navbar";
import Home from "./main/Home/home";
import Login from "./main/Auth/login";
import Signup from "./main/Auth/signup";
import Footer from "./main/Home/footer";
import Profile from "./main/Home/profile";
import AppliedJobsPage from "./main/User/jobs-applied";
import JobsPostedPage from "./main/Emp/jobs-posted";
import JobDetails from "./main/Home/job-details";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Toaster />
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/profile" element={<Profile />} />
          {/* profile page for both same desgin no need of seperate designs...i wil add dynamic data */}
          <Route path="/user/applied" element={<AppliedJobsPage />} />
          {/* for users to see list of jobs they applied */}
          <Route path="/emp/jobs" element={<JobsPostedPage />} />
          <Route path="/job/:jobId" element={<JobDetails />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
};

export default App;


{/* 1.Done
2.u need to design 2nd one..just do some desgin for adding edution exp etc..also create for company information and
contact details. just add field i wil chnage later..
3.almost done..add the fields they mentioned in 3rd one-->
4.done may add some filter u can add copy paste or sefin uselef

5.1 Need to create page whre it desiply about a jonb like info company details more deatils...Will redirct to this page when user click leanr more on application...
5.2 add table may be same as provios and update fields..y like usernmae ,user exp, buttons  reject accept applciation....
6.done ...will finsih at last....continue till then.. ill close ok
*/}
// {/* Make desgin responsive ..i wont do this ....?not able to i tried a lot ...its css or tailwincd css..i used css but still i was not working for it idk why 
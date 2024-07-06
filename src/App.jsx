import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./main/components/Home/home";
import Login from "./main/components/Auth/login";
import Signup from "./main/components/Auth/signup";
import { Toaster } from "react-hot-toast";
const App = () => {
  return (
    <>
      <BrowserRouter>
          <Toaster />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;

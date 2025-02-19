import { Route, Routes } from "react-router";
import Home from "../Home";
import Root from "../layout/Root";
import Login from "../Pages/Authentication/Login";
import SignUp from "../Pages/Authentication/SignUp";
import About from "../Pages/Home/About";
import Contact from "../Pages/Home/Contact";

const HomeRoute = () => {
  return (
    <Routes>
      <Route element={<Root />}>
        <Route index element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
      </Route>
    </Routes>
  );
};

export default HomeRoute;

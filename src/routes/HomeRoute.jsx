import { Route, Routes } from "react-router";
import Home from "../Home";
import About from "../Pages/Home/About";
import Contact from "../Pages/Home/Contact";
import Root from "../layout/Root";

const HomeRoute = () => {
  return (
    <Routes>
      <Route element={<Root />}>
        <Route index element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Route>
    </Routes>
  );
};

export default HomeRoute;

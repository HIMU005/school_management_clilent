import { Route, Routes } from "react-router";
import Home from "../Home";
import About from "../components/home/About";
import Contact from "../components/home/Contact";
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

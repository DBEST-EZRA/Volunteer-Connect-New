import "./App.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./components/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AboutPage from "./components/AboutPage";
import Properties from "./components/Properties";
import Contact from "./components/Contact";
import NotFound from "./components/NotFound";
import ServicePage from "./components/ServicePage";
import Blog from "./components/Blog";

function App() {
  return (
    <>
      <Navbar />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/properties" element={<Properties />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/services" element={<ServicePage />} />
          <Route path="/blog" element={<Blog />} />

          {/* 404 Page */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </>
  );
}

export default App;

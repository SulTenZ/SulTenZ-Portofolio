import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./sections/Navbar";
import Footer from "./sections/Footer";
import Home from "./pages/Home";
// import Projects from "./pages/Projects";
import Contacts from "./pages/Contacts";

function App() {
  return (
    <Router>
      <div className="bg-background min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            {/* <Route path="/projects" element={<Projects />} /> */}
            <Route path="/contacts" element={<Contacts />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}
export default App;

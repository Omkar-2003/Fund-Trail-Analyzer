import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { NavBar } from "./componets/NavBar";
import { Banner } from "./componets/Banner";
import { Footer } from "./componets/Footer";
import { LanguageProvider } from "./componets/LanguageContext";
import Analysis from "./componets/Analysis";
import FileTransfer from "./componets/FileTransfer";
import Mlpart from "./componets/Mlpart";
import About from "./componets/About";
import Contact from "./componets/Contact";
import Report from "./componets/Report";
import Login from "./componets/Login";
import Signup from "./componets/Signup";
import ReportHistory from "./componets/ReportHistory";
import Upload from "./componets/Upload";
import File from "./componets/File";
import TrailPage from "./componets/ml";
import Repo from "./componets/trail-report";

const App = () => {
  return (
    <Router>
      <LanguageProvider>
        <div className="App">
          <NavBar />
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Routes>

          
          <Routes>
            <Route path="/filetransfer" element={<FileTransfer />} />
            <Route path="/home" element={<Banner />} />
            <Route path="/about" element={<About />} />
            <Route path="/analysis" element={<Analysis />} />
            <Route path="/mlpart" element={<Mlpart />} />
            <Route path="/contact" element={<Contact />} />
            <Route exact path="/report" element={<Report />} />
            <Route exact path="/reporthistory" element={<ReportHistory />} />
            <Route exact path="/ml" element={<TrailPage />} />
            <Route exact path="/trailhistory" element={<Repo />} />
            <Route exact path="/upload" element={<Upload />} />
            <Route exact path="/file" element={<File />} />
          </Routes>
          <Footer />
        </div>
      </LanguageProvider>
    </Router>
  );
};

export default App;

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"; // Bootstrap styles
import NavbarComponent from "./components/NavbarComponent.js"; // Navbar component
import Dashboard from "./pages/Dashboard.js"; // Dashboard page
import Upload from "./pages/Upload.js"; // Upload page
import Search from "./pages/Search.js"; // Search page
import Login from "./pages/Login.js"; // Login page
import Footer from "./components/FooterComponent.js"; // Footer component
import { ThemeProvider } from "./components/ThemeContext.js"; // Theme provider
import "./index.css"; // Import global CSS for light/dark theme
import "bootstrap/dist/css/bootstrap.min.css";

const App = () => {
  return (
    <ThemeProvider>
      <Router>
        <NavbarComponent />
        <main>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/login" element={<Login />} />
            <Route path="/upload" element={<Upload />} />
            <Route path="/search" element={<Search />} />
          </Routes>
        </main>
      </Router>
      <Footer />
    </ThemeProvider>
  );
};

export default App;

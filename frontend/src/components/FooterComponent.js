import React from "react";

const Footer = () => {
  return (
    <footer className="bg-dark text-white py-2 mt-5">
      <div className="container">
        <div className="row">
          {/* Left section: Links */}
          <div className="col-md-4 text-center">
            <div className="d-flex justify-content-center">
              <a href="/" className="text-white mx-3 hover-underline-animation">
                Home
              </a>
              <a
                href="/about"
                className="text-white mx-3 hover-underline-animation"
              >
                About
              </a>
              <a
                href="/contact"
                className="text-white mx-3 hover-underline-animation"
              >
                Contact
              </a>
            </div>
          </div>

          {/* Mid section: About */}
          <div className="col-md-4 text-center text-md-left">
            <p className="mb-0">
              © 2025 Hornor Document Manager. All rights reserved.
            </p>
          </div>

          {/* Right section: Social Media */}
          <div className="col-md-4 text-center text-md-right">
            <div className="d-flex justify-content-center justify-content-md-end">
              <a
                href="https://facebook.com"
                className="text-white mx-3 hover-underline-animation"
                target="_blank"
                rel="noopener noreferrer"
              >
                Facebook
              </a>
              <a
                href="https://twitter.com"
                className="text-white mx-3 hover-underline-animation"
                target="_blank"
                rel="noopener noreferrer"
              >
                Twitter
              </a>
              <a
                href="https://linkedin.com"
                className="text-white mx-3 hover-underline-animation"
                target="_blank"
                rel="noopener noreferrer"
              >
                LinkedIn
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

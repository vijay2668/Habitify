import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <>
      <footer className="footer p-10 bg-neutral text-neutral-content mt-28">
        <div>
          <span className="footer-title">Available On</span>
          <Link className="link link-hover text-white" to="/signup">
              Web
          </Link>
        </div>
        <div>
          <span className="footer-title">Having issues?</span>
          <Link className="link link-hover text-white" to="mailto:vijay.rathod2668@gmail.com?subject=Issue%20with%20Habitify">
              Email us
          </Link>
          <Link className="link link-hover text-white" to="mailto:vijay.rathod2668@gmail.com?subject=Feedback%20for%Habitify">
              Feedback?
          </Link>
        </div>
      </footer>
    </>
  );
};

export default Footer;

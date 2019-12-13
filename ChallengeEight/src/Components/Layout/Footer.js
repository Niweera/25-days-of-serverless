import React from "react";

export default function Footer() {
  return (
    <footer className="footer fixed-bottom mb-1">
      <div className="row">
        <div className="col-xl-1 col-lg-1 col-md-1 col-sm-5 col-5 text-left">
          <ul className="social-network social-circle text-center">
            <li>
              <a
                href="https://www.facebook.com"
                rel="noopener noreferrer"
                target="_blank"
                className="icoFacebook"
                title="Facebook"
              >
                <i className="fab fa-facebook-f"></i>
              </a>
            </li>
          </ul>
        </div>
        <div className="col-xl-10 col-lg-10 col-md-10 col-sm-2 col-2"></div>
        <div className="col-xl-1 col-lg-1 col-md-1 col-sm-5 col-5 text-right">
          <ul className="social-network social-circle text-center">
            <li>
              <a
                href="https://twitter.com"
                rel="noopener noreferrer"
                target="_blank"
                className="icoTwitter"
                title="Twitter"
              >
                <i className="fab fa-twitter"></i>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}

import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faWhatsapp,
  faFacebookF,
  faLinkedinIn,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import HospitalForm from "./pages/Hospital_form"; // Ensure this matches the file name
import Donneur_form from "./pages/Donneur_form";
import BloodStock from "./Admin/BloodStock";
import BloodDonation from "./Admin/BloodDonation";
import Requests from "./Admin/Requests";
import DonateBlood from "./Donors/DonateBlood";
import DonorBloodDonation from "./Donors/DonorBloodDonation";
import Contact from "./pages/Contact";
import AboutUs from "./pages/AboutUs";
import Blog1 from "./pages/Blog1";
import Blog2 from "./pages/Blog2";
import HopitalDonateBlood from "./Hopital/HopitalDonateBlood";
import HopitalRequestBlood from "./Hopital/HopitalRequestBlood";
import HopitalBloodDonationRequestHistory from "./Hopital/HopitalBloodDonationRequestHistory";
import HopitalBloodDonationHistory from "./Hopital/HopitalBloodDonationHistory";
import HospitalDonation from "./Admin/HospitalDonation";
import ContactUs from "./Admin/ContactUs";

function App() {
  return (
    <div className="container">
      <BrowserRouter>
        <Routes>
          <Route index element={<Main />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/Signup" element={<Signup />}></Route>
          <Route path="/Contact" element={<Contact />}></Route>
          <Route path="/AboutUs" element={<AboutUs />}></Route>
          <Route path="/Blog1" element={<Blog1 />}></Route>{" "}
          <Route path="/Blog2" element={<Blog2 />}></Route>{" "}
          <Route path="/hospital_form" element={<HospitalForm />}></Route>{" "}
          <Route path="/donneur_form" element={<Donneur_form />}></Route>{" "}
          <Route path="/BloodStock" element={<BloodStock />}></Route>{" "}
          <Route path="/BloodDonation" element={<BloodDonation />}></Route>{" "}
          <Route path="/HospitalDonation" element={<HospitalDonation />}></Route>{" "}
          <Route path="/ContactUs" element={<ContactUs />}></Route>{" "}
          
          <Route path="/Requests" element={<Requests />}></Route>{" "}
          <Route path="/DonateBlood" element={<DonateBlood />}></Route>{" "}
          <Route
            path="/DonorBloodDonation"
            element={<DonorBloodDonation />}
          ></Route>{" "}
          <Route
            path="/HopitalDonateBlood"
            element={<HopitalDonateBlood />}
          ></Route>{" "}
          <Route
            path="/HopitalRequestBlood"
            element={<HopitalRequestBlood />}
          ></Route>{" "}
          <Route
            path="/HopitalBloodDonationRequestHistory"
            element={<HopitalBloodDonationRequestHistory />}
          ></Route>{" "}
          <Route
            path="/HopitalBloodDonationHistory"
            element={<HopitalBloodDonationHistory />}
          ></Route>{" "}
          {/* lowercase */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export function Header() {
  return (
    <header>
      <div className="header">
        <div className="header-contact">
          <ul className="con1">
            <li>
              <FontAwesomeIcon
                icon={faWhatsapp}
                style={{ height: "30px", marginRight: "5px", color: "#BB2D2B" }}
              />
              <span>+216 72 500 500</span>
            </li>
            <li>
              <img src="Mail.png" alt="Mail" className="header-contact-img" />
              <span>BloodConnect@gmail.com</span>
            </li>
          </ul>
          <ul className="con2">
            <li>Follow Us</li>
            <li>|</li>
            <li>
              <a
                href="https://www.facebook.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FontAwesomeIcon
                  icon={faFacebookF}
                  style={{ height: "20px", color: "#BB2D2B" }}
                />
              </a>
              <a
                href="https://www.linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FontAwesomeIcon
                  icon={faLinkedinIn}
                  style={{ height: "20px", color: "#BB2D2B" }}
                />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FontAwesomeIcon
                  icon={faTwitter}
                  style={{ height: "20px", color: "#BB2D2B" }}
                />
              </a>
            </li>
          </ul>
        </div>
      </div>
      <Nav />
    </header>
  );
}

export function Main() {
  return (
    <>
      <Header />
      <div className="container">
        <div className="main">
          <div className="main-left">
            <h1>
              Let's <br />
              Donate
            </h1>
            <p>Join us in making a difference</p>
            <span>
              <button id="d">
                <Link to="/Login">Donate Now</Link>
              </button>
              <button id="rm">
                <Link to="#readmore">Read More</Link>
              </button>
            </span>
          </div>
          <div className="main-right">
            <img src="/main_img.png" alt="main_img" />
          </div>
        </div>
      </div>
    </>
  );
}

export function Nav() {
  return (
    <div className="container">
      <div className="nav">
        <img src="/logo2.png" alt="logo" />
        <ul>
          <li className="nav-link">
            <Link to="/">Home</Link>
          </li>
          <li className="nav-link">
            <Link to="/AboutUs">About Us</Link>
          </li>

          <li className="nav-link">
            <Link to="/contact">Contact Us</Link>
          </li>
          <li className="nav-link">
            <Link to="/Signup">Signup</Link>{" "}
          </li>
          <li className="nav-link">
            <Link to="/login">Login</Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

export function Navlogo() {
  return (
    <div className="nav logohopital">
      <Link to="/">
        <img src="/logo.png" alt="logo" />
      </Link>
    </div>
  );
}

// React v18
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

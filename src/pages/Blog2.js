import React from "react";
import "../index.css"; // Make sure to link the CSS file
import { Nav } from "..";

export default function Blog2() {
  return (
    <>
      <Nav />
      <div className="blog-container">
        <BlogHeader />
        <div className="blog-body">
          <BlogImage />
          <BlogContent />
        </div>
        <BlogFooter />
      </div>
    </>
  );
}

const BlogHeader = () => {
  return (
    <header className="blog-header">
      <h1>Innovating the Future of Blood Donation</h1>
      <p className="author">By Dr. Emily Johnson | November 17, 2024</p>{" "}
      {/* Updated name */}
    </header>
  );
};

const BlogImage = () => {
  return (
    <div className="blog-image">
      <img
        src="/blog2.jpg"
        alt="Innovative Blood Donation"
        className="blog-img"
      />
    </div>
  );
};

const BlogContent = () => {
  return (
    <div className="content">
      <p>
        As we look to the future, innovations in blood donation are becoming
        increasingly important to improve safety, efficiency, and accessibility.
        From new technologies to better ways of managing donations, the field is
        evolving rapidly.
      </p>

      <h2>Innovations in Blood Donation</h2>
      <p>
        Recent advancements in blood donation have been focused on improving
        both the donor and patient experience. Innovations range from mobile
        blood donation clinics to artificial blood substitutes, and even the
        development of blood screening techniques that make donations safer.
      </p>

      <h3>Artificial Blood: The Next Step</h3>
      <p>
        One of the most exciting developments is the research into artificial
        blood substitutes. These synthetic blood products could help address
        shortages and offer new solutions in emergency situations where donor
        blood is not available. While still in development, they have the
        potential to revolutionize the way blood donations are managed.
      </p>

      <h3>Mobile Blood Donation Clinics</h3>
      <p>
        Mobile blood donation clinics are becoming more widespread, making it
        easier for people to donate blood. These mobile units bring the donation
        process directly to communities, eliminating the need for individuals to
        visit a fixed donation center. With more convenient locations and
        flexible hours, these clinics help increase the number of donations.
      </p>

      <h3>Improved Blood Screening Techniques</h3>
      <p>
        Advances in blood screening techniques ensure that donated blood is
        safer than ever. New technologies allow for quicker, more accurate tests
        for a range of infectious diseases. This not only helps protect patients
        but also gives donors peace of mind knowing that their blood is being
        carefully tested before it is used.
      </p>

      <h3>Blood Donation by Genetic Engineering</h3>
      <p>
        Another fascinating development involves genetic engineering, where
        researchers are exploring ways to modify blood types in a lab setting.
        This could lead to the creation of universal donor blood that would work
        for anyone, eliminating the need for blood type matching in
        transfusions.
      </p>

      <h3>The Future is Now</h3>
      <p>
        The future of blood donation is filled with potential. Whether it's
        through cutting-edge technology, improved donation experiences, or
        life-saving substitutes, the innovations on the horizon will not only
        enhance the donation process but save countless lives.
      </p>

      <p>
        Interested in the future of blood donation? Stay informed and get
        involved in the revolution by donating today!
      </p>
    </div>
  );
};

const BlogFooter = () => {
  return (
    <footer className="blog-footer">
      <p>
        Blog by Dr. Emily Johnson, Medical Expert in Blood Donation and
        Healthcare Innovation
      </p>{" "}
      {/* Updated footer author */}
    </footer>
  );
};

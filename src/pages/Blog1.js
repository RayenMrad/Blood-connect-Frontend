import React from "react";
import "../index.css"; // Make sure to link the CSS file
import { Nav } from "..";

export default function Blog1() {
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
      <h1>Can Diabetics Donate Blood?</h1>
      <p className="author">By Dr. Michael Brown | November 17, 2024</p>{" "}
      {/* Updated name to Dr. Michael Brown */}
    </header>
  );
};

const BlogImage = () => {
  return (
    <div className="blog-image">
      <img src="/blog1d.jpg" alt="Blood Donation" className="blog-img" />
    </div>
  );
};

const BlogContent = () => {
  return (
    <div className="content">
      <p>
        November is American Diabetes Month, a time to raise awareness about
        diabetes, which affects over 38 million Americans. One common question
        is whether diabetics can donate blood, and the answer depends on a few
        factors.
      </p>

      <h2>Can Diabetics Donate Blood?</h2>
      <p>
        Diabetics can donate blood as long as their diabetes is well-controlled.
        Blood donation organizations typically require that your blood glucose
        levels are within a healthy range. Generally, a fasting blood glucose
        level between 70-130 mg/dL and a post-meal level below 180 mg/dL are
        acceptable for donation.
      </p>

      <h3>Will my blood sugar level prevent me from donating blood?</h3>
      <p>
        If your blood sugar levels are well-managed and fall within the target
        range specified by your healthcare provider, you should be able to
        donate blood. However, if your levels are excessively high or low, you
        should wait until they are stabilized before donating.
      </p>

      <h3>Type 1 vs Type 2 Diabetes</h3>
      <p>
        Whether you have Type 1 or Type 2 diabetes doesn't impact your ability
        to donate blood, as long as your diabetes is well-controlled and your
        blood glucose levels are stable.
      </p>

      <h3>Preparation Tips for Diabetics</h3>
      <ul>
        <li>
          Ensure that your blood glucose is stable and within range before
          donation.
        </li>
        <li>Stay hydrated in the days leading up to your donation.</li>
        <li>
          Get adequate rest before donating to reduce any potential
          complications.
        </li>
      </ul>

      <h3>Post-Donation Care</h3>
      <p>
        After donating blood, monitor your blood glucose levels. Some
        individuals with Type 1 diabetes may experience slightly elevated
        glucose levels for a few days after donation. Be sure to consume
        adequate iron and fluids to assist your body in recovery.
      </p>

      <p>
        Ready to donate? Make an appointment today at a local donation center
        and contribute to saving lives!
      </p>
    </div>
  );
};

const BlogFooter = () => {
  return (
    <footer className="blog-footer">
      <p>
        Blog by Dr. Michael Brown, Medical Expert in Diabetes and Blood Donation
      </p>{" "}
      {/* Updated footer author */}
    </footer>
  );
};

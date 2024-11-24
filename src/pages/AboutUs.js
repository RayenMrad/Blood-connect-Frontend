import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Nav } from "../index";
import "../index.css";

export default function AboutUs() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      img: "./bldon.jpeg",
      title: "Our Humble Beginnings",
      description:
        "We started with a simple idea and a passion for helping others.",
    },
    {
      img: "/logo.png",
      
      title: "Growing Stronger",
      description:
        "As our mission gained momentum, we expanded to new heights.",
    },
    {
      img: "/A.jpeg",
      title: "Leading the Way",
      description: "Today, we're at the forefront of innovation and change.",
    },
  ];

  const nextSlide = () => {
    setCurrentSlide((prevSlide) => {
      const next = (prevSlide + 1) % slides.length;
      console.log(next);
      return next;
    });
  };

  const prevSlide = () => {
    setCurrentSlide((prevSlide) => {
      const prev = (prevSlide - 1 + slides.length) % slides.length;
      console.log(prev);
      return prev;
    });
  };

  return (
    <>
      <Nav />
      <div className="about-us-container">
        <section className="intro-section">
          <h1>Welcome to Our Journey</h1>
          <p>
            Learn about who we are, our values, and what drives us to make a
            difference in the world. Join us as we take you through our story,
            our amazing team, and the innovative work we do.
          </p>
        </section>

        {/* Carousel Section */}
        <section className="carousel-section">
          <h2 className="aboutus-titles">Our Journey</h2>
          <div className="custom-carousel-container">
            <div className="custom-carousel">
              {slides.map((slide, index) => (
                <div
                  key={index}
                  className={`carousel-item ${
                    index === currentSlide ? "active" : ""
                  }`}
                >
                  <img
                    src={slide.img}
                    className="carousel-image"
                    alt={`History Image ${index + 1}`}
                  />
                  <div className="carousel-caption">
                    <h5>{slide.title}</h5>
                    <p>{slide.description}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="carousel-controls">
              <button className="carousel-control-prev" onClick={prevSlide}>
                <span className="carousel-control-icon">←</span>
              </button>
              <button className="carousel-control-next" onClick={nextSlide}>
                <span className="carousel-control-icon">→</span>
              </button>
            </div>
          </div>
        </section>

        {/* Other Sections (Team, Values, Blog) */}
        

        {/* Values Section */}
        <section className="values-section">
          <h2 className="aboutus-titles">Our Values</h2>
          <div className="values-container">
            <div className="value-card">
              <h5>Integrity</h5>
              <p>
                We uphold the highest standards of honesty and transparency in
                everything we do.
              </p>
            </div>
            <div className="value-card">
              <h5>Innovation</h5>
              <p>
                We continuously push boundaries to develop new ideas and
                solutions.
              </p>
            </div>
            <div className="value-card">
              <h5>Collaboration</h5>
              <p>
                We believe in working together to achieve shared goals and
                success.
              </p>
            </div>
          </div>
        </section>

        {/* Blog Section */}
        <section className="blog-section">
          <h2 className="aboutus-titles">Blog</h2>
          <div className="blog-posts">
            <div className="blog-post">
              <img src="/blog1.jpg" alt="Blog 1" />
              <h5>Exploring Our Impact on the Community</h5>
              <p>
                Discover how our initiatives have positively impacted the lives
                of many...
              </p>
              <Link to="/blog/1" className="read-more-btn">
                Read More
              </Link>
            </div>
            <div className="blog-post">
              <img src="/blog2.jpg" alt="Blog 2" />
              <h5>Innovating the Future of Blood Donation</h5>
              <p>
                Our groundbreaking approach to making blood donation safer and
                more efficient...
              </p>
              <Link to="/blog/2" className="read-more-btn">
                Read More
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

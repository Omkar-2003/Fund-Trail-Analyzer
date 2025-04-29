import React, { useState, useEffect } from "react";
import feat1 from "../assets/img/feat1.jpg";
import feat2 from "../assets/img/feat2.jpg";
import feat3 from "../assets/img/feat3.jpg";
import feat5 from "../assets/img/feat5.jpg";
import feat6 from "../assets/img/feat6.jpg";
import { Element } from "react-scroll";
const About = () => {
  const features = [
    {
      image: feat5,
      title: "Simplifying investigations",
      description:
        "The platform aims to streamline the investigation process, making it easier for investigators to track and analyze financial data.",
    },
    {
      image: feat6,
      title: "CImproving accuracy",
      description:
        "By using advanced analytics and AI-based models, the platform aims to improve the accuracy and reliability of financial crime investigations..",
    },
    {
      image: feat2,
      title: "Enhancing transparency",
      description:
        "The platform provides customizable dashboards and visualizations that promote transparency and help investigators make sense of complex financial data.",
    },
    {
      image: feat1,
      title: "Detecting financial crimes:",
      description:
        "The platform's capabilities in identifying suspicious patterns and behaviors can help investigators detect financial crimes and prevent them from happening in the future..",
    },
    {
      image: feat3,
      title: "Facilitating collaboration: ",
      description:
        "The platform provides a centralized platform for investigators from different agencies and departments to collaborate and share information, leading to better outcomes in investigations.",
    },
    // Add more features as needed
  ];

  const benefits = [
    {
      title: "Data Validation",
      description:
        "Check that all data from the investigation period are available and no duplicate files are loaded. The trailing balances for each transaction and statement of the same account shall also be validated by Money Trail.",
    },
    {
      title: "Powerful Visualizations",
      description:
        "Customizable dashboards and advanced link analysis help investigators make sense of data and discover hidden trends and patterns",
    },
    {
      title: "Automated Reports",
      description:
        "Detailed reports focused on identifying flow of funds, highlighting suspicious behaviors and discovering trends are automatically generated to help investigators find the needle in the haystack",
    },
    {
      title: "Advanced Analytics",
      description:
        "Money Trail AI based analytics models help extract entity names and transaction types from narrations, identify and resolve similar sounding names, find suspicious patterns like circular transactions and related party transactions.",
    },
    {
      title: "Automated Ingestion and Data Cleansing",
      description:
        "Enter data in any digitally readable format. There will be no more effort to transform, normalize and clean data.",
    },
  ];

  // State for hover effect
  const [isHovered, setHovered] = useState(false);
  const [slideIn, setSlideIn] = useState(false);
  const slideInDelay = 320000;
  const handleScroll = () => {
    const element = document.getElementById("features-section");
    if (element) {
      const rect = element.getBoundingClientRect();
      const viewHeight = Math.max(
        document.documentElement.clientHeight,
        window.innerHeight
      );
      const shouldSlideIn = rect.top < viewHeight && rect.bottom >= 0;
      setSlideIn(rect.top < viewHeight && rect.bottom >= 0);
      setTimeout(() => {
        setSlideIn(shouldSlideIn);
      }, slideInDelay);
    }
  };
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  const containerStyle = {
    padding: "20px",
    display: "flex",
    flexDirection: "column", // Display the features in a column
    alignItems: "center", // Center the features horizontally
    background: "linear-gradient(to right, #ffc0cb, #87cefa)",
  };
  const benefitsSectionStyle = {
    marginTop: "40px",
    // display: 'flex',
    flexWrap: "wrap",
    justifyContent: "center",
  };

  const benefitCardStyle = {
    width: "1000px",
    margin: "20px",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
    backgroundColor: "#fff",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    transition: "transform 0.3s ease-in-out",
  };
  const benefitCardHoverStyle = {
    transform: "translateY(-5px)",
  };

  const benefitTitleStyle = {
    fontSize: "24px",
    marginBottom: "10px",
    color: "#000",
    borderBottom: "2px solid #052850",
    paddingBottom: "8px",
  };

  const benefitDescriptionStyle = {
    fontSize: "16px",
    color: "#333",
    marginTop: "10px",
  };

  const headingStyle = {
    fontSize: "36px",
    marginBottom: "20px",
    color: "#052850",
  };
  const sectionHeadingStyle = {
    fontSize: "28px",
    marginBottom: "20px",
    color: "#052850",
  };
  const featuresSectionStyle = {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
  };

  const featureCardStyle = {
    width: "1000px",
    margin: "20px",
    borderRadius: "10px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
    cursor: "pointer",
    display: "flex",
    flexDirection: "row", // Align the image and description side-by-side
    flexDirection: "row-reverse", // Alternate the direction for odd-indexed features
    transition: "transform 0.3s ease-in-out",
  };

  const featureCardHoverStyle = {
    transform: "translateY(-5px)",
  };

  const featureImageStyle = {
    width: "200px",
    height: "200px",
    objectFit: "cover",
    borderTopRightRadius: "10px", // Rounded corners for the right side
    borderBottomRightRadius: "10px", // Rounded corners for the right side
  };

  const featureDetailsStyle = {
    flex: 1,
    padding: "15px",
  };

  const featureTitleStyle = {
    fontSize: "24px",
    marginBottom: "10px",
    color: "#000",
  };

  const featureDescriptionStyle = {
    fontSize: "16px",
    color: "#000",
    fontSize: "20px",
    // textShadow: '2px 2px 0px #fff',
  };

  const aboutUsTextStyle = {
    fontSize: "18px",
    marginBottom: "20px",
  };

  const contactInfoStyle = {
    fontSize: "16px",
    color: "#555",
  };

  return (
    <Element id="features-section" name="features-section">
      <div style={containerStyle}>
        <div className="about-us-content">
          <h1 style={headingStyle}>About Us</h1>

          {/* Benefits Section */}
          <div style={benefitsSectionStyle}>
            <h2 style={sectionHeadingStyle}>Benefits</h2>
            {benefits.map((benefit, index) => (
              <div key={index} style={benefitCardStyle}>
                <h3 style={benefitTitleStyle}>{benefit.title}</h3>
                <p style={benefitDescriptionStyle}>{benefit.description}</p>
              </div>
            ))}
          </div>
          <h1>Features</h1>
          {/* Features Section */}
          {features.map((feature, index) => (
            <div
              style={{
                ...featureCardStyle,
                ...(isHovered === index ? featureCardHoverStyle : null),
                flexDirection: index % 2 === 0 ? "row" : "row-reverse", // Alternating direction
                transition: slideIn
                  ? `transform 0.5s ease-out ${index * 0.2}s`
                  : "none",
                transform: slideIn
                  ? "translateX(0)"
                  : `translateX(${index % 2 === 0 ? "-100%" : "100%"})`,
              }}
              key={index}
              onMouseEnter={() => setHovered(index)}
              onMouseLeave={() => setHovered(false)}
            >
              <img
                src={feature.image}
                alt={`Feature ${index + 1}`}
                style={featureImageStyle}
              />
              <div style={featureDetailsStyle}>
                <h3 style={featureTitleStyle}>{feature.title}</h3>
                <p style={featureDescriptionStyle}>{feature.description}</p>
              </div>
            </div>
          ))}

          <p style={aboutUsTextStyle}>
            Welcome to our website! We are a team of passionate individuals...
          </p>
          <p>Our mission is to provide...</p>
          <p style={contactInfoStyle}>Contact us at: email@example.com</p>
        </div>
      </div>
    </Element>
  );
};

export default About;

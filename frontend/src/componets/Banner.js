// Your code as provided

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import { ArrowRightCircle } from "react-bootstrap-icons";
import TrackVisibility from "react-on-screen";
import coin1 from "../assets/img/coin1.png";
import Bounce from "react-reveal/Bounce";
import Spin from "react-reveal/Spin";
import imge1 from "../assets/img/upl.png";
import imge2 from "../assets/img/transf.png";
import imge3 from "../assets/img/analy.png";
import imge4 from "../assets/img/repor.png";
import imge5 from "../assets/img/lap.png";
import video1 from "../assets/img/kavach demo.mp4";

export const Banner = () => {
  const navigate = useNavigate();
  const handleClick = (path) => {
    navigate(path);
  };
  const images = [imge1, imge2, imge3, imge4];
  const texts = ["Upload", "Transform", "Analyse", "Get Report"];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [roll, setRoll] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const toRotate = ["To Fraud Detection"];
  const [text, setText] = useState("");
  const [index, setIndex] = useState(1);
  const [delta, setDelta] = useState(800 - Math.random() * 100);
  const [showOverlay, setShowOverlay] = useState(true);
  const period = 2000;

  useEffect(() => {
    let ticker = setInterval(() => {
      tick();
    }, delta);
    return () => {
      clearInterval(ticker);
    };
  }, [text]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setRoll(true);
    }, 1000);
  }, []);

  const tick = () => {
    let i = loopNum % toRotate.length;
    let fullText = toRotate[i];
    let updatedText = isDeleting
      ? fullText.substring(0, text.length - 1)
      : fullText.substring(0, text.length + 1);

    setText(updatedText);

    if (isDeleting) {
      setDelta((prevDelta) => prevDelta / 2);
    }

    if (!isDeleting && updatedText === fullText) {
      setIsDeleting(true);
      setIndex((prevIndex) => prevIndex - 1);
      setDelta(period);
    } else if (isDeleting && updatedText === "") {
      setIsDeleting(false);
      setLoopNum((prevLoopNum) => prevLoopNum + 1);
      setDelta(500);
    } else {
      setIndex((prevIndex) => prevIndex + 1);
    }
  };

  const openAnalysisPage = () => {
    window.open("/Analysis", "_blank"); // Open Analysis page in a new tab
  };
  const openUploadPage = () => {
  window.open("/Upload", "_blank"); // Open Analysis page in a new tab
  };

  useEffect(() => {
    const imageChangeInterval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 2000);

    return () => clearInterval(imageChangeInterval);
  }, []);

  return (
    <div>
    <section
      className="banner"
      id="banner"
      style={{
        height: "40%",
        position: "relative",
        background: ` linear-gradient(to right, #FF9933, #ffffff, #008000) `,
      }}
    >
      <div
        className="flashes"
        style={{
          position: "absolute",
          top: "50%",
          left: "10px",
          transform: "translateY(-50%)",
          zIndex: 1,
          color: "#fff",
          textAlign: "left",
          width: "30%",
          maxWidth: "500px",
          boxShadow: "none",
        }}
      >
        <img
          src={images[currentImageIndex]}
          width="100%"
          height="100%"
          alt={`Image ${currentImageIndex}`}
        />
        <p style={{ fontWeight: "bold" }}>{texts[currentImageIndex]}</p>
      </div>

      <div
        style={{
          position: "absolute",
          right: "10px",
          top: "160px",
          height: "350px",
          width: "500px",
        }}
      >
        <video
          controls
          controlsList="nodownload"
          loop
          style={{ width: "100%", height: "100%" }}
        >
          <source src={video1} type="video/mp4" />
        </video>
      </div>
      <div>
        {roll == false ? (
          <>
            <Bounce top>
              <img src={coin1} width="30%" height="30%" zIndex="-1" />
            </Bounce>
          </>
        ) : (
          <></>
        )}
        {roll == true ? (
          <>
            <Spin count={1}>
              <img src={coin1} width="30%" height="30%" zIndex="-1" />
            </Spin>
          </>
        ) : (
          <></>
        )}
      </div>
      <Container
        style={{ position: "relative", zIndex: 1, position: "absolute" }}
      >
        <Row className="align-items-center">
          <Col xs={10} md={6} xl={7}>
            <TrackVisibility>
              {({ isVisible }) => {
                const animationDelay = 400;

                return (
                  <div
                    style={{
                      opacity: isVisible ? 1 : 0,
                      transform: isVisible
                        ? "translateX(0)"
                        : "translateX(100%)",
                      transition: `opacity 1s, transform 1s ${animationDelay}ms`,
                      color: "#fff",
                      textAlign: "center",
                    }}
                  >
                    <h1
                      style={{
                        color: "white",
                        fontWeight: "bold",
                        textShadow: "2px 2px black",
                      }}
                    >
                      {"WELCOME"}{" "}
                      <span
                        className="wrap"
                        style={{
                          color: "white",
                          fontWeight: "bold",
                          textShadow: "2px 2px black",
                        }}
                      >
                        {text}
                      </span>
                    </h1>
                    <p
                      style={{
                        color: "white",
                        fontWeight: "bold",
                        textShadow: "2px 2px black",
                      }}
                    >
                      We are here to analyse your <br />
                      Bank account statements.
                    </p>
                    <button
                      onClick={() => handleClick("/analysis")}
                      style={{
                        marginRight: "30px",
                        marginLeft: "10px",
                        background: "(to left, #000000, #333333, #ffffff)",
                        color: "white",
                        fontWeight: "bold",
                      }}
                    >
                      Analysis <ArrowRightCircle size={0} />
                    </button>
                    <button
                      onClick={() => handleClick("/reporthistory")}
                      style={{
                        marginRight: "30px",
                        marginLeft: "10px",
                        background: "(to right, #000000, #333333, #ffffff)",
                        color: "white",
                        fontWeight: "bold",
                      }}
                    >
                      Report History <ArrowRightCircle size={0} />
                    </button>
                    <button
                      onClick={() => handleClick("/Upload")} // Replace with the desired path for the new button
                      style={{
                        marginRight: "30px",
                        marginLeft: "10px",
                        background:
                          "linear-gradient(to left, #000000, #333333, #ffffff)",
                        color: "white",
                        fontWeight: "bold",
                      }}
                    >
                      Fund Trail <ArrowRightCircle size={0} />
                    </button>
                  </div>
                );
              }}
            </TrackVisibility>
          </Col>
        </Row>
      </Container>
      
    </section>
    <footer style={{ position: "absolute", left: "40%", bottom: "5%" }}>
      © 2023 @KuberNetra Copyright 2023. All Rights Reserved
    </footer>
    </div>
  );
};

export default Banner;

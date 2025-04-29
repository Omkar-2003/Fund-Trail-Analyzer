import React from "react";
import coin1 from "../assets/img/coin1.png";
import {
  FcComboChart,
  FcPieChart,
  FcDoughnutChart,
  FcAreaChart,
  FcLineChart,
  FcBarChart,
} from "react-icons/fc";

class Repo extends React.Component {
  state = {
    activeSection: null,
  };

  handleToggleSection = (section) => {
    console.log("Toggling section:", section);
    this.setState({
      activeSection: section,
    });
  };

  render() {
    const { activeSection } = this.state;

    return (
      <div>
        <section
          className="report"
          style={{
            position: "relative",
            width: "100%",
            height: "500px",
            background: `url(${coin1}) center/30% no-repeat, linear-gradient(to right, #ffc0cb, #87cefa)`,
            backgroundAttachment: "fixed",
            minHeight: "calc(100vh - 80px)",
          }}
          id="report"
        >
          <div
            className="container"
            style={{
              position: "relative",
              zIndex: "1",
              textAlign: "center",
              paddingTop: "5vh",
            }}
          >
            <div className="content">
              <span
                className="tra1"
                style={
                  {
                    // ...styles for report title
                  }
                }
              >
                REPORT
              </span>
              {/* ...other report title content */}
            </div>
          </div>
        </section>

        <div className="main-container">
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "10px",
              transform: "translateY(-50%)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              background: "#f0f0f0",
              padding: "10px",
            }}
          >
            {/* Render icons with onClick handlers */}
          </div>

          <div
            className="fixed-container"
            style={{
              width: "1000px",
              height: "470px",
              margin: "0 auto",
              background: "linear-gradient(to right, #ffc0cb, #87cefa)",
              padding: "20px",
              overflowY: "auto",
              position: "absolute",
              top: "125px",
              left: "50%",
              transform: "translateX(-50%)",
            }}
          >
            {activeSection !== null && (
              <section className={`rep${activeSection + 1}`}>
                <div className={`container${activeSection === 0 ? "1" : "2"}`}>
                  {/* Content based on activeSection */}
                </div>
              </section>
            )}
          </div>

          <footer style={{ position: "absolute", left: "40%", bottom: "5%" }}>
            © 2023 @Money Trail Copyright 2023. All Rights Reserved
          </footer>
        </div>
      </div>
    );
  }
}

export default Repo;

const iconStyle = {
  fontSize: "24px",
  cursor: "pointer",
  height: "50px",
  width: "50px",
  margin: "0 10px",
};

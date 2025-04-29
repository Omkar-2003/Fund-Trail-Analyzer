import React, { useEffect, useState } from "react";

const BlackScreenOverlay = ({ onAnimationComplete }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [shouldGlow, setShouldGlow] = useState(false);

  useEffect(() => {
    const animateBlackScreen = async () => {
      // Add a delay to the animation, you can adjust this value as needed
      await new Promise((resolve) => setTimeout(resolve, 3000));

      setIsVisible(false);
      setShouldGlow(true);

      // Call the onAnimationComplete function when the animation is complete
      onAnimationComplete();
    };

    animateBlackScreen();
  }, [onAnimationComplete]);

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        marginLeft:"21%",
        width: "80%",
        height: "100%",
        background: shouldGlow ? "rgba(0, 255, 255, 0.5)" : "rgba(0, 0, 0, 0.5)",
        zIndex: 9999,
        opacity: isVisible ? 2 : 0,
        transition: shouldGlow ? "opacity 2s" : "opacity 1s",
      }}
    >
      {/* ... (content of the instructions container) */}
    </div>
  );
};

export default BlackScreenOverlay;
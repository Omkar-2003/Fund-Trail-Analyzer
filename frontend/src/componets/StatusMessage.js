import React from "react";

const StatusMessage = ({ status, handleTransfer }) => {
  return <div className="status-message">{status}
 {/* <button className="analized-button" onClick={handleTransfer}>
          analized
        </button> */}
  </div>;
};

export default StatusMessage;

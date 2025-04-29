import React from "react";
import coin1 from '../assets/img/coin1.png';
import {
  FcComboChart,
  FcPieChart,
  FcDoughnutChart,
  FcAreaChart,
  FcLineChart,
  FcBarChart
} from 'react-icons/fc';

class Report extends React.Component {
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
    const reportSections = [
        <div key="section1">Report Section 1</div>,
        <div key="section2">Report Section 2</div>,
        <div key="section3">Report Section 3</div>,
        <div key="section4">Report Section 4</div>,
        <div key="section5">Report Section 5</div>,
        <div key="section6">Report Section 6</div>,
        // ... other report sections
      ];
    return (
      <div>
 <section className="report" style={{
          position: "relative",
          width: "100%",
          height: "500px",
          background: `url(${coin1}) center/30% no-repeat, linear-gradient(to right, #ffc0cb, #87cefa)`,
          backgroundAttachment: "fixed",
          minHeight: "calc(100vh - 80px)"
        }} id="report">
          <div className="container" style={{
            position: 'relative',
            zIndex: '1',
            textAlign: 'center',
            paddingTop: '5vh'
          }}>
            <div className="content">
              <span className="tra1" style={{
                position: 'relative',
                zIndex: '3',
                letterSpacing: '0.8px',
                padding: '8px 100px',
                background: 'linear-gradient(90.21deg, rgba(196, 148, 148, 0.5) -5.91%, rgba(111, 75, 183, 0.5) 111.58%)',
                border: '1px solid rgba(6, 5, 5, 0.5)',
                fontSize: '18px',
                fontWeight: 'bold',
                letterSpacing: '0.2px',
                textTransform: 'uppercase',
                position: 'absolute',
                top: '10%',
                left: '40%',
                overflow: 'visible'
              }}>REPORT</span>
              {/* <h4>REPORT</h4> */}
            </div>
          </div>          
        </section>

        <div className="main-container">
          {/* {!showSection && ( */}
           <div style={{
            position: "absolute",
            top: "50%",
            left: "10px",
            transform: "translateY(-50%)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            background: "#f0f0f0",
            padding: "10px",
          }}>
               <FcComboChart title="Consolidated Report" style={iconStyle} onClick={() => this.handleToggleSection(0)}/>
               <div style={{ height: "20px" }}></div>
               <FcDoughnutChart title="Anomaly Distribution" style={iconStyle} onClick={() => this.handleToggleSection(2)} />
               <div style={{ height: "20px" }}></div>
               <FcPieChart title="Balance Fluctuations" style={iconStyle} onClick={() => this.handleToggleSection(3)}/>   
               <div style={{ height: "20px" }}></div>         
               <FcAreaChart title="Anomaly Trail" style={iconStyle} onClick={() => this.handleToggleSection(4)}/>
               <div style={{ height: "20px" }}></div>
               <FcLineChart title="Suspicious Transaction" style={iconStyle} onClick={() => this.handleToggleSection(5)} />
               <div style={{ height: "20px" }}></div>
               <FcBarChart title="Anomaly In Data" style={iconStyle} onClick={() => this.handleToggleSection(1)}/>
               <FcLineChart title="velocity" style={iconStyle} onClick={() => this.handleToggleSection(6)}/>

            </div>
          {/* )} */}

          {/* {showSection && ( */}
            <div className="fixed-container" 
                style={{
                    width: "1000px", /* Adjust the width as needed */
                    height: "470px", /* Adjust the height as needed */
                    margin: "0 auto",
                    background:"linear-gradient(to right, #ffc0cb, #87cefa)", /* Add a background color to the container */
                    padding: "20px",
                    overflowY: "auto", /* Enable vertical scrolling for the container */
                    position: "absolute",
                    top: "125px", /* Adjust the top value as needed */
                    left: "50%",
                    transform: "translateX(-50%)"
                  }}>
                    {activeSection === 0 && (
              <section className="rep1" style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center', /* Center the rep1 section horizontally */
                marginTop: '20px'
              }}>
                <div className="container1" style={{ border: "1px solid #fff", maxWidth: '1200px', background:'#f0f0f0' }}>
                <div style={{ color: "black" }}>
                    <h2>Anomaly Detect</h2>
                    <iframe
                      src="/assets/higlight.html"
                      width="1000"
                      height="400"
                      title="Your anomaly in Data"
                      className="wide-iframe"
                      allowFullScreen
                    ></iframe>
                     <p style={{ fontSize: '16px' }}>Your anomaly data will be displayed here.</p>
                  <p style={{ fontSize: '16px' }}>
                    Scan your data and highlights rows with anomalies, allowing
                    you to easily identify potential fraudulent or suspicious
                    transactions. By hovering over the highlighted rows, you can
                    gain detailed insights into the specific anomaly category.
                  </p>
                  <br />
                  <ul className="anomaly-list">
                    <li>
                      1: 🚩 Zero transaction: <br />
                      Description: In the transaction, the withdrawal and
                      deposit are "Zero" but the rest of the detail is there,
                      might mean that the complete entry of that transaction is
                      falsified.
                    </li>
                    <li>2: 🚀 Mismatch balance:<br></br> Description : Opening and closing balance mismatch refers to a situation where the ending balance of one bank statement period (e.g., a month) does not align with the starting balance of the following period. In a well-maintained accounting system, the closing balance of a specific period should be equal to the opening balance of the subsequent period. However, when there is a discrepancy between these two figures, it indicates an error or inconsistency in the recorded transactions.                            </li>
                            <li>3: ⭐ Redundant UTR:<br></br> Description : The UTR is a unique identifier assigned to each financial transaction to ensure its traceability and avoid duplication. Redundant UTR occurs when a specific UTR, which is meant to be unique for every transaction, appears multiple times in the bank statement or accounting system. Each financial transaction should have its own distinct UTR to prevent confusion and facilitate accurate tracking of money transfers.</li>
                            <li>4: 🌟 Missing UTR:<br></br> Description : "Missing UTR" refers to a situation where a financial transaction or payment is processed without a Unique Transaction Reference (UTR) being provided or recorded for that specific transaction. In the normal course of processing financial transactions, each transaction is typically associated with a unique UTR to facilitate tracking, reconciliation, and verification of payments. However, in some cases, a transaction might be processed or recorded without a UTR being generated or provided, either due to errors in the system, technical issues, or other operational reasons.</li>
                            <li>5: 💡 Transaction ID is Zero:<br></br> Description : In the process of settling ATM transactions, it is essential to have a UTR associated with each transaction for proper tracking and reconciliation. However, in some cases, an ATM settlement might be processed without a UTR being generated or provided for that transaction. This could occur due to errors in the settlement system, technical glitches, or other operational issues.</li>
                            <li>6: 🎈 Missing Date:<br></br> Description : "Missing date" refers to a situation where a financial transaction or entry is recorded without the corresponding date when the transaction occurred. In financial records and bank statements, the date of each transaction is crucial for accurate tracking, reconciliation, and financial analysis.
                                In the normal course of recording financial transactions, it is essential to include the date when each transaction took place. However, in some cases, a transaction might be processed or recorded without the date being provided, either due to errors in the system, data entry mistakes, or other operational reasons.</li>
                            <li>7: 🔶 Negative Balance:<br></br> Description : Negative balances in the context of bank statements or financial accounts refer to situations where the account holder owes more money than they have available. This occurs when the total debits (withdrawals and expenses) in the account exceed the total credits (deposits and income). Negative balances can have various causes and implications.Typically results from overdrawing the account, which can happen when the account holder spends more money than they have or when transactions are not yet reflected in the account balance.</li>
                            <li>8: 🎯 Suspicious Deposit:<br></br> Description : Suspicious cash deposits of huge amounts often involve depositing large sums of cash, typically in excess of what would be considered normal for the account holder or the type of business they operate. These deposits may be made in a single transaction or in multiple transactions over a short period. The deposits may occur at irregular intervals or may lack an apparent business or personal purpose.</li>
                  </ul>
                  <br />
                </div>
                <div style={{ color: "black" }}>
                  <h2>Your anomaly in Data</h2>
                  <iframe
                    src="/assets/pie.html"
                    width="500"
                    height="400"
                    title="Your anomaly in Data"
                  ></iframe>
                  <p style={{fontSize:'16px'}}>Your anomaly data will be displayed here.</p>
                  <p style={{fontSize:'16px'}}>
                    The pie chart exhibits the distribution of anomaly
                    transactions, categorized under various segments. Normal
                    transactions form the largest portion, adhering to the
                    expected pattern. However, anomalies are dispersed across
                    distinct categories, each representing specific deviations
                    from the norm. Analyzing these categorized outliers is
                    paramount, as they can significantly influence
                    transaction analysis and modeling outcomes.
                  </p>
                </div>
                <br />
                <div style={{color:'black'}}>
                        <h2>Anomaly distribution</h2>
                        <iframe src="/assets/pie2.html" width="500" height="400" title="Anomaly distribution"></iframe>
                        <p style={{fontSize:'16px'}}>Your anomaly data will be displayed here.</p>
                        <p style={{fontSize:'16px'}}>The pie chart exhibits the distribution of anomaly transactions, 
                            categorized under various segments. Anomalies are dispersed across distinct categories,
                            each representing specific deviations from the norm. Largest count of the Anomaly form the largest portion, 
                            adhering to the expected pattern. Analyzing these categorized outliers is paramount,
                            as they can significantly influence transaction analysis and modeling outcomes.</p>
                    </div>
                    <br></br>
                    <div style={{color:'black'}}>
                        <h2>Balance Chart</h2>
                        <iframe src="/assets/scatter_plot.html" width="800" height="600" title="Balance Chart"></iframe>
                        <p style={{fontSize:'16px'}}>As you observe the scatter plot from left to right, a visual trail is formed,
                            illustrating the account's transaction history and how it impacts the balance over time.
                            The path created by the plotted points depicts the fluctuations in the account balance as transactions occur.</p>
                    </div>
                    <br></br>
                    <div style={{color:'black'}}>
                        <h2>Anomaly Chart</h2>
                        <iframe src="/assets/line_plot.html" width="800" height="600" title="Anomaly Chart"></iframe>
                        <p style={{fontSize:'16px'}}>Your anomaly chart will be displayed here.</p>
                        <p style={{fontSize:'16px'}}>As you observe the scatter plot from left to right, a visual trail is formed,
                            illustrating the account's transaction history and how anomaly took place over time.
                            The path created by the plotted points depicts the anomaly transactions occur.</p>
                    </div>
                </div>
              </section>
                    )}
                    {activeSection === 1 && (
              <section className="rep2">
              <div className="container2">
              <div style={{ color: "black" }}>
                    <h2>Suspicious Transaction</h2>
                    <iframe
                      src="/assets/data_highlighted_rows.html"
                      width="1000"
                      height="400"
                      title="Your anomaly in Data"
                      className="wide-iframe"
                      allowFullScreen
                    ></iframe>
                     <p style={{ fontSize: '16px' }}>Your anomaly data will be displayed here.</p>
                  <p style={{ fontSize: '16px' }}>
                    Scan your data and highlights rows with anomalies, allowing
                    you to easily identify potential fraudulent or suspicious
                    transactions. By hovering over the highlighted rows, you can
                    gain detailed insights into the specific anomaly category.
                  </p>
                  <br />
                  <ul className="anomaly-list">
                    <li>
                      1: 🚩 Zero transaction: <br />
                      Description: In the transaction, the withdrawal and
                      deposit are "Zero" but the rest of the detail is there,
                      might mean that the complete entry of that transaction is
                      falsified.
                    </li>
                    <li>2: 🚀 Mismatch balance:<br></br> Description : Opening and closing balance mismatch refers to a situation where the ending balance of one bank statement period (e.g., a month) does not align with the starting balance of the following period. In a well-maintained accounting system, the closing balance of a specific period should be equal to the opening balance of the subsequent period. However, when there is a discrepancy between these two figures, it indicates an error or inconsistency in the recorded transactions.                            </li>
                            <li>3: ⭐ Redundant UTR:<br></br> Description : The UTR is a unique identifier assigned to each financial transaction to ensure its traceability and avoid duplication. Redundant UTR occurs when a specific UTR, which is meant to be unique for every transaction, appears multiple times in the bank statement or accounting system. Each financial transaction should have its own distinct UTR to prevent confusion and facilitate accurate tracking of money transfers.</li>
                            <li>4: 🌟 Missing UTR:<br></br> Description : "Missing UTR" refers to a situation where a financial transaction or payment is processed without a Unique Transaction Reference (UTR) being provided or recorded for that specific transaction. In the normal course of processing financial transactions, each transaction is typically associated with a unique UTR to facilitate tracking, reconciliation, and verification of payments. However, in some cases, a transaction might be processed or recorded without a UTR being generated or provided, either due to errors in the system, technical issues, or other operational reasons.</li>
                            <li>5: 💡 Transaction ID is Zero:<br></br> Description : In the process of settling ATM transactions, it is essential to have a UTR associated with each transaction for proper tracking and reconciliation. However, in some cases, an ATM settlement might be processed without a UTR being generated or provided for that transaction. This could occur due to errors in the settlement system, technical glitches, or other operational issues.</li>
                            <li>6: 🎈 Missing Date:<br></br> Description : "Missing date" refers to a situation where a financial transaction or entry is recorded without the corresponding date when the transaction occurred. In financial records and bank statements, the date of each transaction is crucial for accurate tracking, reconciliation, and financial analysis.
                                In the normal course of recording financial transactions, it is essential to include the date when each transaction took place. However, in some cases, a transaction might be processed or recorded without the date being provided, either due to errors in the system, data entry mistakes, or other operational reasons.</li>
                            <li>7: 🔶 Negative Balance:<br></br> Description : Negative balances in the context of bank statements or financial accounts refer to situations where the account holder owes more money than they have available. This occurs when the total debits (withdrawals and expenses) in the account exceed the total credits (deposits and income). Negative balances can have various causes and implications.Typically results from overdrawing the account, which can happen when the account holder spends more money than they have or when transactions are not yet reflected in the account balance.</li>
                            <li>8: 🎯 Suspicious Deposit:<br></br> Description : Suspicious cash deposits of huge amounts often involve depositing large sums of cash, typically in excess of what would be considered normal for the account holder or the type of business they operate. These deposits may be made in a single transaction or in multiple transactions over a short period. The deposits may occur at irregular intervals or may lack an apparent business or personal purpose.</li>
                  </ul>
                  <br />
                </div>
              </div>
              </section>
  )}
                    {activeSection === 6 && (
              <section className="rep2">
              <div className="container2">
              <div style={{ color: "black" }}>
                    <h2>Velocity of Transaction</h2>
                    <iframe
                      src="/assets/velocity_plot.html"
                      width="1000"
                      height="400"
                      title="Your volume in Data"
                      className="wide-iframe"
                      allowFullScreen
                    ></iframe>
                     <p style={{ fontSize: '16px' }}>Your velocity of data will be displayed here.</p>
                  <p style={{ fontSize: '16px' }}>
                    Scan your data and highlights rows with anomalies, allowing
                    you to easily identify potential fraudulent or suspicious
                    transactions. By hovering over the highlighted rows, you can
                    gain detailed insights into the specific anomaly category.
                  </p>
                  <br />
                  {/* <ul className="anomaly-list">
                    <li>
                      1: 🚩 Zero transaction: <br />
                      Description: In the transaction, the withdrawal and
                      deposit are "Zero" but the rest of the detail is there,
                      might mean that the complete entry of that transaction is
                      falsified.
                    </li>
                    <li>2: 🚀 Mismatch balance:<br></br> Description : Opening and closing balance mismatch refers to a situation where the ending balance of one bank statement period (e.g., a month) does not align with the starting balance of the following period. In a well-maintained accounting system, the closing balance of a specific period should be equal to the opening balance of the subsequent period. However, when there is a discrepancy between these two figures, it indicates an error or inconsistency in the recorded transactions.                            </li>
                            <li>3: ⭐ Redundant UTR:<br></br> Description : The UTR is a unique identifier assigned to each financial transaction to ensure its traceability and avoid duplication. Redundant UTR occurs when a specific UTR, which is meant to be unique for every transaction, appears multiple times in the bank statement or accounting system. Each financial transaction should have its own distinct UTR to prevent confusion and facilitate accurate tracking of money transfers.</li>
                            <li>4: 🌟 Missing UTR:<br></br> Description : "Missing UTR" refers to a situation where a financial transaction or payment is processed without a Unique Transaction Reference (UTR) being provided or recorded for that specific transaction. In the normal course of processing financial transactions, each transaction is typically associated with a unique UTR to facilitate tracking, reconciliation, and verification of payments. However, in some cases, a transaction might be processed or recorded without a UTR being generated or provided, either due to errors in the system, technical issues, or other operational reasons.</li>
                            <li>5: 💡 Transaction ID is Zero:<br></br> Description : In the process of settling ATM transactions, it is essential to have a UTR associated with each transaction for proper tracking and reconciliation. However, in some cases, an ATM settlement might be processed without a UTR being generated or provided for that transaction. This could occur due to errors in the settlement system, technical glitches, or other operational issues.</li>
                            <li>6: 🎈 Missing Date:<br></br> Description : "Missing date" refers to a situation where a financial transaction or entry is recorded without the corresponding date when the transaction occurred. In financial records and bank statements, the date of each transaction is crucial for accurate tracking, reconciliation, and financial analysis.
                                In the normal course of recording financial transactions, it is essential to include the date when each transaction took place. However, in some cases, a transaction might be processed or recorded without the date being provided, either due to errors in the system, data entry mistakes, or other operational reasons.</li>
                            <li>7: 🔶 Negative Balance:<br></br> Description : Negative balances in the context of bank statements or financial accounts refer to situations where the account holder owes more money than they have available. This occurs when the total debits (withdrawals and expenses) in the account exceed the total credits (deposits and income). Negative balances can have various causes and implications.Typically results from overdrawing the account, which can happen when the account holder spends more money than they have or when transactions are not yet reflected in the account balance.</li>
                            <li>8: 🎯 Suspicious Deposit:<br></br> Description : Suspicious cash deposits of huge amounts often involve depositing large sums of cash, typically in excess of what would be considered normal for the account holder or the type of business they operate. These deposits may be made in a single transaction or in multiple transactions over a short period. The deposits may occur at irregular intervals or may lack an apparent business or personal purpose.</li>
                  </ul> */}
                  <br />
                </div>
              </div>
              </section>
                    )}
                    {activeSection === 2 && (
              <section className="rep3">
              <div className="container2">
              <div style={{ color: "black" }}>
                  <h2>Your anomaly in Data</h2>
                  <iframe
                    src="/assets/pie.html"
                    width="500"
                    height="400"
                    title="Your anomaly in Data"
                  ></iframe>
                  <p style={{fontSize:'16px'}}>Your anomaly data will be displayed here.</p>
                  <p style={{fontSize:'16px'}}>
                    The pie chart exhibits the distribution of anomaly
                    transactions, categorized under various segments. Normal
                    transactions form the largest portion, adhering to the
                    expected pattern. However, anomalies are dispersed across
                    distinct categories, each representing specific deviations
                    from the norm. Analyzing these categorized outliers is
                    paramount, as they can significantly influence
                    transaction analysis and modeling outcomes.
                  </p>
                </div>
              </div>
              </section>
                    )}
                    {activeSection === 3 && (
              <section className="rep4">
              <div style={{color:'black'}}>
                        <h2>Anomaly distribution</h2>
                        <iframe src="/assets/pie2.html" width="500" height="400" title="Anomaly distribution"></iframe>
                        <p style={{fontSize:'16px'}}>Your anomaly data will be displayed here.</p>
                        <p style={{fontSize:'16px'}}>The pie chart exhibits the distribution of anomaly transactions, 
                            categorized under various segments. Anomalies are dispersed across distinct categories,
                            each representing specific deviations from the norm. Largest count of the Anomaly form the largest portion, 
                            adhering to the expected pattern. Analyzing these categorized outliers is paramount,
                            as they can significantly influence transaction analysis and modeling outcomes.</p>
                    </div>
                    </section>
                    )}
                    {activeSection === 4 && (
                    <section className="rep5">
                    <div style={{color:'black'}}>
                        <h2>Balance Chart</h2>
                        <iframe src="/assets/scatter_plot.html" width="800" height="600" title="Balance Chart"></iframe>
                        <p style={{fontSize:'16px'}}>As you observe the scatter plot from left to right, a visual trail is formed,
                            illustrating the account's transaction history and how it impacts the balance over time.
                            The path created by the plotted points depicts the fluctuations in the account balance as transactions occur.</p>
                    </div>
                    </section>
                    )}
                    {activeSection === 5 && (
                    <section className="rep6">
                    <div style={{color:'black'}}>
                        <h2>Anomaly Chart</h2>
                        <iframe src="/assets/line_plot.html" width="800" height="600" title="Anomaly Chart"></iframe>
                        <p style={{fontSize:'16px'}}>Your anomaly chart will be displayed here.</p>
                        <p style={{fontSize:'16px'}}>As you observe the scatter plot from left to right, a visual trail is formed,
                            illustrating the account's transaction history and how anomaly took place over time.
                            The path created by the plotted points depicts the anomaly transactions occur.</p>
                    </div>
                    </section>
                    )}
                    
            </div>
            
          {/* )} */}

          {/* Download HTML button */}
          {/* <button
            
          >
            Download HTML
          </button> */}
        </div>

        <footer style={{ position: "absolute", left: "40%", bottom: "5%" }}>
          © 2023 @Money Trail Copyright 2023. All Rights Reserved
        </footer>
      </div>
    );
  }
}

export default Report;

const iconStyle = {
    fontSize: "24px",
    cursor: "pointer",
    height: "50px",
    width: "50px",
    margin: "0 10px",
  };

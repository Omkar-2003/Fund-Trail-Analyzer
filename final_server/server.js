const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
const fs = require("fs");

app.use(cors()); // Enable CORS

app.get("/work", (req, res) => {
  res.send("Hello");
  console.log("API got hit");
});

// Construct the correct directory path using __dirname
const directoryPath = path.join(
  "X:\\Computational project\\bla\\frontend-2-b\\frontend\\public\\assets\\outputs"
);

app.use("/assets/outputs", express.static(directoryPath));

app.get("/api/htmlfiles", (req, res) => {
  console.log("api/htmlfiles got hit");
  fs.readdir(directoryPath, (err, files) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Error reading directory" });
    }
    const htmlFiles = files.filter((file) => file.endsWith(".html"));

    // Create full URLs for each HTML file
    const htmlFileUrls = htmlFiles.map((file) => `/assets/outputs/${file}`);

    console.log(htmlFileUrls);

    res.json({ htmlFiles: htmlFileUrls });
  });
});

const port = 4000;
app.listen(port, () => {
  console.log(`Server started at port ${port}`);
});

require("dotenv").config();

const express = require("express");

const connectDatabase = require("./database/config/dbConfig");

const indexRoute = require("./api/indexRoute");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", indexRoute);
app.use((req, res, next) => {
    return res.json({
        success: false,
        message: "Route not found",
    });
});

const PORT = process.env.PORT || 3000;

(async () => {
  try {
    await connectDatabase(); 
    app.listen(PORT, () => {
      console.log(`Server is listening on port ${PORT}`);
    });
  } catch (err) {
    console.error("Failed to connect DB:", err.message);
    process.exit(1);
  }
})();


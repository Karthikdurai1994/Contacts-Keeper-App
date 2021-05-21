const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const path = require("path");
const connectDB = require("./config/db");

// Connecting MongoDB Database
connectDB();

// to get body data which is sent in request, we have use the following middleware
app.use(express.json({ extended: false }));

// Defining Routes
app.use("/api/users", require("./routes/users"));
app.use("/api/contacts", require("./routes/contacts"));
app.use("/api/auth", require("./routes/auth"));

// Defining Default routes to be served during production that is we will serve client/build/index.html during production
if (process.env.NODE_ENV === "production") {
  // set static folder
  app.use(express.static(path.join(__dirname, "client/build")));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname + "/client/build/index.html"));
  });
}

app.listen(port, () => {
  console.log("Server is listening at Port: " + port);
});

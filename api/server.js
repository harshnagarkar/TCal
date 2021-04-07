const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();

var corsOptions = {
  // origin: "http://localhost:8080"
  origin: "http://localhost:3000"
};

app.use(cors());

const db = require("./app/models");
db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch(err => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to books application." });
});

require("./app/routes/book.routes")(app);
require("./app/routes/profile.routes")(app);
require("./app/routes/timesheet.routes")(app);
//require('./app/routes/book.routes')(app)

// set port, listen for requests
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

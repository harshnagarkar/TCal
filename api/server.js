const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();

var jwt = require("express-jwt");
var jwks = require("jwks-rsa");

var jwtCheck = jwt({
  secret: jwks.expressJwtSecret({
      cache: true,
      rateLimit: true,
      jwksRequestsPerMinute: 5,
      jwksUri: 'https://dev-5pvlocxw.us.auth0.com/.well-known/jwks.json'
}),
audience: 'http://localhost:4200/timesheets',
issuer: 'https://dev-5pvlocxw.us.auth0.com/',
algorithms: ['RS256']
});

app.use(jwtCheck);

var whitelist = [
  'http://localhost:4200',
  'http://localhost:3000',
  'dev-5pvlocxw.us.auth0.com'
]
var corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error(`Origin: ${origin} is not allowed by CORS`))
    }
  }
}
app.use(cors(corsOptions));

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

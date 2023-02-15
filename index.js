const express = require("express");
const cors = require("cors");
const app = express();
const { Pool } = require("pg");

// dotenv need to be installed to get the .env file value. Then we need to run the config function to env to connect
const env = require("dotenv")
env.config();

//used express and cors as usual
app.use(express.json());
app.use(cors());

// connection string for Pool 
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl:false
});

// connecting pool is important for 
pool.connect();

// get data 
app.get("/", function (request, res) {
  pool
    .query("SELECT * FROM customers")
    .then((result) => res.json(result.rows))
    .catch((error) => {
      console.error(error);
      res.status(500).json(error);
    });
});

// replaced the get "/" to send local json data
// app.get("/", function (request, response) {
//   response.send("Hotel booking server.  Ask for /bookings, etc.");
// });

// TODO add your routes and helper functions here
const listener = app.listen(process.env.PORT || 5002, function () {
  console.log("Your app is listening on port " + listener.address().port);
});

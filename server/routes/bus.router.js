//require base
const express = require("express");
const router = express.Router();
const axios = require("axios");

// Metro Transit HTTPS request URL
const BASE_URL = "http://svc.metrotransit.org/NexTrip/Routes?format=json";

// Gets all bus routes available and formatted in JSON
router.get('/', (req, res) => {
  axios({
    method: "GET",
    url: `${BASE_URL}`,
  })
    .then(response => {
      console.log("this is response in Routes", response.data);
        res.send(response.data);
      // res.sendStatus(200);
    })
    .catch(error => {
      console.log("Error in GET ALL", error);
      res.sendStatus(500);
    });
});

module.exports = router;

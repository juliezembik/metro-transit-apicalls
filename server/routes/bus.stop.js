const express = require("express");
const router = express.Router();
const axios = require("axios");


// Metro Transit HTTPS request URL for stops
const BASE_URL = "http://svc.metrotransit.org/NexTrip/Stops";



//Get stop for specific bus route in :route & :direction
router.get(`/:route/:direction`, (req, res) => {

    // defined our route and direction variables here as done in bus.direction
    let route = req.params.route;
    let direction = req.params.direction;

    axios({
        method: "GET",
        url: `${BASE_URL}/${route}/${direction}`,
    })
        .then(response => {
            console.log("this is response", response.data);
            res.send(response.data);
            // res.sendStatus(200);
        })
        .catch(error => {
            console.log("Error in GET ALL", error);
            res.sendStatus(500);
        });
});

module.exports = router;
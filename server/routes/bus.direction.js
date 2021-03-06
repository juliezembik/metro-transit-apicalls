const express = require("express");
const router = express.Router();
const axios = require("axios");


// Metro Transit HTTPS request URL for directions
const BASE_URL = "http://svc.metrotransit.org/NexTrip/Directions";



//Get Directions for specific bus route in :route
// in express :route is stored as req.params.[variable]
// to utilize that data, it must be determined and sent from DOM side
router.get(`/:route`, (req, res) => {
    
    // defined req.params.route for ease of usage
    let busNumber = req.params.route;

    axios({
        method: "GET",
        url: `${BASE_URL}/${busNumber}`,
        })
        .then(response => {
            console.log("this is response in Directions", response.data);
            res.send(response.data);
            // res.sendStatus(200);
        })
        .catch(error => {
            console.log("Error in GET ALL", error);
            res.sendStatus(500);
        });
});

module.exports = router;
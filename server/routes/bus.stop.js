const express = require("express");
const router = express.Router();
const axios = require("axios");


// Metro Transit HTTPS request URL
const BASE_URL = "http://svc.metrotransit.org/NexTrip/Stops";



//Get Directions for specific bus route in :id
router.get(`/:id`, (req, res) => {

    let busNumber = req.params.id.busroute;
    let direction = req.params.id.direct;

    axios({
        method: "GET",
        url: `${BASE_URL}/${busNumber}/${direction}`,
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
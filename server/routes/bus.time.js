const express = require("express");
const router = express.Router();
const axios = require("axios");


// Metro Transit HTTPS request URL
const BASE_URL = "http://svc.metrotransit.org/NexTrip/";



//Get Directions for specific bus route in :id
router.get(`/:route/:direction/:stop`, (req, res) => {

    let route = req.params.route;
    let direction = req.params.direction;
    let stop = req.params.stop;

    axios({
        method: "GET",
        url: `${BASE_URL}/${route}/${direction}/${stop}`,
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
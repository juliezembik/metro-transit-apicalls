const express = require("express");
const router = express.Router();
const axios = require("axios");


// Metro Transit HTTPS request URL final API call of retrieving time
const BASE_URL = "http://svc.metrotransit.org/NexTrip/";



//Get time information here with all three variables :route :direction & :stop
router.get(`/:route/:direction/:stop`, (req, res) => {

    // it is important to have these three variables lest this API call will not work properly
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
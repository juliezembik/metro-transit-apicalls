
//defined server middleware
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

//define api route to use
const busRouter = require('./routes/bus.router');

// Using bodyParser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//routes used here
app.use('/api/busroutes', busRouter);


// Will server static files
app.use(express.static('build'));

// Define PORT to listen to
const PORT = process.env.PORT || 5700;


// Server will listen to this port
app.listen(PORT, () => {
    console.log(`Listening to Port: ${PORT}`);
    
});


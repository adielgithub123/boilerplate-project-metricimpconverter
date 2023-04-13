'use strict';

const express     = require('express');
const bodyParser  = require('body-parser');
const expect      = require('chai').expect;
const cors        = require('cors');
require('dotenv').config();

const apiRoutes         = require('./routes/api.js');
const fccTestingRoutes  = require('./routes/fcctesting.js');
const runner            = require('./test-runner');

let app = express();

app.use('/public', express.static(process.cwd() + '/public'));

app.use(cors({origin: '*'})); //For FCC testing purposes only

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Index page (static HTML)
app.route('/')
  .get(function (req, res) {
    res.sendFile(process.cwd() + '/views/index.html');
  });

//For FCC testing purposes
fccTestingRoutes(app);

//Routing for API 
apiRoutes(app);  

app.route('/api/convert').get((req, res) => {
  let { input } = req.query;
  if (!input) {
    return res.send("invalid input");
  }
  let result = apiRoutes(input);
  if(result.valNum=="invalid number" && result.valUnit=="invalid unit"){
    return res.send("invalid number and unit");
  }
  else if(result.valNum=="invalid number"){
    return res.send("invalid number");
  }
  else if(result.valUnit=="invalid unit"){
    return res.send("invalid unit");
  }
  res.json({
    "initNum":result.valNum,
    "initUnit":result.valUnit,
    "returnNum":result.valReturnNum,
    "returnUnit":result.valReturnUnit,
    "string":result.valString
  })
  
})
    
//404 Not Found Middleware
app.use(function(req, res, next) {
  res.status(404)
    .type('text')
    .send('Not Found');
});

const port = process.env.PORT || 3000;

//Start our server and tests!
app.listen(port, function () {
  console.log("Listening on port " + port);
  if(process.env.NODE_ENV==='test') {
    console.log('Running Tests...');
    setTimeout(function () {
      try {
        runner.run();
      } catch(e) {
          console.log('Tests are not valid:');
          console.error(e);
      }
    }, 1500);
  }
});

module.exports = app; //for testing

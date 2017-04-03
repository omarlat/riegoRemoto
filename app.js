var express = require("express"),
    app = express(),
    bodyParser  = require("body-parser"),
    methodOverride = require("method-override"),
    router = require('./routes.js'),
    interval = require('./interval.js');


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride());
app.use(router);
interval.start();

app.listen(process.env.PORT, function() {
  console.log("Node server running on http://localhost:"+process.env.PORT);
});

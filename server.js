// express
// fs
// underscore

const express = require('express');
const _ = require("underscore");
const fs = require("fs");

var app = express();

var jsonCars;
fs.readFile("fipe.csv", "utf8", function(err, data){
    if (err) throw err;
    jsonCars = JSON.parse(csvJSON(data));
  });

app.get('/', function (req, res) {
  res.end(JSON.stringify(jsonCars));
})

app.get('/getAll', function (req, res) {
  res.end(JSON.stringify(jsonCars));
})

app.get('/getBrand/:brand', function (req, res) {
  var filtered = _.where(jsonCars, {"brand": req.params.brand});
  res.end(JSON.stringify(filtered));
})

app.get('/depreciation/:brand', function (req, res) {
  var depreciations = [];
  var filtered = _.where(jsonCars, {"brand": req.params.brand});
  for (var i = 0; i < filtered.length -1; i++){
    var obj = filtered[i];
    var obj2 = filtered[i+1];
    var depreciation = {};
    depreciation["month"] = obj["tableRef"];
    depreciation["depreciation"] = getDepreciation(parseFloat(obj["price"].replace(".", "")), parseFloat(obj2["price"].replace(".", ""))).toFixed(2);
    depreciations.push(depreciation)
  }
  res.end(JSON.stringify(depreciations));
})

var server = app.listen(8081, function () {

  var host = server.address().address
  var port = server.address().port

  console.log("Example app listening at http://%s:%s", host, port)

})

/// UTILS
function getDepreciation(after, before){
  return d = ((before - after)*100)/before
}

//Convert CSV data to JSON
function csvJSON(csv){

  var lines=csv.split("\n");

  var result = [];

  var headers=lines[0].split(";");

  for(var i=1;i<lines.length;i++){

	  var obj = {};
	  var currentline=lines[i].split(";");

	  for(var j=0;j<headers.length;j++){
		  obj[headers[j]] = currentline[j];
	  }

	  result.push(obj);

  }

  //return result; //JavaScript object
  return JSON.stringify(result); //JSON
}

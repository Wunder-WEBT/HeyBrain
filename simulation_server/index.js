var app = require("express")();
var http = require("http").Server(app);
var io = require("socket.io")(http);

var cors = require("cors");
app.use(cors());

require("./app/routes/statistics.routes.js")(app);
var Average = require("./average.js");

//dbconnection
let mongoUtil = require("./app/mongo.util");
//uselsess testing
//console.log("----------");
var currenttimestamp_month = new Date();
var currenttimestamp = new Date();
var currenttimestamp_days = new Date();
var currenttimestamp_one = new Date();
var currenttimestamp_yesterday = new Date();
var currenttimestamp_year = new Date();
var gt = new Date();
var yeardate = new Date();
 yeardate.setMonth(0);
 yeardate.setDate(1);
 yeardate.setHours(1);
 yeardate.setMinutes(0);
 yeardate.setFullYear(yeardate.getFullYear()-1);
 yeardate=yeardate/1000;
 console.log("year:"+yeardate);
 /*for(let index = 0; index <=4; index++){
  var timestamp_gt_c = new Date();
  var timestamp_lt_c = new Date();
 
  timestamp_gt_c.setMonth(0);
  timestamp_gt_c.setDate(1);
  timestamp_gt_c.setHours(1);
  timestamp_gt_c.setMinutes(0);
  timestamp_gt_c.setFullYear(timestamp_gt_c.getFullYear()-index);
  timestamp_gt_c=timestamp_gt_c/1000;

  timestamp_lt_c.setMonth(0);
  timestamp_lt_c.setDate(1);
  timestamp_lt_c.setHours(1);
  timestamp_lt_c.setMinutes(0);
  timestamp_lt_c.setFullYear((timestamp_lt_c.getFullYear()-index)+1);
  timestamp_lt_c=timestamp_lt_c/1000;

  console.log("year innen"+timestamp_gt_c);
  console.log("year innen"+timestamp_lt_c);

 }*/

//console.log("Get day of date");
/*var daycount = currenttimestamp_test.getDate();
console.log(currenttimestamp_test.getDate());
currenttimestamp_test.setDate(currenttimestamp_test.getDate() - (daycount - 1));
currenttimestamp_test.setHours(2);
currenttimestamp_test.setMinutes(0);
console.log(currenttimestamp_test);
currenttimestamp_test = currenttimestamp_test / 1000;
console.log(currenttimestamp_test);*/


/*for (let index = 0; index <=11; index++) {
  var gt = new Date();
  var currenttimestamp_test2 = new Date();

  var daycount = gt.getDate();
  gt.setDate(gt.getDate() - (daycount - 1));
  gt.setHours(2);
  gt.setMinutes(0);
  gt.setMonth(gt.getMonth() - index);   

  currenttimestamp_test2.setDate(currenttimestamp_test2.getDate() - (daycount - 1));
  currenttimestamp_test2.setHours(2);
  currenttimestamp_test2.setMinutes(0);
  currenttimestamp_test2.setMonth((currenttimestamp_test2.getMonth() - index)+1);  
  gt = gt / 1000;
  currenttimestamp_test2 = currenttimestamp_test2 / 1000;

  console.log(index);
  console.log(gt);
  console.log(currenttimestamp_test2);



}*/

var timestamp_gt = new Date();
var timestamp_lt = new Date();
var factor = 86400;
var index = 0;
timestamp_gt.setHours(2);
timestamp_gt.setMinutes(0);
timestamp_gt = timestamp_gt / 1000;
timestamp_gt = timestamp_gt - factor * index;

timestamp_lt = timestamp_gt + factor;

console.log(":)");
console.log("gt:" + timestamp_gt);
console.log("lt:" + timestamp_lt);
console.log(":)");

var avg = new Average();

//console.log("++++++++++++");

currenttimestamp_days.setDate(currenttimestamp_days.getDate() - 7);

currenttimestamp_days = currenttimestamp_days / 1000;
//console.log(currenttimestamp_days);

currenttimestamp_one.setHours(2);
currenttimestamp_one.setMinutes(0);

//console.log(currenttimestamp_one);

currenttimestamp_one = currenttimestamp_one / 1000;
//console.log(currenttimestamp_one);
//console.log("++++++++++++");

currenttimestamp = currenttimestamp / 1000;

currenttimestamp_month.setMonth(currenttimestamp_month.getMonth() - 1);

currenttimestamp_month = currenttimestamp_month / 1000;

currenttimestamp_year.setMonth(currenttimestamp_year.getMonth() - 12);
currenttimestamp_year = currenttimestamp_year / 1000;

currenttimestamp_yesterday.setHours(2);
currenttimestamp_yesterday.setMinutes(0);
currenttimestamp_yesterday = currenttimestamp_yesterday / 1000;
currenttimestamp_yesterday = currenttimestamp_yesterday - 86400;

console.log("current:" + currenttimestamp);
console.log("current timestamp from today:" + currenttimestamp_one);

console.log("current a week ago:" + currenttimestamp_days);

console.log("current a month ago:" + currenttimestamp_month);
console.log("current a year ago:" + currenttimestamp_year);
console.log("current yesterday:" + currenttimestamp_yesterday);

mongoUtil.connectToServer(function (err, client) {
  if (err) console.log(err);

  const db = mongoUtil.getDB();
  var counter = 0;
  var avgstress = 0;

  db.collection("met")
    .find({ time: { $gt: currenttimestamp_month } })
    .toArray(function (err, result) {
      if (err) throw err;
      //console.log(result[1].pow[2]);
      result.forEach((element) => {
        // console.log(element.met);
        avgstress = avgstress + element.met[6];
        // console.log("///////////////////")
        // console.log(element.met[0]);
        //console.log("///////////////////")

        counter++;
      });
      // console.log(result[1].pow);
      //console.log(avgstress);
      //console.log(counter);
      avgstress = avgstress / counter;
      //console.log("Average:");
      //console.log(Math.round(avgstress * 100) / 100);
      avg.stress = avgstress;

     // console.log(avg);
    });
});
/* mongoUtil.connectToServer( function( err, client ) {
    const db = mongoUtil.getDB();
    db.collection("pow").aggregate([
      {$group:{_id:"$time"}},
      { $project:  {$avg: "$pow"} }
   ])
  });*/

//useless testing end

//daten holen
mongoUtil.connectToServer(function (err, client) {
  if (err) console.log(err);

  const db = mongoUtil.getDB();

  /* db.collection("stream").find({}).toArray(function(err, result) {
       if (err) throw err;
       console.log(result);
 
   });*/

  // get the Data from MongoDB
  db.collection("met")
    .find({})
    .toArray(function (err, result) {
      if (err) throw err;
      // console.log(result);
      //WebSocket Communication
      io.emit("sendData", result);
    });
});

/*app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html");
});*/
//ws connection
io.on("connection", function (socket) {
  socket.on("sendData", function (msg) {
    io.emit("sendData", msg);
  });
});
function getData() {
  random = Math.floor(Math.random() * 5 + 1);
  // sending random json
  if (random == 1) {
    io.emit("sendData", {
      met: [
        false,
        Math.random(),
        false,
        Math.random(),
        Math.random(),
        false,
        Math.random(),
        true,
        Math.random(),
        false,
        Math.random(),
        true,
        Math.random(),
      ],
      sid: "6a68b92a-cb1f-4062-bf1f-74424fbae065",
      time: 1559903137.1741,
    });
    //console.log("json1");
  }

  if (random == 2) {
    io.emit("sendData", {
      pow: [
        Math.floor(Math.random() * 100 + 1),
        Math.floor(Math.random() * 100 + 1),
        Math.floor(Math.random() * 100 + 1),
        Math.floor(Math.random() * 100 + 1),
        Math.floor(Math.random() * 100 + 1),
        Math.floor(Math.random() * 100 + 1),
        Math.floor(Math.random() * 100 + 1),
        Math.floor(Math.random() * 100 + 1),
        Math.floor(Math.random() * 100 + 1),
        Math.floor(Math.random() * 100 + 1),
        Math.floor(Math.random() * 100 + 1),
        Math.floor(Math.random() * 100 + 1),
        Math.floor(Math.random() * 100 + 1),
        Math.floor(Math.random() * 100 + 1),
        Math.floor(Math.random() * 100 + 1),
        Math.floor(Math.random() * 100 + 1),
        Math.floor(Math.random() * 100 + 1),
        Math.floor(Math.random() * 100 + 1),
        Math.floor(Math.random() * 100 + 1),
        Math.floor(Math.random() * 100 + 1),
        Math.floor(Math.random() * 100 + 1),
        Math.floor(Math.random() * 100 + 1),
        Math.floor(Math.random() * 100 + 1),
        Math.floor(Math.random() * 100 + 1),
        Math.floor(Math.random() * 100 + 1),
      ],
      sid: "21f61088-4ede-4aea-8e74-4f58b1f6b353",
      time: 1583936030.0521,
    });
    //console.log("json2");
  }
  if (random == 3) {
    io.emit("sendData", {
      com: ["pull", Math.random()],
      sid: "79cc669b-af2e-465a-bdc2-0e9bd4aebe80",
      time: 1559903099.348,
    });
    // console.log("json3");
  }

  if (random == 4) {
    io.emit("sendData", {
      mot: [14, 0, 8206, 8187, 8181, 4235, 8668, 8128, 8294, 8237, 7938],
      sid: "462c4d75-113f-4664-a443-3aaa02c178d0",
      time: 1559902927.7428,
    });
    // console.log("json4");
  }

  if (random == 5) {
    io.emit("sendData", {
      fac: ["neutral", "neutral", Math.random(), "clench", Math.random()],
      sid: "a4f69c56-9769-4a4d-950c-490eb5ebe372",
      time: 1559903035.2961,
    });
    // console.log("json5");
  }
}

//ws port
http.listen(2108, function () {
  console.log("listening on *:2108");
  setInterval(getData, 100);
});

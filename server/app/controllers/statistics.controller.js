let mongoUtil = require("../mongo.util");
var Average = require("../../average.js");

const start = Date.now();
console.log(start / 1000);
// getting all Met entrys from MongoDB

exports.getAllMet = (req, res) => {
  mongoUtil.connectToServer(function (err, client) {
    if (err) console.log(err);

    const db = mongoUtil.getDB();

    db.collection("met")
      .find({})
      .toArray(function (err, result) {
        if (err) throw err;
        res.send(result);
      });
  });
};

// getting all Pow entrys from MongoDB
exports.getAllPow = (req, res) => {
  mongoUtil.connectToServer(function (err, client) {
    if (err) console.log(err);

    const db = mongoUtil.getDB();

    db.collection("pow")
      .find({})
      .toArray(function (err, result) {
        if (err) throw err;
        res.send(result);
      });
  });
};

// getting all Pow entrys from a week ago
exports.getAllPowWeek = (req, res) => {
  var currenttimestamp_days;
  currenttimestamp_days.setDate(currenttimestamp_days.getDate() - 7);

  currenttimestamp_days = currenttimestamp_days / 1000;
  mongoUtil.connectToServer(function (err, client) {
    if (err) console.log(err);

    const db = mongoUtil.getDB();

    db.collection("pow")
      .find({ time: { $gt: currenttimestamp_days } })
      .toArray(function (err, result) {
        if (err) throw err;
        res.send(result);
      });
  });
};

// getting all Pow entrys from a Month ago
exports.getAllPowMonth = (req, res) => {
  var currenttimestamp_month = new Date();
  var currenttimestamp = new Date();

  currenttimestamp = currenttimestamp / 1000;

  currenttimestamp_month.setMonth(currenttimestamp_month.getMonth() - 1);

  currenttimestamp_month = currenttimestamp_month / 1000;

  mongoUtil.connectToServer(function (err, client) {
    if (err) console.log(err);

    const db = mongoUtil.getDB();

    db.collection("pow")
      .find({ time: { $gt: currenttimestamp_month } })
      .toArray(function (err, result) {
        if (err) throw err;
        res.send(result);
      });
  });
};

// getting all Met entrys from a week ago
exports.getAllMetWeek = (req, res) => {
  var currenttimestamp_days = new Date();
  currenttimestamp_days.setDate(currenttimestamp_days.getDate() - 7);

  currenttimestamp_days = currenttimestamp_days / 1000;
  mongoUtil.connectToServer(function (err, client) {
    if (err) console.log(err);

    const db = mongoUtil.getDB();

    db.collection("met")
      .find({ time: { $gt: currenttimestamp_days } })
      .toArray(function (err, result) {
        if (err) throw err;
        res.send(result);
      });
  });
};

// getting all Met entrys from a Month ago
exports.getAllMetMonth = (req, res) => {
  var currenttimestamp_month = new Date();
  var currenttimestamp = new Date();

  currenttimestamp = currenttimestamp / 1000;

  currenttimestamp_month.setMonth(currenttimestamp_month.getMonth() - 1);

  currenttimestamp_month = currenttimestamp_month / 1000;

  mongoUtil.connectToServer(function (err, client) {
    if (err) console.log(err);

    const db = mongoUtil.getDB();

    db.collection("met")
      .find({ time: { $gt: currenttimestamp_month } })
      .toArray(function (err, result) {
        if (err) throw err;
        res.send(result);
      });
  });
};

// getting all Met entrys from current day
exports.getAllMetCurrent = (req, res) => {
  var currenttimestamp_one = new Date();

  currenttimestamp_one.setHours(2);
  currenttimestamp_one.setMinutes(0);

  currenttimestamp_one = currenttimestamp_one / 1000;

  mongoUtil.connectToServer(function (err, client) {
    if (err) console.log(err);

    const db = mongoUtil.getDB();

    db.collection("met")
      .find({ time: { $gt: currenttimestamp_one } })
      .toArray(function (err, result) {
        if (err) throw err;
        res.send(result);
      });
  });
};

// getting all Pow entrys from current day
exports.getAllPowCurrent = (req, res) => {
  var currenttimestamp_one = new Date();

  currenttimestamp_one.setHours(2);
  currenttimestamp_one.setMinutes(0);

  currenttimestamp_one = currenttimestamp_one / 1000;

  mongoUtil.connectToServer(function (err, client) {
    if (err) console.log(err);

    const db = mongoUtil.getDB();

    db.collection("met")
      .find({ time: { $gt: currenttimestamp_one } })
      .toArray(function (err, result) {
        if (err) throw err;
        res.send(result);
      });
  });
};

// getting avg Met entrys from current day
exports.getAvgValues = (req, res) => {
  var currenttimestamp_one = new Date();
  var avg = new Average();
  currenttimestamp_one.setHours(2);
  currenttimestamp_one.setMinutes(0);

  currenttimestamp_one = currenttimestamp_one / 1000;

  mongoUtil.connectToServer(function (err, client) {
    if (err) console.log(err);

    const db = mongoUtil.getDB();
    var counter = 0;
    var avgengagement = 0;
    var avgexcitement = 0;
    var avgstress = 0;
    var avgrelaxation = 0;
    var avginterest = 0;
    var avgfocus = 0;

    db.collection("met")
      .find({ time: { $gt: currenttimestamp_one } })
      .toArray(function (err, result) {
        if (err) throw err;

        result.forEach((element) => {
          avgengagement = avgengagement + element.met[1];
          avgexcitement = avgexcitement + element.met[3];
          avgstress = avgstress + element.met[6];
          avgrelaxation = avgrelaxation + element.met[8];
          avginterest = avginterest + element.met[10];
          avgfocus = avgfocus + element.met[12];
          counter++;
        });
        avgengagement = avgengagement / counter;
        avgexcitement = avgexcitement / counter;
        avgstress = avgstress / counter;
        avgrelaxation = avgrelaxation / counter;
        avginterest = avginterest / counter;
        avgfocus = avgfocus / counter;

        avg.engagement = avgengagement;
        avg.excitement = avgexcitement;
        avg.stress = avgstress;
        avg.relaxation = avgrelaxation;
        avg.interest = avginterest;
        avg.focus = avgfocus;

        res.send(avg);
      });
  });
};

// getting avg Met entrys from last week
exports.getAvgValuesLastWeek = (req, res, next) => {
  var currenttimestamp_days = new Date();
  currenttimestamp_days.setDate(currenttimestamp_days.getDate() - 7);

  currenttimestamp_days = currenttimestamp_days / 1000;

  mongoUtil.connectToServer(function (err, client) {
    if (err) console.log(err);

    const db = mongoUtil.getDB();
    var avg = new Average();
    var counter = 0;
    var avgengagement = 0;
    var avgexcitement = 0;
    var avgstress = 0;
    var avgrelaxation = 0;
    var avginterest = 0;
    var avgfocus = 0;

    db.collection("met")
      .find({ time: { $gt: currenttimestamp_days } })
      .toArray(function (err, result) {
        if (err) throw err;

        result.forEach((element) => {
          avgengagement = avgengagement + element.met[1];
          avgexcitement = avgexcitement + element.met[3];
          avgstress = avgstress + element.met[6];
          avgrelaxation = avgrelaxation + element.met[8];
          avginterest = avginterest + element.met[10];
          avgfocus = avgfocus + element.met[12];
          counter++;
        });
        avgengagement = avgengagement / counter;
        avgexcitement = avgexcitement / counter;
        avgstress = avgstress / counter;
        avgrelaxation = avgrelaxation / counter;
        avginterest = avginterest / counter;
        avgfocus = avgfocus / counter;

        avg.engagement = avgengagement;
        avg.excitement = avgexcitement;
        avg.stress = avgstress;
        avg.relaxation = avgrelaxation;
        avg.interest = avginterest;
        avg.focus = avgfocus;

        res.send(avg);
      });
  });
};

// getting avg Met entrys from last month
exports.getAvgValuesLastMonth = (req, res, next) => {
  var currenttimestamp_month = new Date();
  var currenttimestamp = new Date();
  var avg = new Average();

  currenttimestamp = currenttimestamp / 1000;

  currenttimestamp_month.setMonth(currenttimestamp_month.getMonth() - 1);

  currenttimestamp_month = currenttimestamp_month / 1000;

  mongoUtil.connectToServer(function (err, client) {
    if (err) console.log(err);

    const db = mongoUtil.getDB();
    var counter = 0;
    var avgengagement = 0;
    var avgexcitement = 0;
    var avgstress = 0;
    var avgrelaxation = 0;
    var avginterest = 0;
    var avgfocus = 0;

    db.collection("met")
      .find({ time: { $gt: currenttimestamp_month } })
      .toArray(function (err, result) {
        if (err) throw err;

        result.forEach((element) => {
          avgengagement = avgengagement + element.met[1];
          avgexcitement = avgexcitement + element.met[3];
          avgstress = avgstress + element.met[6];
          avgrelaxation = avgrelaxation + element.met[8];
          avginterest = avginterest + element.met[10];
          avgfocus = avgfocus + element.met[12];
          counter++;
        });
        avgengagement = avgengagement / counter;
        avgexcitement = avgexcitement / counter;
        avgstress = avgstress / counter;
        avgrelaxation = avgrelaxation / counter;
        avginterest = avginterest / counter;
        avgfocus = avgfocus / counter;

        avg.engagement = avgengagement;
        avg.excitement = avgexcitement;
        avg.stress = avgstress;
        avg.relaxation = avgrelaxation;
        avg.interest = avginterest;
        avg.focus = avgfocus;

        res.send(avg);
      });
  });
};

// getting avg Met entrys from last year
exports.getAvgValuesLastYear = (req, res) => {
  var currenttimestamp_year = new Date();
  var currenttimestamp = new Date();
  var avg = new Average();

  currenttimestamp = currenttimestamp / 1000;

  currenttimestamp_year.setMonth(currenttimestamp_year.getMonth() - 12);
  currenttimestamp_year = currenttimestamp_year / 1000;

  mongoUtil.connectToServer(function (err, client) {
    if (err) console.log(err);

    const db = mongoUtil.getDB();
    var counter = 0;
    var avgengagement = 0;
    var avgexcitement = 0;
    var avgstress = 0;
    var avgrelaxation = 0;
    var avginterest = 0;
    var avgfocus = 0;

    db.collection("met")
      .find({ time: { $gt: currenttimestamp_year } })
      .toArray(function (err, result) {
        if (err) throw err;

        result.forEach((element) => {
          avgengagement = avgengagement + element.met[1];
          avgexcitement = avgexcitement + element.met[3];
          avgstress = avgstress + element.met[6];
          avgrelaxation = avgrelaxation + element.met[8];
          avginterest = avginterest + element.met[10];
          avgfocus = avgfocus + element.met[12];
          counter++;
        });
        avgengagement = avgengagement / counter;
        avgexcitement = avgexcitement / counter;
        avgstress = avgstress / counter;
        avgrelaxation = avgrelaxation / counter;
        avginterest = avginterest / counter;
        avgfocus = avgfocus / counter;

        avg.engagement = avgengagement;
        avg.excitement = avgexcitement;
        avg.stress = avgstress;
        avg.relaxation = avgrelaxation;
        avg.interest = avginterest;
        avg.focus = avgfocus;

        res.send(avg);
      });
  });
};

// getting avg Alpa Values from last month
exports.getAvgAlphaLastMonth = (req, res) => {
  var currenttimestamp_month = new Date();
  var currenttimestamp = new Date();
  var alphagesamt = 0;

  currenttimestamp = currenttimestamp / 1000;
  currenttimestamp_month.setMonth(currenttimestamp_month.getMonth() - 1);
  currenttimestamp_month = currenttimestamp_month / 1000;

  mongoUtil.connectToServer(function (err, client) {
    if (err) console.log(err);

    const db = mongoUtil.getDB();
    var counter = 0;
    var alpha1 = 0;
    var alpha2 = 0;
    var alpha3 = 0;
    var alpha4 = 0;
    var alpha5 = 0;

    db.collection("pow")
      .find({ time: { $gt: currenttimestamp_month } })
      .toArray(function (err, result) {
        if (err) throw err;

        result.forEach((element) => {
          alpha1 = alpha1 + element.pow[1];
          alpha2 = alpha2 + element.pow[6];
          alpha3 = alpha3 + element.pow[11];
          alpha4 = alpha4 + element.pow[16];
          alpha5 = alpha5 + element.pow[21];
          counter++;
        });
        alpha1 = alpha1 / counter;
        alpha2 = alpha2 / counter;
        alpha3 = alpha3 / counter;
        alpha4 = alpha4 / counter;
        alpha5 = alpha5 / counter;

        alphagesamt = (alpha1 + alpha2 + alpha3 + alpha4 + alpha5) / 5;

        console.log(alphagesamt);
        res.send(alphagesamt.toString());
      });
  });
};

// getting avg Met entrys from yesterday
exports.getAvgValuesYesterday = (req, res) => {
  var currenttimestamp_one = new Date();
  var currenttimestamp_yesterday = new Date();

  var avg = new Average();
  currenttimestamp_one.setHours(2);
  currenttimestamp_one.setMinutes(0);

  currenttimestamp_one = currenttimestamp_one / 1000;

  currenttimestamp_yesterday.setHours(2);
  currenttimestamp_yesterday.setMinutes(0);
  currenttimestamp_yesterday = currenttimestamp_yesterday / 1000;
  currenttimestamp_yesterday = currenttimestamp_yesterday - 86400;

  mongoUtil.connectToServer(function (err, client) {
    if (err) console.log(err);

    const db = mongoUtil.getDB();
    var counter = 0;
    var avgengagement = 0;
    var avgexcitement = 0;
    var avgstress = 0;
    var avgrelaxation = 0;
    var avginterest = 0;
    var avgfocus = 0;

    db.collection("met")
      .find({
        time: { $gt: currenttimestamp_yesterday, $lt: currenttimestamp_one },
      })
      .toArray(function (err, result) {
        if (err) throw err;

        result.forEach((element) => {
          avgengagement = avgengagement + element.met[1];
          avgexcitement = avgexcitement + element.met[3];
          avgstress = avgstress + element.met[6];
          avgrelaxation = avgrelaxation + element.met[8];
          avginterest = avginterest + element.met[10];
          avgfocus = avgfocus + element.met[12];
          counter++;
        });
        avgengagement = avgengagement / counter;
        avgexcitement = avgexcitement / counter;
        avgstress = avgstress / counter;
        avgrelaxation = avgrelaxation / counter;
        avginterest = avginterest / counter;
        avgfocus = avgfocus / counter;

        avg.engagement = avgengagement;
        avg.excitement = avgexcitement;
        avg.stress = avgstress;
        avg.relaxation = avgrelaxation;
        avg.interest = avginterest;
        avg.focus = avgfocus;

        res.send(avg);
      });
  });
};
var avgarray = [];
var avgarray_month = [];

// getting avg Met entrys from every day from the last wekk
exports.getEachDay = (req, res) => {
  var timestamp_gt = new Date();
  var timestamp_lt = new Date();

  timestamp_gt.setHours(2);
  timestamp_gt.setMinutes(0);
  var avg = new Average();
  var avgarray = [];
  var counter = 0;
  var avgengagement = 0;
  var avgexcitement = 0;
  var avgstress = 0;
  var avgrelaxation = 0;
  var avginterest = 0;
  var avgfocus = 0;
  var factor = 86400;

  mongoUtil.connectToServer(async function (err, client) {
    if (err) console.log(err);

    const db = mongoUtil.getDB();
    var timestamp_gt = new Date();
    var timestamp_lt = new Date();

    for (let index = 0; index <= 6; index++) {
      getDataofthistimestamp(index, function (result, index2) {
        var avg = new Average();
        console.log("new index" + index2);
        var counter = 0;
        var avgengagement = 0;
        var avgexcitement = 0;
        var avgstress = 0;
        var avgrelaxation = 0;
        var avginterest = 0;
        var avgfocus = 0;

        //console.log(result);
        result.forEach((element) => {
          avgengagement = avgengagement + element.met[1];
          avgexcitement = avgexcitement + element.met[3];
          avgstress = avgstress + element.met[6];
          avgrelaxation = avgrelaxation + element.met[8];
          avginterest = avginterest + element.met[10];
          avgfocus = avgfocus + element.met[12];
          counter++;
        });
        console.log("---------");
        console.log(counter);
        console.log(avgengagement);
        console.log("---------");

        avgengagement = avgengagement / counter;
        avgexcitement = avgexcitement / counter;
        avgstress = avgstress / counter;
        avgrelaxation = avgrelaxation / counter;
        avginterest = avginterest / counter;
        avgfocus = avgfocus / counter;

        avg.engagement = avgengagement;
        avg.excitement = avgexcitement;
        avg.stress = avgstress;
        avg.relaxation = avgrelaxation;
        avg.interest = avginterest;
        avg.focus = avgfocus;
        avg.day = index2;
        console.log(avg);

        avgarray.push(avg);

        if (avgarray[6] != null) {
          res.send(avgarray);
          mongoUtil.disconnectDB;
        }
      });
    }
  });
};

exports.getEachMonth = (req, res) => {
  var timestamp_gt = new Date();
  var timestamp_lt = new Date();

  timestamp_gt.setHours(2);
  timestamp_gt.setMinutes(0);
  var avg = new Average();
  var counter = 0;
  var avgengagement = 0;
  var avgexcitement = 0;
  var avgstress = 0;
  var avgrelaxation = 0;
  var avginterest = 0;
  var avgfocus = 0;

  mongoUtil.connectToServer(async function (err, client) {
    if (err) console.log(err);

    const db = mongoUtil.getDB();
    var timestamp_gt = new Date();
    var timestamp_lt = new Date();

    for (let index = 0; index <= 11; index++) {
      callback_month(index, function (result, index2) {
        var avg = new Average();

        var counter = 0;
        var avgengagement = 0;
        var avgexcitement = 0;
        var avgstress = 0;
        var avgrelaxation = 0;
        var avginterest = 0;
        var avgfocus = 0;

        //console.log(result);
        result.forEach((element) => {
          avgengagement = avgengagement + element.met[1];
          avgexcitement = avgexcitement + element.met[3];
          avgstress = avgstress + element.met[6];
          avgrelaxation = avgrelaxation + element.met[8];
          avginterest = avginterest + element.met[10];
          avgfocus = avgfocus + element.met[12];
          counter++;
        });

        avgengagement = avgengagement / counter;
        avgexcitement = avgexcitement / counter;
        avgstress = avgstress / counter;
        avgrelaxation = avgrelaxation / counter;
        avginterest = avginterest / counter;
        avgfocus = avgfocus / counter;

        avg.engagement = avgengagement;
        avg.excitement = avgexcitement;
        avg.stress = avgstress;
        avg.relaxation = avgrelaxation;
        avg.interest = avginterest;
        avg.focus = avgfocus;
        avg.month = index2;
        console.log(avg);

        avgarray.push(avg);

        if (avgarray[11] != null) {
          res.send(avgarray);
          mongoUtil.disconnectDB;
        }
      });
    }
  });
};


exports.getEachYear = (req, res) => {
  
  mongoUtil.connectToServer(async function (err, client) {
    if (err) console.log(err);
    const db = mongoUtil.getDB();
    for (let index = 0; index <= 4; index++) {

      callback_year(index, function (result, index2) {
        var avg = new Average();

        var counter = 0;
        var avgengagement = 0;
        var avgexcitement = 0;
        var avgstress = 0;
        var avgrelaxation = 0;
        var avginterest = 0;
        var avgfocus = 0;

        //console.log(result);
        result.forEach((element) => {
          avgengagement = avgengagement + element.met[1];
          avgexcitement = avgexcitement + element.met[3];
          avgstress = avgstress + element.met[6];
          avgrelaxation = avgrelaxation + element.met[8];
          avginterest = avginterest + element.met[10];
          avgfocus = avgfocus + element.met[12];
          counter++;
        });

        avgengagement = avgengagement / counter;
        avgexcitement = avgexcitement / counter;
        avgstress = avgstress / counter;
        avgrelaxation = avgrelaxation / counter;
        avginterest = avginterest / counter;
        avgfocus = avgfocus / counter;

        avg.engagement = avgengagement;
        avg.excitement = avgexcitement;
        avg.stress = avgstress;
        avg.relaxation = avgrelaxation;
        avg.interest = avginterest;
        avg.focus = avgfocus;
        avg.year = index2;
        console.log(avg);

        avgarray.push(avg);

        if (avgarray[4] != null) {
          res.send(avgarray);
          mongoUtil.disconnectDB;
        }
      });
    }
  });
};


function getDataofthistimestamp(index, callback) {
  mongoUtil.connectToServer(function (err, res) {
    if (err) console.log(err);
    var factor = 86400;
    var timestamp_gt_c = new Date();
    var timestamp_lt_c = new Date();
    var avg = new Average();
    var counter = 0;
    var avgengagement = 0;
    var avgexcitement = 0;
    var avgstress = 0;
    var avgrelaxation = 0;
    var avginterest = 0;
    var avgfocus = 0;
    timestamp_gt_c.setHours(2);
    timestamp_gt_c.setMinutes(0);
    timestamp_gt_c = timestamp_gt_c / 1000;
    timestamp_gt_c = timestamp_gt_c - factor * index;
    timestamp_lt_c = timestamp_gt_c + factor;

    const db = mongoUtil.getDB();
    db.collection("met")
      .find({ time: { $gt: timestamp_gt_c, $lt: timestamp_lt_c } })
      .toArray(function (err, result) {
        if (err) throw err;
        console.log("innen" + timestamp_gt_c);
        console.log("innen" + timestamp_lt_c);
        //console.log(result);

        callback(result, index);

        mongoUtil.disconnectDB;
      });
  });
}

function callback_month(index, callback) {
  mongoUtil.connectToServer(function (err, res) {
    if (err) console.log(err);
    var timestamp_gt_c = new Date();
    var timestamp_lt_c = new Date();
    var daycount = timestamp_gt_c.getDate();
    timestamp_gt_c.setDate(timestamp_gt_c.getDate() - (daycount - 1));
    timestamp_gt_c.setHours(2);
    timestamp_gt_c.setMinutes(0);
    timestamp_gt_c.setMonth(timestamp_gt_c.getMonth() - index);

    timestamp_lt_c.setDate(
      timestamp_lt_c.getDate() - (daycount - 1)
    );
    timestamp_lt_c.setHours(2);
    timestamp_lt_c.setMinutes(0);
    timestamp_lt_c.setMonth(
      timestamp_lt_c.getMonth() - index + 1
    );
    timestamp_gt_c = timestamp_gt_c / 1000;
    timestamp_lt_c = timestamp_lt_c / 1000;

    const db = mongoUtil.getDB();
    db.collection("met")
      .find({ time: { $gt: timestamp_gt_c, $lt: timestamp_lt_c } })
      .toArray(function (err, result) {
        if (err) throw err;

        //console.log(result);

        callback(result, index);

        mongoUtil.disconnectDB;
      });
  });
}

function callback_year(index, callback) {
  mongoUtil.connectToServer(function (err, res) {
    if (err) console.log(err);
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

    const db = mongoUtil.getDB();
    db.collection("met")
      .find({ time: { $gt: timestamp_gt_c, $lt: timestamp_lt_c } })
      .toArray(function (err, result) {
        if (err) throw err;

        //console.log(result);

        callback(result, index);

        mongoUtil.disconnectDB;
      });
  });
}
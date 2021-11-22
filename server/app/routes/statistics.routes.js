module.exports = (app) => {
    const statistics = require("../controllers/statistics.controller");
  
    // Retrieve all Data from the Database
  
    //Performance Metrics
    app.get("/findallmet", statistics.getAllMet);
  
    //Band Power
    app.get("/findallpow", statistics.getAllPow);
  
    //Band Power from last month
    app.get("/findallpowlastmonth", statistics.getAllPowMonth);
  
    //Band Power from last week
    app.get("/findallpowlastweek", statistics.getAllPowWeek);
  
    //Performance Metrics from last month
    app.get("/findallmetlastmonth", statistics.getAllMetMonth);
  
    //Performance Metrics from last week
    app.get("/findallmetlastweek", statistics.getAllMetWeek);
  
    //Performance Metrics from last month
    app.get("/findallmetcurrent", statistics.getAllMetCurrent);
  
    //Performance Metrics from last week
    app.get("/findallpowcurrent", statistics.getAllPowCurrent);
  
    //Performance Metrics Avg Values from last month
    app.get("/findAvgLastMonth", statistics.getAvgValuesLastMonth);
  
    //Performance Metrics Avg Values from today
    app.get("/findAvgToday", statistics.getAvgValues);
  
    // Avg Alpha Values from Last Week
    app.get("/findAvgLastWeek", statistics.getAvgValuesLastWeek);
  
    //Performance Metrics Avg Values from Last Year
    app.get("/findAvgLastYear", statistics.getAvgValuesLastYear);
  
    // Avg Alpha Values from Last Month
    app.get("/findAvgAlphaMonth", statistics.getAvgAlphaLastMonth);
  
    // Avg Alpha Values from Yesterday
    app.get("/findAvgYesterday", statistics.getAvgValuesYesterday);
  
    // Avg Values from Each Day
    app.get("/findAvgEachDay", statistics.getEachDay);
  
    // Avg Values from Last 12Months per Month
    app.get("/findAvgEachMonth", statistics.getEachMonth);
  
    // Avg Values from Last 5Years per Year
    app.get("/findAvgEachYear", statistics.getEachYear);
  };
  
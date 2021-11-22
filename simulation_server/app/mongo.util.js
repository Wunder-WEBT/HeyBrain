let MongoClient = require('mongodb').MongoClient;
let url = "mongodb://heybrain:tjNPN4Ay3D8ES@rabbit.beze.vision:27017/heybrain";

let _db;

module.exports = {

  connectToServer: function( callback ) {
    MongoClient.connect(url, function( err, client ) {
      if(client != undefined){
       _db = client.db("heybrain");
      }
      return callback( err );
    } );
  },

  getDB: function() {
    return _db;
  },

  disconnectDB: function() {
    _db.close()
  }

};
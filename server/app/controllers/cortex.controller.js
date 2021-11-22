
const Cortex = require('../services/cortex');
let mongoUtil = require('../mongo.util');

let express = require('express');
const app = express();
const server = require('http').createServer(app)
const io = require('socket.io').listen(server)

let socketUrl = 'wss://localhost:6868'
let user = {
    "license":"aafd1ec8-fd04-46d5-941f-8f21083ea5cb",
    "clientId":"BoQr8ycLmK9nIzApQ8AwubBQ5xUA3Zqhn3CZ43jt",
    "clientSecret":"fF87zW93FkgSQ2gV1uIBpw24PgLG1Q5I1mWrUWFNPZ2o7uig1jCZPQQqiQ9cXhQlNWzpAc0sQcAUTlWj2lvHuRUmeUUweAHJ4sFBv5Bw5dFF8fkctkjI05kRzsNg8nON",
    "debit":1
}

app.get("/", (req, res) => {
    res.json({message: "Welcome to heybrain application." });
});

//require("../routes/statistics.routes.js")(app);
  
server.listen(3000, () => console.log("Server is running on Port 3000"))

let c = new Cortex(user, socketUrl)
let outputStream
// ---------- sub data stream
// have six kind of stream data ['fac', 'pow', 'eeg', 'mot', 'met', 'com']
// user could sub one or many stream at once
let requests = ['met', 'pow']
c.sub(requests)

mongoUtil.connectToServer( function( err, client ) {
    if (err) console.log(err);

    setInterval(function(){
        let stream = c.getState()
        let currentStream = ""

        if(stream != "undefined"){
            stream = JSON.parse(stream)
        
            if(currentStream.sid != stream.sid){
                const db = mongoUtil.getDB()
                
                currentStream = stream

                if(currentStream.met){
                    db.collection("met").insertOne(currentStream, function(err, res) {
                        console.log(currentStream)
                        if (err) throw err;
                    });
                }
                
                if(currentStream.pow){
                    db.collection("pow").insertOne(currentStream, function(err, res) {
                        console.log(currentStream)
                        if (err) throw err;
                    });
                }
                
            }

        }
    } , 10)

    setInterval(function(){
        outputStream = c.getState()
    } , 10)
});


// ---------- training mental command for profile
// // train is do with a specific profile
// // if profile not yet exist, it will be created
// let profileName = 'test'

// // number of repeat train for each action
// // user have 8 seconds for each time of training
// let numberOfTrain = 1

// // always train 'neutral' complete first then train other action
// let trainingActions = ['neutral', 'push']

// c.train(profileName, trainingActions, numberOfTrain)


// ----------- go to live mode after train
// // load profile which already trained then test your mental command
// c.live(profileName)
// ---------------------------------------------------------
  



//Websocket Stream Server
io.on('connection', function(socket){

    console.log('New user connected'); 
    
    setInterval(function(){
        io.emit('sendData', JSON.stringify(outputStream))
    } , 10)
   
    // listen for message from user 
    io.on('createMessage', (newMessage)=>{ 
      console.log('newMessage', newMessage); 
    }); 
  
    // when server disconnects from user 
    io.on('disconnect', ()=>{ 
      console.log('disconnected from user'); 
    }); 
  
});
  
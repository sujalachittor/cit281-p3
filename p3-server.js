/*
    CIT 281 Project 3
    Name: Sujala Chittor
*/
let fs = require('fs');
let fastify = require("fastify")();
let coinCount = require('./p3-module').coinCount;
let coins = require('./p3-module').coins;
let current_reply = undefined;
function sendData(err, data) {
    if (err) {
        current_reply
        .code(500)
        .header("Content-Type", "text/text; charset=utf-8")
        .send("error");  
    } else {
        current_reply
        .code(200)
        .header("Content-Type", "text/html; charset=utf-8")
        .send(data);
    }
}

fastify.get("/", (request, reply) => {
    current_reply = reply;
    fs.readFile(__dirname + '/index.html', (err, data) => {
        //console.log(data); 
        sendData(err, data);
    });
});

fastify.get("/coin", (request, reply) => {
    current_reply = reply;
    let {denom, count} = request.query;
    denom = Number(denom);
    count = Number(count);
    let coinValue = coinCount({denom, count});
    //data = '<h2>Value of '+ count +' of '+ denom +' is '+ coinValue +' </h2><br /><a href="/">Home</a>';
    let data = `<h2>Value of ${count} of ${denom} is ${coinValue}</h2><br /><a href="/">Home</a>`;
    sendData(false, data);
});

fastify.get("/coins", (request, reply) => {
    current_reply = reply;
    let {option} = request.query;
    option = Number(option);
    let coinValue = 0;
    switch(option) {
        case 1: 
        coinValue =
        coinCount({ denom: 5, count: 3 }, { denom: 10, count: 2 });   // option = 1

        break;

        case 2:
            coinValue = coinCount(...coins);    // option = 2

        break;

        default:
    }
    let data = `<h2>Option ${option} value is ${coinValue}</h2><br /><a href="/">Home</a>`;
    sendData(false, data);
});

// Start server and listen to requests using Fastify
const listenIP = "localhost";
const listenPort = 8080;
fastify.listen(listenPort, listenIP, (err, address) => {
  if (err) {
    console.log(err);
    process.exit(1);
  }
  console.log(`Server listening on ${address}`);
})
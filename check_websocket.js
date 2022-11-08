"use strict";

var util = require('util')
  , when = require('when')
  , wamp = require('./wampio/wamp.io');

var protocol = 'wss://';
var host = process.argv[2];
var port = process.argv[3];
var url = process.argv[4];
var family = process.argv[5] !== undefined ? Number(process.argv[5]) : undefined;

var debug = false;
if (process.argv[6] == 'v'){
  debug = true;
  wamp.debug(true, true);
  console.log('Connecting to ' + protocol + host + ':' + port + '/' + url); 
}

setTimeout(function(){
  console.log("Connection timeout");
  process.exit(2);
}, 5000);

process.on('uncaughtException', function (err) {
  console.error(err.stack);
  process.exit(2);
});

var app = wamp.connect(protocol + host + ':' + port + '/' + url,
    // WAMP session was established
    function (session) 
    {
      if (debug) {
        console.log('new wamp session');
      }

      session.call("test", 2)      
        .promise.then(
            // RPC success callback
            function (reply)
            {
              if (debug) {
                console.log("result: " + JSON.stringify(reply));
              }
              if (reply.status == 200) {
                console.log("Websocket connection successful");
                process.exit();
              } else {
                console.log("Websocket connected, but incorrect response given on call (status != 200)");
                process.exit(1);
              }
            },

            // RPC error callback
            function (error, desc) 
            {        
              if (debug) {
                console.log("error: " + desc);
              }
              console.log("Websocket call failed");
              process.exit(2);
            }
        );      
    },

    // WAMP session is gone
    function (session) 
    {
      if (debug) {
        console.log('Wamp session is gone');
      }
      console.log('Wamp connection failed');
      process.exit(2);
    }, 
    {},
    {
      origin: host,
      family: family
    }
  ); 


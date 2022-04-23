const fs = require("fs");
let net = require("net");

let server = net.createServer();

server.on("connection", function(c){
  
  console.log("conección establecida");

  c.on("data", (chunk)=>{
    console.log(chunk.toString());
  })

})

server.on("error", (err) => {
  throw err;
});

server.listen("4000", () => {
  //console.log("server bound");
});

let net = require("net");
let fs = require("fs");
const { Socket } = require("dgram");

async function sendFile(file, ip, port) {


  let client = new net.Socket();

  client.connect(port, ip, function () {
    console.log("Connected to ", ip + ":" + port);
    var readStream = fs.createReadStream(file);

    readStream.on("readable", function(){
      let chunk;
      while( (chunk = readStream.read()) != null){
        client.write(chunk);
      }
      client.end();
    })

  });

  client.on("end", () => {
    console.log('transferencia terminada');
  });

  client.on("error", function(){ //al destruirse el socket desde el server, se ejecuta este evento
    //
  })
}

sendFile('prueba.txt','127.0.0.1','4000');


module.exports = {
  sendFile,
};
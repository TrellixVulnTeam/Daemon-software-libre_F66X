const fs = require("fs");
let net = require("net");

//directorio donde se almacenan los archivos recibidos
var dir = './files';
let server = net.createServer();

server.on("connection", function(c){
  
  console.log("=== conexión establecida ===");

  //compruebo si ya existe el directorio donde se almacenan los archivos, si no existe lo creo
  if (!fs.existsSync(dir)){
    fs.mkdirSync(dir);
  }
  //creo un stream para el archivo con un nombre random
  let ostream = fs.createWriteStream(dir + "/" + newRandomFilename(15));

  c.on("data", (chunk)=>{
    ostream.write(chunk);
  })

  c.on("end", () => {
    console.log("=== conexión finalizada ===")
  })

})

server.on("error", (err) => {
  throw err;
});

server.listen("4000", () => {
  //console.log("server bound");
});

//crea un nombre random para un archivo
function newRandomFilename(length) {
  let res = ''
  let chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let charsLength = chars.length;
  for ( let i = 0; i < length; i++ ) {
    res += chars.charAt(Math.floor(Math.random() * charsLength));
  }
 return res;
}
const dbus = require('dbus-next')
const bus = dbus.systemBus()
const fs = require('fs')
const path = require('path')
const client = require("./client.js")
const PORT = process.env.SAFEPORT || 4000
const HOST = process.env.SAFEHOST || '127.0.0.1'



async function waitForDevices(){
    let job_path;
    let block_device;
    let obj = await bus.getProxyObject('org.freedesktop.UDisks2','/org/freedesktop/UDisks2')
    let manager = obj.getInterface('org.freedesktop.DBus.ObjectManager')

    manager.on('InterfacesAdded', (path, dict) => {
        
        if('org.freedesktop.UDisks2.Job' in dict){
            job_path = path;
        }
        else{
            if (path.includes("block_devices")){
                let splitted = path.split('/')
                block_device = splitted[splitted.length-1].trim()
            }
        }
    })

    manager.on('InterfacesRemoved', async (path, dict) => {
        if(path == job_path){
            scanFiles(await getRoute(block_device));
        }
    })
}

async function scanFiles(route){

    let array = []
    let files = getAllFiles(route,array)

    files.forEach( (file) => {
        console.log(file);
        if (!file.includes("System Volume Information")) 
            client.sendFile(file,HOST,PORT)
    })
}

//Obtiene todos los archivos recursivamente a partir de un directorio
const getAllFiles = function(dirPath, arrayOfFiles) {
    files = fs.readdirSync(dirPath)
  
    arrayOfFiles = arrayOfFiles || []
  
    files.forEach(function(file) {
      if (fs.statSync(dirPath + "/" + file).isDirectory()) {
        arrayOfFiles = getAllFiles(dirPath + "/" + file, arrayOfFiles)
      } else {
        arrayOfFiles.push(path.join(dirPath, "/", file))
      }
    })
    return arrayOfFiles
  }

  //Obtiene el mount path del dispositivo conectado
  async function getRoute(block_device) {
      let mounts = fs.readFileSync("/etc/mtab",{'encoding':'ascii'}).split("\n")
      for (i in mounts){
          let mount_detail = mounts[i].split(" ")
          if (mounts[i].includes(block_device)){
              return mount_detail[1];
          }
      }
      return false;
  }

waitForDevices()
//scanFiles()


/*
async function scanFiles(){
    const ruta = path.join('/', 'media');
    //passsing directoryPath and callback function
    fs.readdir(ruta, function (err, files) {
        //handling error
        if (err) {
            return console.log('no se pudo escanear el directorio: ' + err);
        } 
        //por cada file
        files.forEach(function (file) {
            // Do whatever you want to do with the file
            pendrive_path = path.join(ruta, file);
            
            fs.readdir(pendrive_path, function (err, files){
                //dentro del pendrive hago lo que quiero con los files
                if (err) {
                    return console.log('no se pudo escanear el directorio: ' + err);
                }
                files.forEach(function (file) {

                    console.log(file)

                })
            });
        });
    });
}

*/
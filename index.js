const dbus = require('dbus-next')
const bus = dbus.systemBus()
const fs = require('fs')
const path = require('path')
const client = require("./client.js")


async function waitForDevices(){
    let job_path;
    let obj = await bus.getProxyObject('org.freedesktop.UDisks2','/org/freedesktop/UDisks2')
    let manager = obj.getInterface('org.freedesktop.DBus.ObjectManager')

    manager.on('InterfacesAdded', (path, dict) => {
        //console.log(dict)
        if('org.freedesktop.UDisks2.Job' in dict){
            //console.log(dict)
            job_path = path;
        }
    })

    manager.on('InterfacesRemoved', async (path, dict) => {
        if(path == job_path){
            scanFiles();
        }
    })
}

async function scanFiles(){
    const ruta = path.join('/', 'media');
    let array = []
    let files = getAllFiles(ruta,array)

    files.forEach( (file) => {
        client.sendFile(file,'127.0.0.1','4000')
        //console.log(file)
    })
}

//obtiene todos los archivos recursivamente a partir de un directorio
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
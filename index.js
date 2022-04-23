const dbus = require('dbus-next')
const bus = dbus.systemBus()
const fs = require('fs')
const path = require('path')


async function waitForDevices(){
    let obj = await bus.getProxyObject('org.freedesktop.UDisks2','/org/freedesktop/UDisks2')
    let manager = obj.getInterface('org.freedesktop.DBus.ObjectManager')
    //console.log( await manager.GetManagedObjects())

    manager.on('InterfacesAdded', (path, dict) => {
        if('org.freedesktop.UDisks2.Job' in dict){
            //console.log("funciona")
            scanFiles()
        }
        //console.log(dict)
        //console.log('================================================================')
    })


}

async function scanFiles(){
    const ruta = path.join('/', 'media', 'july','JULY');
    //passsing directoryPath and callback function
    fs.readdir(ruta, function (err, files) {
        //handling error
        if (err) {
            return console.log('no se pudo escanear el directorio: ' + err);
        } 
        //por cada file
        files.forEach(function (file) {
            // Do whatever you want to do with the file
            console.log(file)
        });
    });
}


waitForDevices()
//scanFiles()


/*
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
*/

/*
async function scanFiles(){
    const ruta = path.join('/', 'media', 'july');
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
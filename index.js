const dbus = require('dbus-next')
const bus = dbus.systemBus()

async function getDevice(){
    let obj = await bus.getProxyObject('org.freedesktop.UDisks2','/org/freedesktop/UDisks2')

    let manager = obj.getInterface('org.freedesktop.DBus.ObjectManager')

    manager.on('InterfacesAdded', () => console.log('se agregó un dispositivo'))
    manager.on('InterfacesRemoved', () => console.log('se quitó un dispositivo'))
}


async function listDevices(){
    let obj = await bus.getProxyObject('org.freedesktop.UDisks2','/org/freedesktop/UDisks2')

    let manager = obj.getInterface('org.freedesktop.DBus.ObjectManager')

    //console.log( await manager.GetManagedObjects())

    manager.on('InterfacesAdded', (path, dict) => {console.log(dict)})


}

//getDevice()
listDevices()
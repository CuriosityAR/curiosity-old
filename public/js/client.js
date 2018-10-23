'use strict'

import { Gyroscope } from './lib/gyroscope.js'
import { Camera } from './lib/camera.js'
import { Loc } from './lib/loc.js'
import { Device } from './lib/device.js'

window.onload = () => {
    const mobile = new Device(Gyroscope, Camera, Loc)
    
    mobile.Camera.watch()
    // mobile.Gyroscope.trace(axes => console.log(axes))
    // mobile.Loc.trace(pos => console.log(pos))
}
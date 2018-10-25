'use script'

import { Gyroscope } from './gyroscope.js'
import { Camera } from './camera.js'
import { Geolocation } from './geolocation.js'

export class Device {
    constructor(components = {}) {
        if (components.geolocation)
            this.geolocation = new Geolocation()

        if (components.orientation)
            this.orientation = new Gyroscope()
            
        if (components.camera)
            this.camera = new Camera()
    }
}
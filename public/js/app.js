'use strict'

import { Device } from './lib/device.js'
import { HTTP } from './lib/http.js'

const BOX_COLLIDER = 150
const COMPASS_ANGLE = 40
const COMPASS_ERR = 100
const TSLEEP = 200

var dLat = document.querySelector('#lat')
var dLon = document.querySelector('#lon')
var dObj = document.querySelector('#object')
var trig = document.querySelector('#trigger')
var tBox = document.querySelector('#triggerContent')
var tLabel = document.querySelector('#label')
var tDesc = document.querySelector('#describe')
var menu = document.querySelector('#nav')
var burger = document.querySelector('#burger')

// Initialize the mobile device
let mobile = new Device({
    geolocation: true,
    orientation: true,
    camera: true
})

// Launch the components
mobile.camera.watch()
mobile.geolocation.trace()
mobile.orientation.trace()

// Retrieve locations base and process it
HTTP.get('/locations', locs => {
    setInterval(() => {
        // Retrieve matched locs in relation with the radius of triggering
        for (let loc of locs) {
            let dist = mobile.geolocation.dist(
                mobile.geolocation.lat,
                mobile.geolocation.lon,
                loc.lat,
                loc.lon
            )
            
            // Location matched with radius triggering
            if (dist < BOX_COLLIDER) {
                let bearing = mobile.geolocation.bearing(
                    mobile.geolocation.lat,
                    mobile.geolocation.lon,
                    loc.lat,
                    loc.lon
                )
                
                // Compass matched with bearing
                if (mobile.orientation.compassHeading() < (bearing + COMPASS_ANGLE + COMPASS_ERR) &&
                    mobile.orientation.compassHeading() > (bearing - COMPASS_ANGLE + COMPASS_ERR))
                    showTrigger(loc.label, loc.describe)
                else resetTrigger()
            }
        }

        updateLatLon()
    }, TSLEEP)
})

function showTrigger(label, describe) {
    let rotateY = 0
    let range = 50
    tLabel.textContent = label
    tDesc.textContent = describe
    
    if (mobile.orientation.gamma < -range) rotateY = -range
    else if (mobile.orientation.gamma > range) rotateY = range
    else rotateY = mobile.orientation.gamma

    tBox.style.transform = `rotateY(${rotateY}deg)`

    dObj.textContent = label
    trig.style.opacity = 1
}

function resetTrigger() {
    dObj.textContent = 'n/a'
    trig.style.opacity = 0
}

function updateLatLon() {
    dLat.textContent = mobile.geolocation.lat
    dLon.textContent = mobile.geolocation.lon
}

burger.addEventListener('click', e => menu.style.opacity = menu.style.opacity == 1 ? 0 : 1)

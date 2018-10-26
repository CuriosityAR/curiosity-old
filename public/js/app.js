'use strict'

import { Device } from './lib/device.js'
import { HTTP } from './lib/http.js'

const BOX_COLLIDER = 8000
const COMPASS_ANGLE = 20
const COMPASS_ERR = 0
const TSLEEP = 200
const NB_VIBRATIONS = 0

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
                
                console.log(`loc: ${loc.label}\nbearing: ${bearing}\ncompass: ${mobile.orientation.compassHeading()}\n`)

                // Compass matched with bearing
                if (mobile.orientation.compassHeading() < (bearing + COMPASS_ANGLE + COMPASS_ERR) % 360 &&
                    mobile.orientation.compassHeading() > (bearing - COMPASS_ANGLE + COMPASS_ERR) % 360) {
                    showTrigger(loc.label, loc.describe)
                    break
                }  else resetTrigger()
            }
        }

        updateLatLon()
    }, TSLEEP)
})

function showTrigger(label, describe) {
    let rotateY = 0
    let range = 50

    window.navigator.vibrate([500, 500])

    tLabel.textContent = label
    tDesc.textContent = describe

    // console.log('trigger: ' + label)
    
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

function vibrate(ms) {
    window.navigator.vibrate(ms)
}

burger.addEventListener('click', e => menu.style.opacity = menu.style.opacity == 1 ? 0 : 1)

'use strict'

import { Gyroscope } from './lib/gyroscope.js'
import { Camera } from './lib/camera.js'
import { Loc } from './lib/loc.js'
import { Map } from './lib/map.js'
import { Device } from './lib/device.js'
import { HTTP } from './lib/http.js'

window.onload = () => {
    const mobile = new Device(Gyroscope, Camera, Loc)
    var curLat = 0
    var curLon = 0
    var debugObject = document.querySelector('#debugger #object')
    var debugLat = document.querySelector('#debugger #lat')
    var debugLon = document.querySelector('#debugger #lon')
    
    mobile.Camera.watch()
    // mobile.Gyroscope.trace(axes => console.log(axes))

    HTTP.get('/locations', locs => {
        mobile.Loc.trace(pos => {
            curLat = pos.lat
            curLon = pos.lon

            debugLat.innerHTML = `lat: <span style="color:#ffffffb9">${pos.lat}</span>`
            debugLon.innerHTML = `lon: <span style="color:#ffffffb9">${pos.lon}</span>`

            console.log(`latlon(${pos.lat};${pos.lon})`)
    
            for (let loc of locs) {
                if (mobile.Loc.distance(pos.lat, pos.lon, loc.lat, loc.lon) < 12) {
                    console.log(`Locations matched with : ${loc.label}`)
                    debugObject.innerHTML = `object: <span style="color:#19c059">${loc.label}</span>` 
                    break
                }
    
                debugObject.innerHTML = 'object: <span style="color:#ffffff6e">matching ...</span>'
            }
        })
    })

    document.querySelector('#addloc button').addEventListener('click', e => {
        let form = document.querySelector('#addlocform')

        if (form.style.display !== 'flex')
            form.style.display = 'flex'
        else
            form.style.display = 'none'
    })

    document.querySelector('#addlocform #addlocbuttons button[type="cancel"]')
        .addEventListener('click', e => {
        let form = document.querySelector('#addlocform')
        form.style.display = 'none'
    })

    document.querySelector('#addlocform #addlocbuttons button[type="submit"]')
        .addEventListener('click', e => {
        let label = document.querySelector('#addlocform input[name="label"]')
        let describe = document.querySelector('#addlocform textarea')

        if (label.value && describe.value) {
            HTTP.post('/locations', {
                headers: {
                    'Content-Type': 'application/json'
                },
                body: {
                    label: label.value,
                    describe: describe.value,
                    lat: curLat,
                    lon: curLon
                }
            }, res => {
                if (res === 'OK')
                    alert(`New location added :\nlabel: ${label.value}\nlat: ${curLat}\nlon: ${curLon}`)
                else
                    alert(`Could not add this location : label "${label.value}" already exist.`)

                label.value = null
                describe.value = null

                console.log(`Added new location : ${res}`)
            })
        }
    })
}

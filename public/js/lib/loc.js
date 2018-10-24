'use strict'

export class Loc {
    constructor() {}

    trace(handler) {
        if (!navigator.geolocation)
            throw alert('Geolocation service is not allowed to this device')

        navigator.geolocation.watchPosition(
            pos => handler({
                lat: pos.coords.latitude,
                lon: pos.coords.longitude
            }),
            err => { 
                throw alert(err.message) 
            },
            {
                enableHighAccuracy: true,
                timeout: 10000
            }
        )
    }

    /**
     * 
     * @param {*} lat1
     * @param {*} lon1 
     * @param {*} lat2 
     * @param {*} lon2 
     */
    distance(lat1, lon1, lat2, lon2) {
        lat1 = this.toRad(lat1)
        lat2 = this.toRad(lat2)
        lon1 = this.toRad(lon1)
        lon2 = this.toRad(lon2)

        let R = 6378.137
        let dLat = lat2 - lat1
        let dLon = lon2 - lon1
        let a = Math.sin(dLat/2) * Math.sin(dLat/2) +
                Math.cos(lat1) * Math.cos(lat2) *
                Math.sin(dLon/2) * Math.sin(dLon/2)

        let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a))
        let d = R * c

        return d * 1000
    }

    toRad(deg) {
        return deg * Math.PI / 180
    }
}
'use strict'

export class Geolocation {
    constructor() {
        this.lat = null
        this.lon = null
    }

    trace() {
        if (!navigator.geolocation)
            throw alert('Geolocation service is not allowed to this device')

        navigator.geolocation.watchPosition(
            (pos) => {
                this.lat = pos.coords.latitude
                this.lon = pos.coords.longitude
            },
            err => { 
                throw alert(err.message) 
            },
            {
                enableHighAccuracy: true,
                timeout: 10000
            }
        )
    }

    toRad(deg) {
        return deg * Math.PI / 180
    }

    toDeg(radians) {
        return radians * 180 / Math.PI;
    }

    dist(lat1, lon1, lat2, lon2) {
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
      
    bearing(startLat, startLng, destLat, destLng){
        startLat = this.toRad(startLat);
        startLng = this.toRad(startLng);
        destLat = this.toRad(destLat);
        destLng = this.toRad(destLng);

        let y = Math.sin(destLng - startLng) * Math.cos(destLat);
        let x = Math.cos(startLat) * Math.sin(destLat) -
                Math.sin(startLat) * Math.cos(destLat) * Math.cos(destLng - startLng);
        let brng = Math.atan2(y, x);
        brng = this.toDeg(brng);

        return (brng + 360) % 360;
    }
}
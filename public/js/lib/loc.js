'use strict'

export class Loc {
    static trace(handler) {
        if (!navigator.geolocation)
            throw alert('Geolocation service is not allowed to this device')

        setTimeout(() => {
            navigator.geolocation.getCurrentPosition(
                pos => {
                    handler(pos)
                    this.trace(handler)
                },
                err => { 
                    throw alert(err.message) 
                }
            )
        }, 200)
    }
}
'use strict'

export class Gyroscope {
    constructor() {}

    trace(handler) {
        window.addEventListener('deviceorientation', e => {
            handler({
                x: e.gamma,
                y: e.beta,
                z: e.alpha,
                abs: e.absolute
            })
        })
    }
}
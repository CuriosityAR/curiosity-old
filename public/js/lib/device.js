'use script'

export class Device {
    constructor() {
        for (let arg of arguments) {
            this[arg.name] = new arg
        }
    }

    fullscreen() {
        let el = document.body;

        if (el.requestFullscreen) el.requestFullscreen()
        else if (el.mozRequestFullScreen) el.mozRequestFullScreen()
        else if (el.webkitRequestFullscreen) el.webkitRequestFullscreen()
        else if (el.msRequestFullscreen) el.msRequestFullscreen()
    }
}
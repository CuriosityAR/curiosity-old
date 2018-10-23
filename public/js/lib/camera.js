'use strict'

export class Camera {
    constructor() {
        this._video = null
        this._createVideo()
    }

    _createVideo() {
        this._video = document.createElement('video')

        this._video.setAttribute('autoplay', true)
        
        this._video.style.position = 'fixed'
        this._video.style.top = 0
        this._video.style.left = 0
        this._video.style.minWidth = '100%'
        this._video.style.minHeight = '100%'

        this._video.addEventListener('orientationchange', e => {
            this._video.style.minWidth = '100%'
            this._video.style.minHeight = '100%'
        })

        document.body.appendChild(this._video)
    }

    watch() {
        if (!navigator.mediaDevices.getUserMedia)
            throw alert('Camera access not supported with this device.')

        navigator.mediaDevices.getUserMedia({
            video: {
                facingMode: {
                    exact: 'environment'
                } 
            }
        }).then(stream => this._video.srcObject = stream)
          .catch(err => console.log(`[err] ${err}`))
    }
}
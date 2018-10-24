'use strict'

export class Map {
    constructor() {
        this._map = null
        this._drawGrid(50)
        // this._createMap()
    }

    _createMap() {
        let canvas = document.createElement('canvas')
        this._map = canvas.getContext('2d')

        canvas.setAttribute('width', window.innerWidth)
        canvas.setAttribute('height', window.innerHeight)

        this._drawMap()

        document.body.appendChild(canvas)
    }

    _drawMap() {
        this._map.beginPath()
        this._map.rect(0, 0, this._map.lineWidth, this._map.height)
        this._map.closePath()
    }

    _drawGrid(size) {
        let canvas = document.createElement('canvas')
        let ctx = canvas.getContext('2d')

        canvas.style.position = 'fixed'
        canvas.style.top = 0
        canvas.style.left = 0

        canvas.setAttribute('width', window.innerWidth)
        canvas.setAttribute('height', window.innerHeight)

        for (let i = 0; i < canvas.width / size; ++i) {
            for (let j = 0; j < canvas.height / size; ++j) {
                ctx.beginPath()
                ctx.rect(i * size, j * size, size, size)
                ctx.strokeStyle = '#f2f2f2'
                ctx.stroke()
                ctx.closePath()
            }
        }

        document.body.appendChild(canvas)
    }
}
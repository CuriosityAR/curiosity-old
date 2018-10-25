'use strict'

export class Gyroscope {
    constructor() {
        this.alpha = null
        this.beta = null
        this.gamma = null
    }

    trace() {
        window.addEventListener('deviceorientation', e => {
            this.alpha = e.alpha
            this.beta = e.beta
            this.gamma = e.gamma
        })
    }

    compassHeading() {
        let _x = this.beta  ? this.beta  * (Math.PI / 180) : 0; // beta value
        let _y = this.gamma ? this.gamma * (Math.PI / 180) : 0; // gamma value
        let _z = this.alpha ? this.alpha * (Math.PI / 180) : 0; // alpha value
      
        let cX = Math.cos( _x );
        let cY = Math.cos( _y );
        let cZ = Math.cos( _z );
        let sX = Math.sin( _x );
        let sY = Math.sin( _y );
        let sZ = Math.sin( _z );
      
        // Calculate Vx and Vy components
        let Vx = - cZ * sY - sZ * sX * cY;
        let Vy = - sZ * sY + cZ * sX * cY;
      
        // Calculate compass heading
        let compassHeading = Math.atan( Vx / Vy );
      
        // Convert compass heading to use whole unit circle
        if ( Vy < 0 )
            compassHeading += Math.PI;
        else if ( Vx < 0 )
            compassHeading += 2 * Math.PI;
      
        return compassHeading * ( 180 / Math.PI ); // Compass Heading (in degrees)
    }
}
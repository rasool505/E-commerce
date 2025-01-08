import React from 'react'
import './Error403.css';

export default function Error403(){
  return <div className='error403'>
        <div className="message">You are not authorized.
        </div>
        <div className="message2">You tried to access a page you did not have prior authorization for.</div>
        <div className="cont">
            <div className="neon">403</div>
            <div className="door-frame">
            <div className="door">
                <div className="rectangle">
            </div>
                <div className="handle1">
                </div>
                <div className="window">
                <div className="eye">
                </div>
                <div className="eye eye2">
                </div>
                <div className="leaf1">
                </div> 
                </div>
            </div>  
            </div>
        </div>
  </div>
}

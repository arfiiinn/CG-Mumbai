import React from 'react'
import Auth401 from "../../images/computer.png"

function Unauthorized() {
  return (
    <div>
        <center className='mt-5 mb-5 p-5'>
        <img src={Auth401} alt="401 - Unauthorised to view page"/>
        <h3 className='mt-5 mb-5 p-5'>Please log in to access this page!</h3>
    </center>
    </div>
  )
}

export default Unauthorized
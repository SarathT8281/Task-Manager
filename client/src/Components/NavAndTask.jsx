
import React from 'react'
import Navbar from './Navbar'
import Tasks from './Tasks'

function NavAndTask() {
  return (
    <div>
        <Navbar/>
        <div style={{marginTop:'20px'}}>
        <Tasks/>
        </div>
        
        
        
    </div>
  )
}

export default NavAndTask
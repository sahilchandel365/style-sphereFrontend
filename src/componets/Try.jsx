import React, { useState } from 'react'

export default function Try() {
    const [data,setdata]=useState()

    const a=[{
      name:"sahil",
      age:"22",
      class:"mern",
    },{name:"rohan",
    age:"21",
    class:"mern",}]  
    const handle= ()=>{
     
      setdata(a);
    
    }
    console.log(data);
  return (
    <div>
              <button  type='submit' onClick={handle}> submit</button>

    </div>
  )
}


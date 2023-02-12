import React, { useEffect } from 'react'

const T2 = () => {

    useEffect(() => {
      console.log("component mounted")
    
      return () => {
        console.log("component un - mounted")
      }
    }, [])
    
  return (
    <div>t2</div>
  )
}




export default T2
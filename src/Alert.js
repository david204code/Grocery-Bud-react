import React, { useEffect } from 'react'

const Alert = ({ type, msg, removeAlert }) => {
  
  useEffect(() => {
    // clean up function
    const timeout = setTimeout(() => {
      removeAlert();
    }, 3000)
    return() => clearTimeout(timeout)
  }, [])
  return (
    // template string in className
    <p className ={`alert alert-${type}`}>{msg}</p>
  );
}

export default Alert

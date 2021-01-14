import React, { useEffect } from 'react'

const Alert = ({ type, msg }) => {
  return (
    // template string in className
    <p className ={`alert alert-${type}`}>{msg}</p>
  );
}

export default Alert

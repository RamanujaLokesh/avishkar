import React from 'react'
import { socket } from '../socket'

const ConnectionManager = () => {
    const connect = ()=>{
        socket.connect();

    }
    const disconnect = ()=>{
        socket.disconnect();
    }
  return (
   
    <>
    <button onClick={connect}> connect</button>
    <button onClick={disconnect}>disconnect</button>
    </>
  )
}

export default ConnectionManager
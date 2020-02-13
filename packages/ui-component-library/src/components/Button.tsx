import React, { Children } from 'react'
import '../style.css'

export const Button = ({...props}: { children: string}) => (
  <button className="ripple text-white bg-green-400 rounded p-2 w-32 h-12">
    {props.children}
  </button>)
  

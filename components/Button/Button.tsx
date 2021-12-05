import styles from './Button.module.scss'
import React from "react";

export default function (props) {

  const blackButton = (
    <div style={props.style} color={props.color} className={styles.blackButton} onClick={()=>{
      if(props.onClick)
        props.onClick()
    }}>
      {props.children}
    </div>
  )
  let button=blackButton



  return (
    button
  )
}

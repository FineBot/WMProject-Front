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

  let button = null

  switch (props.type) {
    case 'more':
      button = (
        <div style={props.style} className={styles.moreButton} onClick={(e) => props?.onClick(e)}>
          {props.children}
        </div>
      )
      break;
    case 'black':
      button = blackButton
      break;
    default:
      button = blackButton;
      break;
  }

  return (button)
}

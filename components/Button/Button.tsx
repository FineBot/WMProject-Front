import styles from './Button.module.scss'
import React from "react";

export default function (props) {

  const blackButton = (
    <div style={props.style} className={styles.blackButton} onClick={(e) => props?.onClick(e)}>
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

import styles from './Button.module.scss'
import React from "react";

export default function (props) {

  // @ts-ignore
  const blackButton = (
    <div style={props.style} className={styles.blackButton}>
      {props.children}
    </div>
  )
  return (
    blackButton
  )
}

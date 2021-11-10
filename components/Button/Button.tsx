import styles from './Button.module.scss'

export default function (props){

  // @ts-ignore
  const blackButton=(
    <div style={props.style} className={styles.parent} type={"blackButton"}>
      {props.children}
    </div>
  )

  return(blackButton)
}

import styles from './Input.module.scss'

export default function (props){

  return(
    <div className={styles.parent}>
      <input
        placeholder={props.placeholder}
      />
    </div>
  )
}

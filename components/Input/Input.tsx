import styles from './Input.module.scss'

export default function (props){

  return(
    <div className={styles.parent}>
      <input
        value={props.value}
        onInput={(e)=>props?.onInput(e.target.value)}
        placeholder={props.placeholder}
      />
    </div>
  )
}

import styles from './AboutUser.module.scss'

export default function (props) {
  const colors = ["#7328B9", "#AD1A9C", "#23A1BD", "#2CD88E", "#E28DA8", "#7328B9"]
  return (
    <div className={styles.parent}>
      <img alt={"Фотография"} style={{borderColor: colors[props.index % colors.length]}} className={styles.logo}
           src={props.src}/>
      <div className={styles.fio}>{props.fio}</div>
      <div className={styles.role}>{props.role}</div>
      <div className={styles.desc}>{props.desc}</div>
    </div>
  )
}

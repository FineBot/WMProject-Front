import styles from './Blog.module.scss'

export default function (props){

  return(
    <div id={props.name} className={styles.parent}>
      <h1>Блог</h1>
      <div>
        Блога пока нет, но он скоро обязательно будет
      </div>
    </div>
  )
}

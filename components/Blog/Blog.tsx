import styles from './Blog.module.scss'
import Input from "../Input/Input";

export default function (props) {


  return (
    <div id={props.name} className={styles.parent}>
      <h1>Новости</h1>
      <div className={styles.blogParent}>
        <div className={styles.content}>
          <BlogElement/>
          <BlogElement/>
          <BlogElement/>
          <BlogElement/>
          <BlogElement/>
          <BlogElement/>
          <BlogElement/>
        </div>
        <div className={styles.paramsParent}>
          <div className={styles.stickyContainter}>
            <Input placeholder={"Поиск по статьям"}/>
            <h1>Тэги</h1>
            <div className={styles.tags}>

            </div>
            <hr/>
            <h1>Ссылки</h1>
            <div>

            </div>
          </div>
        </div>
      </div>
    </div>
  )
}


const BlogElement = () => {

  return (
    <div className={styles.blogElement}>
      <div className={styles.img}/>
      <div className={styles.tags}>
        <Tag title={"бла бла бла"}/>
        <Tag title={"бла бла бла"}/>
        <Tag title={"бла бла бла"}/>
        <Tag title={"бла бла бла"}/>
      </div>
      <h1>Заголовок</h1>
      <div className={styles.date}>14.11.2002</div>
      <div className={styles.desc}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur cupiditate ea fugiat, illo incidunt
        labore magnam natus nisi non optio ratione rerum sed sequi. Fugiat illo neque non sequi tenetur?
      </div>
    </div>
  )
}

const Tag=(props)=>{

  return(
    <div className={styles.tag}>
      {props.title}
    </div>
  )
}

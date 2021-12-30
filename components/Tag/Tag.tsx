import styles from "../Blog/Blog.module.scss";

export default function Tag(props) {

  return (
    <div className={styles.tag} id={props.active?.toString()} onClick={props.onClick}>
      {props.title}
      <div className={styles.closeTag} onClick={(e) => {
        e.stopPropagation();
        if(props.onIconClick)
          props?.onIconClick(e)
      }}>
        <div/>
        <div/>
      </div>
    </div>
  )
}

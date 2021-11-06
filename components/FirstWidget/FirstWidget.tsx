import styles from './FirstWidge.module.scss'
import {getHeader} from "../Header/Header";

export default function (props) {

  return (
    <div className={styles.parent}>
      <h1>Адаптируем сайты для людей, с особенностью зрения</h1>
      <img src={"/static/images/blind.png"}/>
    </div>
  )
}

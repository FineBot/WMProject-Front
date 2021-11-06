import Header from '../components/Header/Header'
import styles from './styles.module.scss'
import FirstWidget from "../components/FirstWidget/FirstWidget";

export default function (props) {

  return (
    <div className={styles.parent}>
      <Header/>
        <FirstWidget/>
        <FirstWidget/>


    </div>
  )
}

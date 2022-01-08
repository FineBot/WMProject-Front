import styles from './About.module.scss'
import AboutUser from "../AboutUser/AboutUser";

export default function (props) {

  const data = [
    {
      fio: "Даниил Хачатуров",
      desc: null,
      img:"/static/images/avatar/ava4.png",
      role: "Основатель и CEO"
    },
    {
      fio: "Гульшат Суханова",
      img:"/static/images/avatar/ava2.png",
      role: "Научный руководитель"
    },
    {
      fio: "Ринат Шайдуллин",
      img:"/static/images/avatar/ava3.png",
      role: "Технический руководитель"
    },
    {
      fio: "Валентина Вагарина",
      img:"/static/images/avatar/ava1.png",
      role: "Ассистент CEO"
    },
    {
      fio: "Баикин Кирилл",
      img:"/static/images/avatar/ava5.png",
      role: "Frontend разработчик"
    },

  ]

  return (
    <div id={props.name} className={styles.parent}>
      <div style={{paddingTop: "80px"}}>
        <h1>О нас</h1>
        <div className={styles.contentParent}>
          <div className={styles.about}>
            Мы обеспечиваем адаптацию веб сайтов и приложений для людей с особыми потребностями.
          </div>

          <div className={styles.content}>
            {data.map((e, i) => {

              return (
                <AboutUser
                  index={i}
                  src={e.img}
                  role={e.role}
                  desc={e.desc}
                  fio={e.fio}/>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

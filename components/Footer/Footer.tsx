import styles from './Footer.module.scss'
import React from "react";

export default function Footer(props){

  return (
    <div className={styles.parent}>

      <div>
        <h2>Контакты</h2>
        <div className={styles.linkObj}>
          <img src="/static/images/youtube.png" alt="Иконка YouTube"/>
          <a href="https://www.youtube.com/channel/UCXhnxNBgZ1_8jbOaPMeHAwQ" target={"_blank"}>YouTube</a>
        </div>
        <div className={styles.linkObj}>
          <img style={{padding:"13px 0px", margin:"-10px 0px"}} src="/static/images/telegram.png" alt="Иконка Telegram"/>
          <a href={"https://t.me/d_ts_622002"} target={"_blank"}>@d_ts_622002</a>
        </div>
        <div className={styles.linkObj}>
          <img src="/static/images/email.png" alt="Иконка Telegram"/>
          <a href={"mailto:request@wm-24.website"} target={""}>request@wm-24.website</a>
        </div>
      </div>
      <div>
        <img src="/static/images/contact.svg" alt="Картинка свяжитесь с нами"/>
      </div>
    </div>
  )
}

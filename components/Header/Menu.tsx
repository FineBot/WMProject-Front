import styles from './Header.module.scss'
import {useEffect, useState} from "react";


let lastI = 0
export default function (props) {
  const [activeTab, setActiveTab] = useState(0)
  const [underlineParams, editUnderlineParams] = useState({width: "0px", marginLeft: "-2px"})
  const tabs = ["Home", "About", "Works", "Blog"]

  useEffect(() => {
    let elem = document.getElementById("menuItemId" + activeTab.toString())
    let elemMenu = document.getElementById("menu")
    editUnderlineParams({
      width: (elem.offsetWidth).toString() + "px",
      marginLeft: (elem.offsetLeft - elemMenu.offsetLeft - 2).toString() + "px",
    })
    window.onresize = () => {
      let elem = document.getElementById("menuItemId" + activeTab.toString())
      let elemMenu = document.getElementById("menu")
      editUnderlineParams({
        width: (elem.offsetWidth).toString() + "px",
        marginLeft: (elem.offsetLeft - elemMenu.offsetLeft - 2).toString() + "px",
      })
    }
  }, [activeTab])
  useEffect(() => {
    editUnderlineParams({
      width: document.getElementById("menuItemId" + activeTab.toString()).offsetWidth.toString() + "px",
      marginLeft: "0",
    })

  }, [])

  return (
    <div
      id={"menuParent"}
      onMouseLeave={() => {
        setActiveTab(lastI)
      }}


      // @ts-ignore
      name={props.open}

      className={styles.menuParent}>
      <div id={"menu"} className={styles.menu}>
        {tabs.map((e, i) => {
          return (
            // @ts-ignore
            <div active={(i === activeTab).toString()} id={"menuItemId" + i.toString()}
                 onMouseEnter={() => {
                   setActiveTab(i)
                 }}
                 onClick={() => {
                   setActiveTab(i)
                   lastI = i
                 }}>
              {e}
            </div>
          )
        })}
      </div>
      <div className={styles.underline}
           style={{width: underlineParams['width'], marginLeft: underlineParams['marginLeft']}}/>

      <div style={{
        height: "100vh",
        width: "100vw",
        position: "absolute",
        marginLeft:"-10px"
      }} onClick={() => {
        if(open)
          props.setOpenMenu(false)
      }}/>


    </div>
  )
}

import styles from './Header.module.scss'
import Menu from './Menu'
import lottie from "lottie-web";
import toggleAnimation from '../AEAnimations/src/burgerMenu.json'
import {useEffect, useState} from "react";
import {use} from "ast-types";

export const getHeader = ()=>{
  let elem=document.getElementById("header")
  let data={
    height:elem.offsetHeight,
    width:elem.offsetWidth,
    elem
  }
  return data
}

export default function (props) {
  const [open, setOpen]=useState(false)

  useEffect(()=>{
    if(!open){
      lottie.setDirection(-1,"menu")
      lottie.play("menu")
      document.body.style.overflowY="auto"

    }
    else{
      lottie.setDirection(1,"menu")
      lottie.play("menu")
      document.body.style.overflowY="hidden"

    }
  },[open])

  useEffect(()=>{
    lottie.loadAnimation({
      container: document.getElementById("burgerMenu"),
      name:"menu",
      animationData: toggleAnimation,
      autoplay:false,
      loop:false,
    });

    window.addEventListener('scroll',()=>{
      let elem = document.getElementById("header")
      if(window.scrollY>0){
        elem.setAttribute("onScroll","true")
      }else
        elem.setAttribute("onScroll","false")
    })
  },[])

  return(
    <div className={styles.parent} id={"header"}>
      <div onClick={()=>{

        setOpen(!open)
      }} id={"burgerMenu"}
      className={styles.mobileButtonMenu}
      />
      <Menu setOpenMenu={(e)=>setOpen(e)} open={open.toString()}/>

    </div>
  )
}




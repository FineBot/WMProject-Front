import styles from './popouts.module.css'
import Input from "../Input/Input";
import React from 'react'
import * as ReactDOM from "react-dom";
import TextArea from "../TextArea/TextArea";
import Button from "../Button/Button";
let inp;
export function Feedback(){
  inp=document.createElement("div")
  ReactDOM.render(<FeedbackComponent/>,inp)
  document.body.appendChild(inp)
}

function FeedbackComponent(){
  return(
    <div id={"popout"} className={styles.popoutParent} title={"Всплывающее окно"}>
      <div className={styles.popoutContent}>
        <h1>Связь с нами</h1>
        <div className={styles.closeButton} title={"Кнопка закрыть окно"} onClick={()=>{
          document.body.removeChild(inp)
        }}/>
        <div>Email: <a></a></div>
        <div>Телефон: <a></a></div>
      </div>
    </div>
  )
}

// function FeedbackComponent(){
//   return(
//     <div id={"popout"} className={styles.popoutParent} title={"Всплывающее окно"}>
//       <div className={styles.popoutContent}>
//         <h1>Связь с нами</h1>
//         <div className={styles.closeButton} title={"Кнопка закрыть окно"} onClick={()=>{
//           document.body.removeChild(inp)
//         }}/>
//         <Input placeholder={"Введите Ваше ФИО"}/>
//         <Input placeholder={"Укажите тему"}/>
//         <TextArea style={{minHeight:"100px"}} placeholder={"Укажите тему"}/>
//         <div style={{width:"100%",display:"grid",justifyContent:"flex-end"}}>
//           <Button onClick={()=>{
//             document.body.removeChild(inp)
//           }}>Отправить</Button>
//         </div>
//       </div>
//     </div>
//   )
// }

import styles from './Blog.module.scss'
import Input from "../Input/Input";
import {useState} from "react";
import Button from "../Button/Button";

export default function (props) {
  const [searchText, setSearchText] = useState("")
  const [tagsSearchState, setTagsSearchState] = useState([
    {title:"Тэг",active:false},
    {title:"Тэг",active:false},
    {title:"Тэг",active:false},
    {title:"Тэг",active:false},
    {title:"Тэг",active:false},
    {title:"Тэг",active:false},
    {title:"Тэг",active:false},
  ])

  const links=[
    {title:"Telegram", url:"https://vk.com"},
    {title:"Telegram", url:"https://vk.com"},
    {title:"Telegram", url:"https://vk.com"},
    {title:"Telegram", url:"https://vk.com"},
    {title:"Telegram", url:"https://vk.com"},
    {title:"Telegram", url:"https://vk.com"},
    {title:"Telegram", url:"https://vk.com"},
    {title:"Telegram", url:"https://vk.com"},
  ]


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
            <Input value={searchText} onInput={(e)=>{
              setSearchText(e)
            }} placeholder={"Поиск по статьям"}/>
            <h1>Тэги</h1>
            <div className={styles.tags}>
              {tagsSearchState.map((e,i)=>{
                return(<Tag title={e.title} active={tagsSearchState[i].active} onClick={()=>{
                  let buff = JSON.parse(JSON.stringify(tagsSearchState))
                  buff[i].active=true
                  setTagsSearchState(buff)
                }} onIconClick={(e)=>{
                  let buff = JSON.parse(JSON.stringify(tagsSearchState))
                  buff[i].active=false
                  setTagsSearchState(buff)
                }}/>)
              })}
              <div style={{width:"100%", display:"flex",justifyContent:"flex-end",marginTop:"15px",marginBottom:"5px"}}>
                <Button type={"more"} onClick={()=>{
                  setSearchText("")
                  let buff=JSON.parse(JSON.stringify(tagsSearchState))
                  for(var i =0;i<buff.length;i++){
                    buff[i].active=false
                  }
                  setTagsSearchState(buff)
                }}>Очистить поиск</Button>
              </div>
            </div>
            <hr/>
            <h1>Ссылки</h1>
            <div className={styles.linksContainer}>
              {links.map((e)=>{
                return(
                  <a href={e.url} target={"_blank"}>{e.title}</a>
                )
              })}
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
        <Tag title={"бла бла бла"} active={true}/>
        <Tag title={"бла бла бла"}/>
        <Tag title={"бла бла бла"}/>
        <Tag title={"бла бла бла"}/>
      </div>
      <h1>Заголовок</h1>
      <div className={styles.date}>14.11.2002</div>
      <div className={styles.desc}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur cupiditate
        ea fugiat, illo incidunt
        labore magnam natus nisi non optio ratione rerum sed sequi. Fugiat illo neque non sequi tenetur?
      </div>
    </div>
  )
}

const Tag = (props) => {

  return (
    <div className={styles.tag} id={props.active?.toString()} onClick={props.onClick}>
      {props.title}
      <div className={styles.closeTag} onClick={(e)=>{
        e.stopPropagation();
        props?.onIconClick(e)
      }}>
        <div/>
        <div/>
      </div>
    </div>
  )
}

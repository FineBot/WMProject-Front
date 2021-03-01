'use strict';
import React from 'react';
import {isMobile} from "../components/other"

export const config = {
    amp: false,
}

function to0(t){
    if(t<10){
        return "0"+t.toString()
    }else{
        return t.toString()
    }
}
export default class Persik extends React.Component {

    constructor(props){
        super(props);

        this.state={
        }


    }
    getTime(unix){
        var dt = new Date(unix*1000)
        var x = new Date(Date.now())
        var result=""
        var day=to0(dt.getDate())
        var month=to0(dt.getMonth()+1)
        var year=to0(dt.getFullYear())
        var min=to0(dt.getMinutes())
        var hours=to0(dt.getHours())
        if(unix>Math.ceil(Date.now()/1000)-x.getHours()*60*60-x.getMinutes()*60-x.getSeconds()){
            result=result+"Сегодня, в "+hours+":"+min
        }else if(unix>Math.ceil(Date.now()/1000)-x.getHours()*60*60-x.getMinutes()*60-x.getSeconds()-60-60-24){
            result=result+"Вчера, "+hours+":"+min
        }else{
            result=day+"."+month+"."+year+", "+hours+":"+min
        }
        return result
    }
    render() {
        var url="/article/"
        if(this.props.admin){
            url="/admin/edit/"
        }
       return(
           <div>
               {this.props.data.map((e)=>{
                   if(isMobile()){
                       return(
                           <a target={"_blank"} href={url+e['id']}>
                                   <div className={"tabs"} style={{marginTop:"5px",cursor:"pointer",borderRadius:"10px",width:"100%",marginBottom:"15px",
                                       display:"inline-block"}}>
                                       <div style={{backgroundImage : "url("+e.coverImage+")",
                                           backgroundSize:"cover",
                                           height: "200px",
                                           width:"100%",
                                           backgroundPosition:"50% 50%",
                                           borderTopRightRadius:"10px",borderTopLeftRadius:"10px",
                                           alignItems: 'flex-end',
                                           justifyContent: 'left',}}/>

                                       <div  style={{borderBottomRightRadius:"10px",borderBottomLeftRadius:"10px",paddingBottom:"5px"}}>
                                           <div style={{fontSize:"11px"}}>{this.getTime(e.publishedAt)}</div>
                                           {JSON.parse(e.tags).map((ef)=>{
                                               return (
                                                   <div className={"tags"}>
                                                       {ef}
                                                   </div>
                                               )
                                           })}
                                           <div>
                                               {e.title}
                                           </div>
                                       </div>
                                   </div>
                           </a>
                       )
                   }else{
                       return(
                           <a target={"_blank"} href={url+e['id']}>
                               <div className={"tabs"} style={{marginBottom:"10px",borderRadius:"10px",padding:"5px"}}>
                                   <div style={{display:"flex",height:"150px"}}>
                                       <div>
                                           <div style={{backgroundImage : "url("+e.coverImage+")",
                                               backgroundSize:"cover",
                                               height:"150px",
                                               width:"150px",
                                               backgroundPosition:"50% 50%",
                                               borderRadius:"10px",
                                               alignItems: 'flex-end',
                                               justifyContent: 'left',}}/>
                                       </div>
                                       <div style={{width:"100%",textAlign:"left",marginTop:"-15px",marginLeft:"10px"}}>
                                           <h2 style={{color:"black",marginBottom:"0px",whiteSpace:"pre-wrap"}}>{e['title']}</h2>
                                           <div style={{fontSize:"11px"}}>{this.getTime(e.publishedAt)}</div>

                                           {JSON.parse(e.tags).map((ef)=>{
                                               return (
                                                   <div className={"tags"}>
                                                       {ef}
                                                   </div>
                                               )
                                           })}
                                           <div className={"inSearch"}>{e['description']}</div>
                                       </div>
                                   </div>
                               </div>
                           </a>
                       )
                   }
               })}
           </div>
       )

    }
}




'use strict';
import React from 'react';
import Header from "./Header"
import {getHead} from "./getHead";
import InSearchNews from "./inSearchNews"
import MobileHeader from "./MobileHeader";

function to0(t){
    if(t<10){
        return "0"+t.toString()
    }else{
        return t.toString()
    }
}

var scrollWaiting=false
var page=0



export default class Persik extends React.Component {

    constructor(props){
        super(props);
        this.state={
            data:null,
            loading:false,
        }

    }


    componentDidMount() {
        document.addEventListener("scroll",()=>this.scroll())
        this.load()

    }
    load(){
        const data1 = new URLSearchParams();
        data1.append("page",page)
        fetch("http://localhost:15234/getNews",{method:"POST",body:data1}).then(
            (response)=>{
                return response.json()
            }
        )
            .then((data)=>{
                if(page==0){
                    this.setState({data:data})
                }else{
                    var loadedData=this.state.data
                    for (var i =0;i<data['result']['all'].length;i++){
                        loadedData['result']['all'].push(data['result']['all'][i])
                    }

                    console.log(loadedData)
                    this.setState({data:loadedData,loading:false})

                }

            })
            .catch(e=>{
                alert("Ошибка соединения с сервером")
            })
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
    scroll(){
        var clientHeight = document.documentElement.clientHeight ? document.documentElement.clientHeight : document.body.clientHeight;
        var documentHeight = document.documentElement.scrollHeight ? document.documentElement.scrollHeight : document.body.scrollHeight;
        var scrollTop = window.pageYOffset ? window.pageYOffset : (document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop);



        if((documentHeight - clientHeight) <= scrollTop+700)
        {
            if(!scrollWaiting){
                scrollWaiting=true
                page++
                this.setState({loading:true})
                this.load()
            }


        }else{
            scrollWaiting=false
        }

    }
    render() {
        if(this.state.data!=null){
            if(this.state.data.result.main.length==0){
                return (
                    <div>
                        {getHead("News Site","просто новости",[])}

                        <MobileHeader shownavigate={false}></MobileHeader>
                        <div className={"parent2"}>
                            <div style={{marginLeft:"auto",marginRight:"auto",display:"block",width:"95%",textAlign:"center",marginTop:"10px",paddingBottom:"10px"}}>

                                <img style={{width:"50%",height:"50%"}} src={"/static/images/d60e314966c8fd2de3c62f5fb6b23b1b.png"}/>
                                <h3>Тут пусто</h3>
                            </div>
                        </div>
                    </div>
                )
            }
        }
        return(
            <div>
                {getHead("News Site","просто новости",[])}

                <MobileHeader shownavigate={false}></MobileHeader>

                <div className={"parent2"}>
                    {this.state.data!=null?(
                        <a target={"_blank"} href={"/article/"+this.state.data.result.main[0]['id'].toString()}>
                            <div>
                                <div style={{
                                    backgroundImage : " linear-gradient(" +
                                        "      rgba(0, 0, 0, 0.6), " +
                                        "      rgba(0, 0, 0, 0.6)" +
                                        "    ), url("+this.state.data.result.main[0].coverImage+")",
                                    backgroundSize:"cover",
                                    height: "60vh",
                                    display: 'flex',
                                    backgroundPosition:"50% 50%",
                                    alignItems: 'flex-end',
                                    justifyContent: 'left',

                                }}>
                                    <div style={{width:"100%"}}>
                                        <div>
                                            <table width="100%" style={{height:"60vh",overflow:"hidden"}}>
                                                <tr >
                                                    <td width="50%" valign="bottom">
                                                        <div style={{width:"100%"}}>
                                                            <div style={{paddingLeft:"10px",marginBottom:"-20px"}}>
                                                                {JSON.parse(this.state.data.result.main[0].tags).map((e)=>{
                                                                    return (
                                                                        <div className={"tags"}>
                                                                            {e}
                                                                        </div>
                                                                    )
                                                                })}

                                                            </div>

                                                            <div  style={{marginLeft:"10px",maxWidth:"100vw"}}>
                                                                <h1 style={{fontSize:"20px",color:"white"}}>{this.state.data.result.main[0].title}</h1>
                                                            </div>
                                                        </div>
                                                    </td>
                                                </tr>

                                            </table>
                                        </div>


                                    </div>

                                </div>
                            </div>
                        </a>
                    ):(
                        <div className="loader">
                            <div className="inner one"></div>
                            <div className="inner two"></div>
                            <div className="inner three"></div>
                        </div>

                    )}
                    <div style={{}}>
                        {this.state.data!=null?(
                            <div>
                                {this.state.data.result.all.length>0?(<h2 style={{color:"gray",marginLeft:"10px",marginBottom:"-15px",marginTop:"10px"}}>Остальные статьи</h2>

                                ):(null)}
                            </div>
                        ):(null)}


                        {this.state.data!=null?(
                            <div className={"centre"} >
                                <div style={{width:"100%"}}>
                                    <h1 style={{color:"black"}}>
                                        {this.props.tag==="main"?("Главное"):(this.props.tag)}
                                    </h1>

                                    {this.state.loading?( <div className="loader">
                                        <div className="inner one"></div>
                                        <div className="inner two"></div>
                                        <div className="inner three"></div>
                                    </div>):(
                                        <div style={{marginLeft:"auto",marginRight:"auto",display:"block",width:"95%",textAlign:"center",marginTop:"10px",paddingBottom:"10px"}}>
                                            {this.state.data==="error"?(<div>
                                                <img style={{width:"50%",height:"50%"}} src={"/static/images/d60e314966c8fd2de3c62f5fb6b23b1b.png"}/>
                                                <h3>Ничего не найдено</h3>
                                            </div>):(<div>
                                                <InSearchNews data={this.state.data.result['all']}/>
                                                {this.state.loading1?(<div className="loaderBottom">
                                                    <div className="inner one"></div>
                                                    <div className="inner two"></div>
                                                    <div className="inner three"></div>
                                                </div>):(null)}

                                            </div>)}
                                        </div>
                                    )}
                                </div>

                            </div>
                        ):(null)}

                    </div>
                    {this.state.loading?(<div className="loaderBottom">
                        <div className="inner one"></div>
                        <div className="inner two"></div>
                        <div className="inner three"></div>
                    </div>):(null)}
                </div>
            </div>
        )
    }
}




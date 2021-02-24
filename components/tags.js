'use strict';
import React from 'react';
import Header from "./Header"
import fetch from "isomorphic-unfetch";
import InSearchNews from "./inSearchNews";
import {getHead} from "./getHead";

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
var scrollWaiting=false
var page=0
export default class Persik extends React.Component {

    constructor(props){
        super(props);

        this.state={
            input:"",
            loading:false,
            loading1:false,
            data:[],
        }


    }
    componentDidMount() {
        document.addEventListener("scroll",()=>this.scroll())

        this.setState({input:this.props.tag})
        this.search()
    }
    scroll(){
        var clientHeight = document.documentElement.clientHeight ? document.documentElement.clientHeight : document.body.clientHeight;
        var documentHeight = document.documentElement.scrollHeight ? document.documentElement.scrollHeight : document.body.scrollHeight;
        var scrollTop = window.pageYOffset ? window.pageYOffset : (document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop);



        if((documentHeight - clientHeight) <= scrollTop+500)
        {
            if(!scrollWaiting){
                scrollWaiting=true
                page++
                this.setState({loading1:true})
                this.load()
            }


        }else{
            scrollWaiting=false
        }

    }
    search(){
        this.setState({loading:true})
        const data1 = new URLSearchParams();
        data1.append("keywords",this.props.tag)
        fetch('http://127.0.0.1:15234/searchTags',{method:"POST",body: data1})
            .then(response=>response.json())
            .then(data=>{
                if("result" in data){
                    this.setState({data:data['result']})
                    setTimeout(()=>{
                        this.setState({loading:false})
                    },300)
                }else{
                    this.setState({data:"error"})
                    setTimeout(()=>{
                        this.setState({loading:false})
                    },300)
                }

            })
    }
    load(){
        this.setState({loading1:true})
        const data1 = new URLSearchParams();
        data1.append("keywords",this.props.tag)
        data1.append("page",page)
        fetch('http://127.0.0.1:15234/searchTags',{method:"POST",body: data1})
            .then(response=>response.json())
            .then(data=>{
                if("result" in data) {
                    var loadedData = this.state.data
                    for (var i = 0; i < data['result'].length; i++) {
                        loadedData.push(data['result'][i])
                    }
                    this.setState({loading1: false})

                }else{
                    this.setState({loading1: false})

                }

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
    render() {
        if(this.state.mobile){
            return (
                <div>
                    mobile
                </div>
            );
        }else{
            var title=this.props.tag
            if(this.props.tag==="main"){
                title="Главное"
            }
            return (
                <div>
                    <Header/>
                    {getHead(title,"просто новости",[])}

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
                                        <InSearchNews data={this.state.data}/>
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

                </div>
            );
        }
    }
}




'use strict';
import React from 'react';
import Header from "./Header"
import fetch from "isomorphic-unfetch";
import InSearchNews from "../components/inSearchNews"
import {getHead} from "./getHead";
import {isMobile} from "./other";
import MobileHeader from "./MobileHeader";

export const config = {
    amp: false,
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

    search(){
        this.setState({loading:true})
        const data1 = new URLSearchParams();
        data1.append("keywords",this.state.input)
        fetch('http://127.0.0.1:15234/search',{method:"POST",body: data1})
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
    componentDidMount() {
        if(isMobile()){
            this.setState({mobile:true})
        }
        document.addEventListener("scroll",()=>this.scroll())

    }

    load(){
        this.setState({loading1:true})
        const data1 = new URLSearchParams();
        data1.append("keywords",this.state.input)
        data1.append("page",page)
        fetch('http://127.0.0.1:15234/search',{method:"POST",body: data1})
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
    render() {

            return (
                <div>
                    {this.state.mobile?(
                        <MobileHeader shownavigate={false}></MobileHeader>
                    ):(
                        <Header/>
                    )}
                    {getHead("Поиск","просто новости",[])}

                    <div className={"centre"} >
                        <div style={{width:"100%"}}>
                            <h1 style={{color:"black"}}>
                                Поиск
                            </h1>
                            <div>
                                <div id={"searchDiv"} style={{marginLeft:"auto",marginRight:"auto",display:"block",width:"95%",textAlign:"center",paddingBottom:"15px"}}>
                                    <input placeholder={"Начните вводить"} id={"searchInput1"} onChange={(e)=>{
                                        var value=document.getElementById("searchInput1").value
                                        this.setState({input:value})

                                        setTimeout(()=>{
                                            if(this.state.input===value && this.state.input!="") {
                                                this.search()
                                            }
                                        },500)
                                    }} style={{height:"30px",width:"95%",position:"sticky",top:"60px"}}/>
                                    {this.state.loading?(
                                        <div className="loader" >
                                            <div className="inner one"></div>
                                            <div className="inner two"></div>
                                            <div className="inner three"></div>
                                        </div>
                                    ):(
                                        null
                                    )}
                                    <div style={{marginLeft:"auto",marginRight:"auto",display:"block",width:"90%",textAlign:"center",marginTop:"10px",paddingBottom:"10px"}}>
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
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }

}




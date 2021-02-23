'use strict';
import React from 'react';
import Header from "./Header"
import fetch from "isomorphic-unfetch";
import InSearchNews from "../components/inSearchNews"
import {getHead} from "./getHead";

export const config = {
    amp: false,
}


export default class Persik extends React.Component {

    constructor(props){
        super(props);

        this.state={
            input:"",
            loading:false,
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

    render() {
        if(this.state.mobile){
            return (
                <div>
                    mobile
                </div>
            );
        }else{
            return (
                <div>
                    <Header/>
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
                                            <InSearchNews admin={true} data={this.state.data}/>
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
}




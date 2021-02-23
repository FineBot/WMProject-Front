'use strict';
import React from 'react';
import CheckAuth from "../../components/checkAuth"
import AdminHeader from "../../components/adminHeader"
import LeftMenu from "../../components/leftmenu"
import fetch from "isomorphic-unfetch";
import InSearchNews from "../../components/inSearchNews"
import {isMobile} from "../../components/other";

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
            showmenu:false,
            parentClass:"adminparent",
        }


    }
    componentDidMount() {
        if(!isMobile()){
            this.setState({showmenu:true})

        }else{
            this.setState({parentClass:"Madminparent"})

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
                    this.setState({loading:false})


                    setTimeout(()=>{
                        this.setState({data:data['result']})
                        document.getElementById("searchDiv").className="adminGlavPage1"
                    },500)
                }else{
                    this.setState({data:"error"})
                    this.setState({loading:false})

                    setTimeout(()=>{
                        document.getElementById("searchDiv").className="adminGlavPage1"

                    },500)
                }
            })
    }

    render() {


            return (
                <CheckAuth>

                    <AdminHeader onclc={()=>{
                        this.setState({showmenu:!this.state.showmenu})
                    }} mobileMenu={true}/>
                    <LeftMenu show={this.state.showmenu}/>
                    <div>
                        <div id={"parentAdmin"} className={this.state.parentClass}>
                            <div id={"searchDiv"} className={"adminGlavPage"} style={{marginLeft:"auto",marginRight:"auto",display:"block",width:"80%",textAlign:"center",paddingBottom:"15px"}}>
                                   <input  placeholder={"Начните вводить"} id={"searchInput1"} onChange={(e)=>{
                                       var value=document.getElementById("searchInput1").value
                                       this.setState({input:value})

                                       setTimeout(()=>{
                                           if(this.state.input===value && this.state.input!="") {
                                               this.search()
                                           }
                                       },500)
                                   }} style={{height:"30px",width:"95%",position:"sticky",top:"60px",zIndex:5}}/>
                                {this.state.loading?(
                                       <div className="loader" style={{backgroundColor:"white"}}>
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
                </CheckAuth>
            );
        }

}




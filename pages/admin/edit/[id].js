'use strict';
import React from 'react';
import CheckAuth from "../../../components/checkAuth"
import AdminHeader from "../../../components/adminHeader"
import LeftMenu from "../../../components/leftmenu"
import {isMobile} from "../../../components/other";
import Editor from "../../../components/editor"
import Layout from "../../../components/Layout";
import fetch from "isomorphic-unfetch";

export const config = {
    amp: false,
}


export default class Persik extends React.Component {

    constructor(props){
        super(props);

        this.state={
            input:"",
            loading:false,
            data:null,
            showmenu:false,
            id:0,
            parentClass:"adminparent",

        }


    }
    componentDidMount() {
        if(!isMobile()){
            this.setState({showmenu:true})

        }else{
            this.setState({parentClass:"Madminparent"})

        }
        const data1 = new URLSearchParams();
        var url=window.location;
        const id = url.toString().split("/")[5]
        this.setState({id})
        data1.append("id",id)
        fetch('http://127.0.0.1:15234/getById',{method:"POST",body: data1})
            .then(data=>data.json())
            .then(data=>{
                this.setState({data:data})
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

                    <div id={"parentAdmin"} style={{marginTop:"20px"}} className={this.state.parentClass}>

                        <div style={{marginLeft:"auto",marginRight:"auto",maxWidth:"1000px"}}>
                            <Editor id={this.state.id} data={this.state.data} style={{color:"black"}}/>
                        </div>
                    </div>


                </div>
            </CheckAuth>
        );
    }

}




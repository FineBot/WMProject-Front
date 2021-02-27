'use strict';
import React from 'react';
import {getCookie,setCookie} from "../components/other"
import {getHead} from "./getHead";
import fetch from "isomorphic-unfetch";

export const config = {
    amp: false,
}


export default class Persik extends React.Component {

    constructor(props){
        super(props);

        this.state={
            token:"",
            view:false,
        }


    }
    componentDidMount() {
        var token=getCookie("token")
        const url =  window.location.href
        const id = url.split("/")[4]
        if(token==undefined){
            if(id!=="login"){
                window.location="/admin/login"

            }else{
                this.setState({token:token})
                this.setState({view:true})
            }
        }else{
            this.setState({token:token})
            this.setState({view:true})

            var check=getCookie("checkToken")
            if(check==undefined){
                const data1 = new URLSearchParams();
                data1.append("token",token)
                fetch('http://127.0.0.1:15234/checkToken',{method:"POST",body: data1})
                    .then(response=>response.json())
                    .then(data=>{
                        if("result" in data){
                            setCookie("checkToken","ok",{'max-age': 60*15})
                        }else{
                            setCookie("token",{"max-age":-1})
                            window.location="/admin/login"

                        }
                    })
            }
        }
    }
    render() {

            return (
                <div>
                    {getHead("Админка","просто новости",[])}

                    {this.state.view?(
                        <div>
                            {this.props.children}
                        </div>
                    ):(
                        <div className="loader">
                            <div className="inner one"></div>
                            <div className="inner two"></div>
                            <div className="inner three"></div>
                        </div>
                    )}
                </div>
            );

    }
}




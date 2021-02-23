'use strict';
import React from 'react';
import {getCookie} from "../components/other"
import {getHead} from "./getHead";

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
        if(token==undefined && id!="login"){
            window.location="/admin/login"
        }else{
            this.setState({token:token})
            this.setState({view:true})
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




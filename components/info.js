'use strict';
import React from 'react';
import {isMobile} from "../components/other"
import Startpage from "../components/startpage"

export const config = {
    amp: false,
}


export default class Persik extends React.Component {

    constructor(props){
        super(props);

        this.state={
        }


    }
    componentWillReceiveProps(nextProps, nextContext) {
        if(this.props.text==(undefined || ""||null) && nextProps.text!=(undefined && "" && null)||this.props.text!=nextProps.text){
            window.scrollTo({top: 0, behavior: 'smooth'})}
    }

    componentDidMount() {
    }
    render() {
            if(this.props.text==(undefined || ""||null)){
                return null
            }else{
                return (
                    <div style={{top:"10%",color:"red",height:"50px",marginBottom:"15px"}}>
                        <table style={{height:"100%",width:"70%",marginRight:"auto",marginLeft:"auto",backgroundColor:"white",borderRadius:"15px"}}>
                            <tr>
                                <td valign="middle">
                                    {this.props.text}
                                </td>
                            </tr>
                        </table>
                    </div>
                );
            }


    }
}




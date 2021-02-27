'use strict';
import React from 'react';
import {Fade} from "react-reveal";

export default class Persik extends React.Component {

    constructor(props){
        super(props);

        this.state={
            your_city:"",

        }


    }
    UNSAFE_componentDidMount() {

    }

    UNSAFE_componentWillReceiveProps(nextProps, nextContext) {
        if(nextProps.show){

        }
    }


    render() {
        var t =30

        return (
            <Fade left when={this.props.show}>
            <div className="leftmenu" style={{width:"200px",height:"100%",position:"fixed",top:"46px",textAlign:"left",paddingLeft:"10px",marginLeft:"-5px"}}>

                    <div id="homeb" onClick={()=>{window.location="/admin"}} onMouseLeave={()=>{document.getElementById("homeb").style.backgroundColor="#fff"}}
                         onMouseEnter={()=>{document.getElementById("homeb").style.backgroundColor="#e6e8f1"}}
                         style={{cursor:"pointer",paddingLeft:"2px",display:"flex",marginTop:"15px",paddingTop:"5px",paddingBottom:"5px",borderRadius:10,marginRight:"10px"}}><img src="/static/images/icons8-главная-96.png" style={{height:t,width:t}}/><div style={{marginLeft:"5px",fontSize:20}}><b>Главная</b></div></div>

                    <div id="searchb" onClick={()=>{window.location="/admin/create"}} onMouseLeave={()=>{document.getElementById("searchb").style.backgroundColor="#fff"}}
                         onMouseEnter={()=>{document.getElementById("searchb").style.backgroundColor="#e6e8f1"}}
                         style={{cursor:"pointer",paddingLeft:"2px",display:"flex",paddingTop:"5px",paddingBottom:"5px",borderRadius:10,marginRight:"10px"   }}><img src="/static/images/add.png" style={{height:t,width:t}}/><div style={{marginLeft:"5px",fontSize:20}}><b>Создать</b></div></div>

                </div>

            </Fade>


        );
    }
}




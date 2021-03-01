'use strict';
import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom'
import Icon28Search from '@vkontakte/icons/dist/28/search';
import Icon28FireOutline from '@vkontakte/icons/dist/28/fire_outline';
import Icon28HomeOutline from '@vkontakte/icons/dist/28/home_outline';
import {Slide} from "react-reveal";
import {isMobile} from "./other";

export default class Persik extends React.Component {

    constructor(props){
        super(props);

        this.state={
            your_city:"",show:false,show1:false

        }


    }
    componentDidMount() {
        if(!isMobile()){
            this.setState({show:true,show1:true})
        }
    }
    UNSAFE_componentWillReceiveProps(nextProps, nextContext) {
        if(nextProps.show==this.props.show){
            return
        }

        if(nextProps.show){
            this.setState({show1:nextProps.show,})
            setTimeout(()=>this.setState({show:nextProps.show,}),10)
        }else{
            this.setState({show:nextProps.show,})
            setTimeout(()=>this.setState({show1:nextProps.show,}),250)
        }

    }


    render() {
        var t =30

        return (
            <div>
                {this.state.show1?(
                    <Slide delay={0} duration={250} left when={this.state.show}>
                        <div style={{display:"flex",position:"fixed",zIndex:"99"}}>
                            <div className="leftmenu" style={{width:"200px",height:"100%",position:"fixed",textAlign:"left",paddingLeft:"10px",marginLeft:"-5px",zIndex:"1"}}>

                                <div className={"itemMenu"} id="homeb" onClick={() => {window.location = "/tags/main"}}
                                     style={{
                                         cursor: "pointer",
                                         paddingLeft: "2px",
                                         display: "flex",
                                         marginTop: "15px",
                                         paddingTop: "5px",
                                         paddingBottom: "5px",
                                         borderRadius: 10,
                                         marginRight: "10px"
                                     }}>
                                    <div style={{marginLeft: "5px", fontSize: 20}}><b>Главное</b></div>
                                </div>

                                <div className={"itemMenu"} id="searchb" onClick={() => {
                                    window.location = "/tags/Животные"
                                }}style={{
                                         cursor: "pointer",
                                         paddingLeft: "2px",
                                         display: "flex",
                                         paddingTop: "5px",
                                         paddingBottom: "5px",
                                         borderRadius: 10,
                                         marginRight: "10px"
                                     }}>
                                    <div style={{marginLeft: "5px", fontSize: 20}}><b>Животные</b></div>
                                </div>
                                <div className={"itemMenu"} id="searchb" onClick={() => {
                                    window.location = "/tags/Политика"
                                }}style={{
                                    cursor: "pointer",
                                    paddingLeft: "2px",
                                    display: "flex",
                                    paddingTop: "5px",
                                    paddingBottom: "5px",
                                    borderRadius: 10,
                                    marginRight: "10px"
                                }}>
                                    <div style={{marginLeft: "5px", fontSize: 20}}><b>Политика</b></div>

                                </div>
                                <div className={"itemMenu"} id="searchb" onClick={() => {
                                    window.location = "/search"
                                }}style={{
                                    cursor: "pointer",
                                    paddingLeft: "2px",
                                    display: "flex",
                                    paddingTop: "5px",
                                    paddingBottom: "5px",
                                    borderRadius: 10,
                                    marginRight: "10px"
                                }}>
                                    <div style={{marginLeft: "5px", fontSize: 20}}><b>Поиск</b></div>
                                </div>
                                <div className={"itemMenu"} id="searchb" onClick={() => {
                                    window.location = "/admin"
                                }}style={{
                                    cursor: "pointer",
                                    paddingLeft: "2px",
                                    display: "flex",
                                    paddingTop: "5px",
                                    paddingBottom: "5px",
                                    borderRadius: 10,
                                    marginRight: "10px"
                                }}>
                                    <div style={{marginLeft: "5px", fontSize: 20}}><b>Login</b></div>
                                </div>

                            </div>
                            {isMobile()?(
                                <div onClick={()=>{
                                    this.props.onclc()
                                }} style={{width:(window.outerWidth-200)+"px",height:"100vh",marginLeft:200}}>

                                </div>
                            ):(null)}
                        </div>
                    </Slide>

                ):(null)}
            </div>

        );
    }
}
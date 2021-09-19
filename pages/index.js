'use strict';
import React from 'react';
import {isMobile} from "../components/other"
import Startpage from "../components/startpage"
import MobileStartpage from "../components/mobileStartpage"
import Empty from "../components/empty"

export const config = {
    amp: false,
}


export default class Persik extends React.Component {

    constructor(props){
        super(props);

        this.state={
            mobile:false,
            ret:false,
        }


    }
    componentDidMount() {
        console.log(process.env.REACT_APP_API)
        window.onresize=()=>{

            this.forceUpdate()
        }
        if (isMobile()) {
            this.setState({mobile:true})
        }
        setTimeout(()=>{this.setState({ret:true})},150)
    }
    render() {

        if(this.state.ret){
            if(this.state.mobile){
                return (
                    <div>
                        <MobileStartpage/>
                    </div>
                );
            }else{
                return (
                    <div>
                        <Startpage/>
                    </div>
                );
            }
        }else{
            return <Empty/>;
        }
    }
}




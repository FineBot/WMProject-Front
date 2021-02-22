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
            mobile:false
        }


    }
    componentDidMount() {
        if (isMobile()) {
            this.setState({mobile:true})
        }
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
                   <Startpage/>
               </div>
           );
       }
    }
}




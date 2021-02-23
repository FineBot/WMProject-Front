'use strict';
import React from 'react';
import CheckAuth from "../../components/checkAuth"
import AdminHeader from "../../components/adminHeader"
import LeftMenu from "../../components/leftmenu"
import {isMobile} from "../../components/other";
import Editor from "../../components/editor"

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


    render() {


        return (
            <CheckAuth>

                <AdminHeader onclc={()=>{
                    this.setState({showmenu:!this.state.showmenu})
                }} mobileMenu={true}/>
                <LeftMenu show={this.state.showmenu}/>
                <div>

                    <div id={"parentAdmin"} style={{marginTop:"100px"}} className={this.state.parentClass}>
                        <div style={{marginLeft:"auto",marginRight:"auto",maxWidth:"1000px"}}>
                            <Editor style={{color:"black"}}/>
                        </div>
                    </div>


                    </div>
            </CheckAuth>
        );
    }

}




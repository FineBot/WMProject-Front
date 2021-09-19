'use strict';
import React from 'react';
import CheckAuth from "../../components/checkAuth"
import AdminHeader from "../../components/adminHeader"
import LeftMenu from "../../components/leftmenu"
import {getCookie, isMobile} from "../../components/other";
import Editor from "../../components/editor"
import Layout from "../../components/Layout";
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
            data:[],
            images:['/static/images/kisspng-check-mark-computer-icons-checkbox-1-5ab9367b448746.0700693515220875472807.png','/static/images/image_processing20200511-25230-hysdk9.png'],
            showmenu:false,
            parentClass:"adminparent",
            mobile:false,
        }


    }
    componentDidMount() {
        window.onresize=()=>{
            this.init()

            this.forceUpdate()
        }
        this.init()
    }
    init(){
        if(!isMobile()){
            this.setState({showmenu:true,parentClass:"adminparent",mobile:false})

        }else{
            this.setState({parentClass:"Madminparent",mobile:true,showmenu:false})

        }
    }
    onclc(){
        this.setState({showmenu:!this.state.showmenu})
    }

    render() {


        return (
            <CheckAuth>

                <AdminHeader onclc={()=>this.onclc()} mobileMenu={true}/>
                <LeftMenu onclc={()=>this.onclc()} show={this.state.showmenu}/>
                <div>
                    <div id={"parentAdmin"} style={{marginTop:"20px"}} className={this.state.parentClass}>
                        <div style={{marginLeft:"auto",marginRight:"auto",maxWidth:"1000px",paddingLeft:"10px",paddingRight:"10px"}}>

                            <h1>Имя</h1>
                            <div style={{display:"flex"}}>
                                <input style={{height:"20px"}} id={"nameInput"} placeholder={"Новое имя"}/>
                                {this.state.loading1?(<div className="loader1">
                                    <div className="inner one"></div>
                                    <div className="inner two"></div>
                                    <div className="inner three"></div>
                                </div>):(
                                    <div>
                                        {this.state.done1?(
                                            <img id={"result1"} src={this.state.images[0]} style={{marginLeft:"45px"}} width={"25px"}/>

                                        ):(
                                            <button className={"button2"} style={{marginLeft:"10px"}} onClick={()=>{
                                                this.setState({loading1:true})
                                                const data1 = new URLSearchParams();
                                                data1.append("token",getCookie("token"))
                                                data1.append("name",document.getElementById("nameInput").value)
                                                fetch(process.env.REACT_APP_API+'/editName',{method:"POST",body: data1})
                                                    .then(response=>response.json())
                                                    .then(data=>{
                                                        if(data['result']==1){
                                                            var im=this.state.images
                                                            im[0]='/static/images/kisspng-check-mark-computer-icons-checkbox-1-5ab9367b448746.0700693515220875472807.png'
                                                            this.setState({done1:true,loading1:false,images:im})
                                                            setTimeout(()=>{
                                                                this.setState({done1:false})
                                                            },2000)
                                                        }else{

                                                            var im=this.state.images
                                                            im[0]='/static/images/image_processing20200511-25230-hysdk9.png'
                                                            this.setState({done1:true,loading1:false,images:im})
                                                            setTimeout(()=>{
                                                                this.setState({done1:false})
                                                            },2000)

                                                        }

                                                    })
                                            }}>Сохранить</button>
                                        )}
                                    </div>
                                )}
                            </div>
                            <br/><br/>
                            <h1>Пароль</h1>
                            <input type={"password"} id={"pass1"} placeholder={"Новый пароль"}/><br/>
                            <div  style={{display:"flex"}}>
                                <input type={"password"} id={"pass2"} style={{height:"20px"}} id={"pass2"} placeholder={"Подтверждение пароля"}/>
                                {this.state.loading2?(<div className="loader1">
                                    <div className="inner one"></div>
                                    <div className="inner two"></div>
                                    <div className="inner three"></div>
                                </div>):(
                                    <div>
                                        {this.state.done2?(
                                           <div style={{display:'flex'}}>
                                               {this.state.mobile?(
                                                   <table>
                                                       <tr align="center">
                                                           <td  valign="middle">
                                                               {this.state.err==null?(
                                                                   <img src={this.state.images[1]} style={{marginLeft:"45px"}} width={"25px"}/>
                                                               ):(
                                                                   <img src={this.state.images[1]} width={"25px"}/>
                                                               )}
                                                           </td>

                                                       </tr>
                                                       <tr>
                                                           <td align="center" valign="middle">
                                                               <div style={{fontSize:"12px",color:"red",marginLeft:"5px",marginTop:"-5px"}}>{this.state.err}</div>

                                                           </td>
                                                       </tr>
                                                   </table>
                                               ):(
                                                   <table>
                                                       <tr>
                                                           <td valign="middle">
                                                               <img src={this.state.images[1]} style={{marginLeft:"45px"}} width={"25px"}/>
                                                           </td>
                                                           <td valign="middle">
                                                               <div style={{fontSize:"12px",color:"red",marginLeft:"5px",marginTop:"-5px"}}>{this.state.err}</div>

                                                           </td>
                                                       </tr>
                                                   </table>
                                               )}
                                           </div>

                                            ):(
                                            <button className={"button2"} style={{marginLeft:"10px"}} onClick={()=>{
                                                this.setState({loading2:true})
                                                const data1 = new URLSearchParams();
                                                data1.append("token",getCookie("token"))
                                                this.setState({err:null})

                                                if(document.getElementById("pass1").value==document.getElementById("pass2").value){

                                                }else{
                                                    this.setState({err:"Пароли не совпадают"})
                                                    var im=this.state.images
                                                    im[1]='/static/images/image_processing20200511-25230-hysdk9.png'
                                                    this.setState({done2:true,loading2:false,images:im})
                                                    setTimeout(()=>{
                                                        this.setState({done2:false})
                                                    },2000)
                                                    return
                                                }
                                                data1.append("pass",document.getElementById("pass1").value)
                                                fetch(process.env.REACT_APP_API+'/editPassword',{method:"POST",body: data1})
                                                    .then(response=>response.json())
                                                    .then(data=>{
                                                        if(data['result']==1){
                                                            var im=this.state.images
                                                            im[1]='/static/images/kisspng-check-mark-computer-icons-checkbox-1-5ab9367b448746.0700693515220875472807.png'
                                                            this.setState({done2:true,loading2:false,images:im})
                                                            setTimeout(()=>{
                                                                this.setState({done2:false})
                                                            },2000)
                                                        }else{

                                                            var im=this.state.images
                                                            im[1]='/static/images/image_processing20200511-25230-hysdk9.png'
                                                            this.setState({done2:true,loading2:false,images:im})
                                                            setTimeout(()=>{
                                                                this.setState({done2:false})
                                                            },2000)

                                                        }

                                                    })
                                            }}>Сохранить</button>

                                        )}
                                    </div>

                                )}
                            </div>

                        </div>

                    </div>


                </div>
            </CheckAuth>
        );
    }

}




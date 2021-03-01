import React from 'react';
import Icon28User from '@vkontakte/icons/dist/28/user_outline';
import { Icon28SearchOutline } from '@vkontakte/icons';
import LeftMenu from "./leftmenu2"

class Persikf extends React.Component {

    constructor(props) {
        super(props);
        this.state={
            active:["","",""],showmenu:false
        }
    }


    componentDidMount() {
        var t = this.state.active
        t[this.props.active]="#2b13f0"
        this.setState({active:t})
    }


    render() {
        var theme="hdblock"
        if(!this.props.indent && this.props.indent!=undefined){
            theme="hdblock1"
        }
        return (
            <div>
                <div className="parent">
                    <div className={theme} >
                        <table style={{height:"50px"}} width="100%">
                            <tr valign="center">
                                <td width={"35px"} align={"left"}>
                                    <div >
                                        <a id="events" href="/"><img src="/static/images/logo.png"  style={{height:"35px",width:"35px",marginLeft:"10px",paddingRight:"10px"}}
                                        /></a>
                                    </div>
                                </td>
                                <td align="right">
                                    <img onClick={()=>this.setState({showmenu:!this.state.showmenu})} style={{width:"30px",display:"block",right:"0px",marginRight:"15px"}} src="/static/images/icons8-menu-96.png"/>
                                </td>

                            </tr>
                        </table>
                    </div>
                    <div style={{backgroundColor:"#dbdbdb",height:"1px",paddingRight:"40px",paddingLeft:"40px"}}></div>

                </div>
                <div style={{height:"0x",padding:"25px"}}/>
                <LeftMenu show={this.state.showmenu} onclc={()=>this.setState({showmenu:!this.state.showmenu})}/>
            </div>
        );
    }
}
export default Persikf

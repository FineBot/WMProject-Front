import React from "react";
import Icon28User from '@vkontakte/icons/dist/28/user_outline';
import Layout from "./Layout";

export default function () {
	return(
		<Layout>
			<div className="parent">
				<div className={"hdblock"} >
					<table style={{height:"50px"}} width="100%">
						<tr valign="center">
							<td width={"35px"} align={"left"}>
								<div>
									<a id="events" style={{height:"35px",width:"35px",marginLeft:"10px",paddingRight:"10px"}} href="/"><amp-img src="/static/images/logo.png"  width="35px" height="35px"
									/></a>
								</div>
							</td>
							<td align={"left"}>
								<div style={{display:"flex",overflow:"auto"}}>
									<div className={"tabs"}>
										Главное
									</div>
									<div style={{backgroundColor:"#dbdbdb",width:"1px",marginLeft:"5px",marginRight:"5px"}}></div>
									<div className={"tabs"}>
										Животные
									</div>
									<div style={{backgroundColor:"#dbdbdb",width:"1px",marginLeft:"5px",marginRight:"5px"}}></div>
									<div className={"tabs"}>
										Политика
									</div>
								</div>
							</td>
							<td align="right"><div>
								<a style={{width:"35px",display:"flex",cursor:"pointer",textDecoration:"none", paddingRight:"10px"}} href="/login">
									<Icon28User className={"iconColor"}/>
								</a>
							</div></td>
						</tr>
					</table>
				</div>
				<div style={{backgroundColor:"#dbdbdb",height:"1px",paddingRight:"40px",paddingLeft:"40px"}}></div>

			</div>
			<div style={{height:"0x",padding:"25px"}}/>

		</Layout>
	)
}
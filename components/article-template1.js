import React from 'react'
import Layout from './Layout'
import ampHeader1 from "./ampHeader"
import Head from "next/head";
import {getHead} from "./getHead"

export const config = { amp: false }




const Post=props=> (
    <>


        {getHead(props.title,props.description,[])}


        <Layout title={props.header}>
            {ampHeader1()}


            <div>
                <div className="hdblock">

                    <div amp-custom style={{textAlign:"left",display:"block",marginTop:"20px",backgroundColor:"white",height:"100%",width:"100%"}}>

                        <div style={{maxWidth:"1000px",margin:"auto",display:"block",}}>

                            <h1 style={{marginLeft:"10px",marginRight:"10px"}} className="h1">
                                {props.title}
                            </h1>
                            <h5 style={{marginLeft:"10px",marginRight:"10px"}}>{props.creator} • {props.date}</h5>

                            <div style={{
                                height:"400px",
                                width:"100%",
                                backgroundPosition:"50% 50%",
                                backgroundImage : "url("+props.coverImage+")"
                            }} className={"coverImage"}  >

                            </div>

                            <div style={{margin:"10px",display:"flex",flexWrap:"wrap",overflow:"hidden"}} dangerouslySetInnerHTML={{__html:props.text}}>

                            </div>

                        </div>

                    </div>
                </div>
            </div>


        </Layout>
    </>


)
function generateInlineScript(script) {
    if (typeof script === 'function') {
        return `${script.toString()}()`
    }
    return String(script)
}
export default Post
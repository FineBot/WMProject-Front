import React from 'react'
import Tags from "../../components/tags"
import fetch from 'isomorphic-unfetch'
import Head from "next/head";
import Layout from "../../components/Layout";



export const config = { amp: false  }



const Post=({stars,amp,id})=> (
    <>


                <Tags tag={decodeURIComponent(id)}/>



    </>


)
function generateInlineScript(script) {
    if (typeof script === 'function') {
        return `${script.toString()}()`
    }
    return String(script)
}
Post.getInitialProps = async ({ req,query }) => {
    const amp = query.amp

    const url = req ? req.url : window.location.href
    const id = url.replace("/"+url.split("/")[1]+"/","")

    return { id,amp }
};
export default Post
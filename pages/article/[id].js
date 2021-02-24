import React from 'react'
import ArticleTemplate from "../../components/article-template1"
import fetch from 'isomorphic-unfetch'
import Head from "next/head";
import Layout from "../../components/Layout";



export const config = { amp: true }



const Post=({ampUrl,stars,amp,id,data})=> (
    <>
        <Layout>
            {data==="error"?(<div>Не найдено</div>):(
                <ArticleTemplate url={ampUrl} amp={amp} date={data['dateConvert']}
                                 creator={data['author']}
                                 title={data['title']}
                                 header={data['title']}
                                 coverImage={data['coverImage']}
                                 text={data['content']}
                                 description={data['description']}
                />
            )}

        </Layout>
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
    const ampUrl = url
    const data1 = new URLSearchParams();
    data1.append("id",id)
    const res = await fetch('http://127.0.0.1:15234/getById',{method:"POST",body: data1})
    const data = await res.json();
    if("error" in data){
        return { ampUrl,id,amp,data:"error" }
    }
    return { ampUrl,id,amp,data:data['result'][0] }
};
export default Post
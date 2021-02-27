import Head from "next/head";
import React from "react";


export function getHead(title,description,keywords) {
                return (
                    <Head>
                        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet"/>
                            {title === "" ? (<title>News Site</title>) : (<title>{title}</title>)}
                            <meta name="description" content={description}/>
                            {title === "" ? (<meta property="og:title" content={title}/>) : (
                                <meta property="og:title" content={title}/>)}
                            <meta property="og:description" content={description}/>
                            <script type="application/ld+json" dangerouslySetInnerHTML={{
                                    __html: `
                {"@context": "https://schema.org",
  "@type": "Project",
  "name": "News Site",
  "alternateName": "News Site",
  "url": "https://finebot.site",
  "logo": "https://finebot.site/static/images/ic_launcher.png"}`
                            }}></script>
                            <meta property="og:site_name" content={title}/>
                            <meta name="keywords" content={keywords.map((e)=>{return(" "+e.toString())})} />
                            <meta property="og:image" content="https://finebot.site/static/images/ic_launcher.png"/>
                            <meta property="og:image:width" content="1200"/>
                            <meta property="og:image:height" content="630"/>
                            <meta name="twitter:image" content="https://finebot.site/static/images/ic_launcher.png"/>
                            <meta property="vk:image" content="https://finebot.site/static/images/ic_launcher.png"/>
                            <link rel="icon" type="image/png" sizes="32x32"
                                  href="https://finebot.site/static/images/ic_launcher.png"/>
                            <link rel="icon" type="image/png" sizes="16x16"
                                  href="https://finebot.site/static/images/ic_launcher.png"/>
                            <link rel="apple-touch-icon" href="https://finebot.site/static/images/ic_launcher.png"/>
                            <link rel="apple-touch-icon" sizes="76x76"
                                  href="https://finebot.site/static/images/ic_launcher.png"/>
                            <link rel="apple-touch-icon" sizes="120x120"
                                  href="https://finebot.site/static/images/ic_launcher.png"/>
                            <link rel="apple-touch-icon" sizes="152x152"
                                  href="https://finebot.site/static/images/ic_launcher.png"/>
                            <link rel="apple-touch-icon" sizes="180x180"
                                  href="https://finebot.site/static/images/ic_launcher.png"/>
                            <link rel="mask-icon" href="https://finebot.site/static/images/logo.png" color="#FFF"/>
                            <link rel="image_src" href="https://finebot.site/static/images/ic_launcher.png"/>
                    </Head>
                )
        }




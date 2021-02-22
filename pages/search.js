import React from 'react'
import Search from "../components/searchPage"



export const config = { amp: false  }



const Post=({})=> (
    <>


            <Search/>



    </>


)
function generateInlineScript(script) {
    if (typeof script === 'function') {
        return `${script.toString()}()`
    }
    return String(script)
}

export default Post
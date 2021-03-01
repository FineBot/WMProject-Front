export default function Layout({ children }) {
  return (
    <>
      {children}
      <style jsx global>{`
        body{
            color: #1c1e21;
            direction: ltr;
            margin: 0;
            padding: 0px;
            unicode-bidi: embed;
        }
        .hdblock{

            max-width: 1150px;
            margin-left: auto;
            margin-right: auto;
}
.scrollHidden::-webkit-scrollbar { width: 0 }
.scrollHidden { -ms-overflow-style: none; }
.scrollHidden { overflow: -moz-scrollbars-none; }
.coverImage{
background-size:cover;
}
div{
    font-family: 'Open Sans';
}
.tabs{
    cursor: pointer;
    padding: 5px;
}
.parent{
    width: 100%;
    position: fixed;
    background: #fff;
    height: 50px;
    z-index: 2;
}
.tabs:hover {
    border-radius: 5px;
    background-color: #dbdb;

}
blockquote {
    border-left: 5px solid #eee;
    color: #666;
    font-family: 'Hoefler Text', 'Georgia', serif;
    font-style: italic;
    margin: 16px 0;
    font-size: 20px;
    padding: 10px 20px;
}
code{
    background-color: rgba(0, 0, 0, 0.05);
    font-family: 'Inconsolata', 'Menlo', 'Consolas', monospace;
    font-size: 17px;
    padding: 20px;
}
mono{
    background-color: rgba(0, 0, 0, 0.05);
    font-family: 'Inconsolata', 'Menlo', 'Consolas', monospace;
    font-size: 17px;
    padding: 3px;
}
ul{
    padding-bottom: 15px;
    font-size: 17px;

}
ol{
    padding-bottom: 15px;
    font-size: 17px;
}
figure{
    width: 100%;
    text-align: center;
}
img{
    max-height: 500px;
    width: 100%;
}
p{
    font-size: 17px;
    padding: 0px;
    margin: 0px;
}
@font-face {
    font-family: "Open Sans"; /* Гарнитура шрифта */
    src: url("/static/fonts/opensans.ttf"); /* Путь к файлу со шрифтом */
}
      `}</style>
    </>
  )
}

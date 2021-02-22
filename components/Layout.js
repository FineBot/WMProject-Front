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

@font-face {
    font-family: "Open Sans"; /* Гарнитура шрифта */
    src: url("/static/fonts/opensans.ttf"); /* Путь к файлу со шрифтом */
}
      `}</style>
    </>
  )
}

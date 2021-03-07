'use strict';

import { EditorState, RichUtils,AtomicBlockUtils,ContentState } from "draft-js";
import {stateToHTML} from 'draft-js-export-html';
import Editor  from "draft-js-plugins-editor";
import createImagePlugin from "draft-js-image-plugin";
import * as React from "react";
import Chips, { Chip } from 'react-chips'
import fetch from "isomorphic-unfetch";
import htmlToDraft from 'html-to-draftjs';
import Info from "./info"
import {getCookie} from "./other";

import dynamic from 'next/dynamic'

const imagePlugin = createImagePlugin();
const plugins = [imagePlugin];



export default class RichEditorExample extends React.Component {
    constructor(props) {
        super(props);
        this.state = {editorState: EditorState.createEmpty(),chips: [],edit:false,coverImage:null};

        this.focus = () => this.refs.editor.focus();
        this.onChange = (editorState) => {
            this.setState({editorState,done:false})
        };

        this.handleKeyCommand = (command) => this._handleKeyCommand(command);
        this.onTab = (e) => this._onTab(e);
        this.toggleBlockType = (type) => this._toggleBlockType(type);
        this.toggleInlineStyle = (style) => this._toggleInlineStyle(style);
    }


    componentWillReceiveProps(nextProps, nextContext) {
      this.init(nextProps)
    }

    init(prop){
        var {data}=prop
        if(data!=null && "result" in data){
            data=data['result'][0]
            document.getElementById("title").value=data['title']
            document.getElementById("desc").value=data['description']
            document.getElementById("desc").value=data['description']
            this.setState({chips:JSON.parse(data['tags']),coverImage:data['coverImage']})

            const blocksFromHtml = htmlToDraft(data['content']);
            const { contentBlocks, entityMap } = blocksFromHtml;
            const contentState = ContentState.createFromBlockArray(contentBlocks, entityMap);
            const editorState = EditorState.createWithContent(contentState);
            this.setState({editorState:editorState})
            if(data['main']=="1"){
                document.getElementById("checkbox").checked=true
            }


        }
    }

    componentDidMount() {
        var url=window.location;
        const id = url.toString().split("/")[4]
        if(id.toLowerCase()=="edit"){
            this.setState({edit:true})
        }
    }

    _handleKeyCommand(command) {
        const {editorState} = this.state;
        const newState = RichUtils.handleKeyCommand(editorState, command);
        if (newState) {
            this.onChange(newState);
            return true;
        }
        return false;
    }

    _onTab(e) {
        const maxDepth = 4;
        this.onChange(RichUtils.onTab(e, this.state.editorState, maxDepth));
    }

    _toggleBlockType(blockType) {
        this.onChange(
            RichUtils.toggleBlockType(
                this.state.editorState,
                blockType
            )
        );
    }

    _toggleInlineStyle(inlineStyle) {
        this.onChange(
            RichUtils.toggleInlineStyle(
                this.state.editorState,
                inlineStyle
            )
        );
    }
    checkFile(e){
        let reader = new FileReader();
        let file = e.target.files[0];

        reader.onloadend = () => {
            this.setState({
                file: file,
                imagePreviewUrl: reader.result
            });
            this.handleClick(reader.result)
            console.log(reader.result)
        }

        reader.readAsDataURL(file)


    }
    checkFile1(e){
        let reader = new FileReader();
        let file = e.target.files[0];
        this.checkEdit()
        reader.onloadend = () => {
            this.setState({
                file: file,
                imagePreviewUrl: reader.result
            });
            this.setState({coverImage:reader.result})
        }

        try{
            reader.readAsDataURL(file)
        }catch (err){
            //f
        }


    }
    onChipsChange = chips => {
        this.setState({ chips,done:false });
    }
    setStateError(data){
        switch (data.error.text){
            case 'tags is missing':
                this.setState({textError:"Тэги не заполнены."})
                break;
            case 'title is missing':
                this.setState({textError:"Не указан заголовок."})
                break;
            case 'content is missing':
                this.setState({textError:"Отсутствует контент статьи."})
                break;
            case 'description is missing':
                this.setState({textError:"Отсутствует описание статьи."})
                break;
            case 'coverImage is missing':
                this.setState({textError:"Отсутствует обложка статьи."})
                break;
            case 'source is missing':
                this.setState({textError:"Отсутствует источник статьи."})
                break;
        }
    }
    checkEdit(){
        this.setState({done:false})
    }
    getButton(){
        let options = {

            entityStyleFn: (entity) => {
                const entityType = entity.get('type').toLowerCase();
                if (entityType === 'image') {
                    const data = entity.getData();
                    return {
                        element: 'img',
                        onClick:()=>{
                            alert("F")
                        },
                        attributes: {
                            src: data.src,
                        },

                    };
                }
                if (entityType === 'figure') {
                    const data = entity.getData();
                    return {
                        element: 'div',
                        attributes: {
                            src: data.src,
                        },

                    };
                }
            },
            defaultBlockTag: 'p',
            inlineStyles: {
                CODE: {element: 'mono'},

            }
        };
        if(this.state.edit){
            return(
                <div>
                    <div onClick={()=>{
                        this.setState({loading:true})
                        const data1 = new URLSearchParams();

                        var main=0
                        if(document.getElementById("checkbox").checked){
                            main=1
                        }


                        data1.append("token",getCookie("token"))
                        data1.append("title",document.getElementById("title").value)
                        data1.append("content",stateToHTML(this.state.editorState.getCurrentContent(),options))
                        data1.append("source","")
                        data1.append("tags",JSON.stringify(this.state.chips))
                        data1.append("description",document.getElementById("desc").value)
                        if(this.state.coverImage!=null && this.state.coverImage!=this.props.data['result'][0].coverImage){
                            data1.append("coverImage",this.state.coverImage)

                        }
                        data1.append("main",main)
                        data1.append("id",this.props.id)
                        fetch('http://localhost:15234/editArticle',{method:"POST",body: data1}).then(result=>result.json())
                            .then(data=>{

                                if("error" in data){
                                    this.setStateError(data)
                                }else{
                                    if(data['result']==1){
                                        this.setState({done:true,textError:null})

                                    }
                                }
                                this.setState({loading:false})
                            })


                    }} style={{width:"150px",verticalAlign:"center",height:"16px",marginBottom:"15px"}} className={"button2"}>Сохранить</div><br/>
                    <div onClick={()=>{
                        this.setState({loading:true})
                        const data1 = new URLSearchParams();
                        data1.append("token",getCookie("token"))
                        data1.append("id",this.props.id)
                        fetch('http://localhost:15234/deleteArticle',{method:"POST",body: data1}).then(result=>result.json())
                            .then(data=>{

                                if("error" in data){
                                    this.setStateError(data)
                                }else{
                                    if(data['result']==1){
                                        this.setState({done:true,textError:null})
                                        setTimeout(()=>window.location="/admin",2000)
                                    }
                                }
                                this.setState({loading:false})
                            })


                    }} style={{width:"150px",verticalAlign:"center",height:"16px",marginBottom:"15px",backgroundColor:"#ff4040"}} className={"button2"}>Удалить статью</div>
                </div>
            )
        }else{
            return (
                <div onClick={()=>{
                    this.setState({loading:true})
                    const data1 = new URLSearchParams();

                    var main=0
                    if(document.getElementById("checkbox").checked){
                        main=1
                    }


                    data1.append("token",getCookie("token"))
                    data1.append("title",document.getElementById("title").value)
                    data1.append("content",stateToHTML(this.state.editorState.getCurrentContent(),options))
                    data1.append("source","")
                    data1.append("tags",JSON.stringify(this.state.chips))
                    data1.append("description",document.getElementById("desc").value)
                    data1.append("coverImage",this.state.coverImage)
                    data1.append("main",main)
                    fetch('http://localhost:15234/createArticle',{method:"POST",body: data1}).then(result=>result.json())
                        .then(data=>{

                            if("error" in data){
                                this.setStateError(data)

                            }else{
                                if(data['result']==1){
                                    this.setState({done:true,textError:null})
                                    setTimeout(()=>window.location="/admin",500)
                                }
                            }
                            this.setState({loading:false})

                        })


                }} style={{width:"150px",verticalAlign:"center",height:"16px",marginBottom:"15px"}} className={"button2"}>Опубликовать</div>
            )
        }
    }

    render() {
        const {editorState} = this.state;


        let className = 'RichEditor-editor';
        var contentState = editorState.getCurrentContent();
        if (!contentState.hasText()) {
            if (contentState.getBlockMap().first().getType() !== 'unstyled') {
                className += ' RichEditor-hidePlaceholder';
            }
        }
        const theme = {
            chipsContainer: {
                display: "flex",
                position: "relative",
                border: "1px solid #cecece",
                backgroundColor: '#fff',
                fontSize: "17px",
                marginLeft:"auto",
                marginRight:"auto",
                width:"80%",
                minHeight:"25px",
                alignItems: "center",
                flexWrap: "wrap",
                padding: "6px 6px 4px 10px",
                borderRadius: 15,
                ':focus': {
                    border: "1px solid #aaa",
                }
            },
            container:{
                flex: 1,
            },
            containerOpen: {

            },
            input: {
                border: "none",
                background:"none",
                fontSize: "17px",
                marginLeft:"auto",
                fontFamily: "Open Sans",
                fontWeight: "none",
                marginRight:"auto",
                width:"100%",
                minHeight:"15px",
                alignItems: "center",
                flexWrap: "wrap",
                padding: "none",
                boxShadow:"none",
                webkitBoxShadow:"none",
                marginTop:"-25px",

            },
            suggestionsContainer: {

            },
            suggestionsList: {
                position: 'absolute',
                border: '1px solid #ccc',
                zIndex: 10,
                left: 0,
                top: '100%',
                width: '100%',
                backgroundColor: '#fff',
                listStyle: 'none',
                padding: 0,
                margin: 0,
            },
            suggestion: {
                padding: '5px 15px'
            },
            suggestionHighlighted: {
                background: '#ddd'
            },
            sectionContainer: {

            },
            sectionTitle: {

            },
        }
        const chipTheme = {
            chip: {
                padding:"none",
                paddingLeft: "5px",
                paddingRight:"5px",

                background: "#ccc",
                margin:'none',
                marginLeft: "2px",
                borderRadius: 3,
                cursor: 'default',
            },
            chipSelected: {
                background: '#888',
            },
            chipRemove: {
                fontWeight: "bold",
                cursor: "pointer",
                ':hover': {
                    color: 'red',
                }
            }
        }
        return (
            <div>
                <div style={{width:"100%",textAlign:"center",marginBottom:"20px"}}>
                    <Info text={this.state.textError}/>
                    <div style={{textAlign:'left',width:"80%",marginLeft:"auto",marginRight:"auto",fontSize:"17px"}}>Заголовок</div>
                    <input id={"title"} onChange={()=>this.checkEdit()} style={{width:"80%",fontSize:"17px",height:"25px",marginBottom:"10px"}} />
                    <div style={{textAlign:'left',width:"80%",marginLeft:"auto",marginRight:"auto",fontSize:"17px"}}>Описание</div>
                    <input id={"desc"} onChange={()=>this.checkEdit()} style={{width:"80%",fontSize:"17px",height:"25px",marginBottom:"10px"}} />
                    <div style={{textAlign:'left',width:"80%",marginLeft:"auto",marginRight:"auto",fontSize:"17px"}}>Тэги к статье</div>

                    <Chips
                        theme={theme}
                        value={this.state.chips}
                        onChange={this.onChipsChange}
                        fromSuggestionsOnly={false}
                        chipTheme={chipTheme}
                        createChipKeys={[13,32]}

                    />
                    <div style={{marginTop:"10px"}}>
                        <label className="label">
                            <div style={{textAlign:'left',width:"80%",marginLeft:"auto",marginRight:"auto",fontSize:"17px"}}>Обложка</div>
                            {this.state.coverImage==null?(null):(
                                <div style={{
                                    height:"400px",
                                    marginTop:"15px",
                                    marginBottom:"15px",
                                    width:"100%",
                                    backgroundPosition:"50% 50%",
                                    backgroundSize:"cover",
                                    backgroundImage : "url("+this.state.coverImage+")"
                                }} className={"coverImage"}/>
                            )}
                            <div style={{marginBottom:"-20px"}}>
                                {this.state.coverImage==null?(<div className={"button2"}>Загрузить обложку</div>):(<div className={"button2"}>Изменить обложку</div>)}<br/>
                                <input id={"coverimg"} style={{opacity:0, width:0, height:0}} name="photo" accept="image/*,image/jpeg" onChange={(e)=>this.checkFile1(e)} type={"file"}/>

                            </div>
                        </label>

                    </div>
                </div>
                <div className="RichEditor-root" >
                    <div style={{position:"sticky",top:"50px",backgroundColor:"white"}}>
                        <div style={{height:"10px"}}></div>
                        <BlockStyleControls
                            editorState={editorState}
                            onToggle={this.toggleBlockType}
                        />
                        <InlineStyleControls
                            editorState={editorState}
                            onToggle={this.toggleInlineStyle}
                        />
                        <div className="imageEditor">
                            <div className="form-group">
                                <label className="label">
                                    <i className="material-icons">attach_file</i>
                                    <input name="photo" accept="image/*,image/jpeg" onChange={(e)=>this.checkFile(e)} type={"file"}/>
                                </label>
                            </div>
                        </div>
                        <div style={{backgroundColor:"#dbdbdb",height:"1px",paddingRight:"40px",paddingLeft:"40px"}}></div>

                    </div>
                    <div className={className} onClick={this.focus}>
                        <Editor
                            blockStyleFn={getBlockStyle}
                            customStyleMap={styleMap}
                            editorState={editorState}
                            handleKeyCommand={this.handleKeyCommand}
                            onChange={this.onChange}
                            onTab={this.onTab}
                            plugins={plugins}
                            ref="editor"
                            spellCheck={true}
                        />
                    </div>


                </div>
                <div style={{textAlign:'center',marginTop:"50px",paddingBottom:"50px"}}>
                    <p><input type="checkbox"  id={"checkbox"} onChange={()=>{
                        this.setState({done:false})

                    }}  name="a" /> Поместить в главное</p>
                    {this.state.loading?(<div className="loaderBottom">
                        <div className="inner one"></div>
                        <div className="inner two"></div>
                        <div className="inner three"></div>
                    </div>):(
                        <div>
                            {this.state.done?(
                                <img src={"/static/images/kisspng-check-mark-computer-icons-checkbox-1-5ab9367b448746.0700693515220875472807.png"} width={"50px"}/>

                            ):(
                                <div>{this.getButton()}</div>
                            )}
                        </div>
                    )}

                </div>
            </div>
        );
    }
    handleClick = (base64) => {
        const newEditorState = this.insertImage(this.state.editorState, base64);
        this.onChange(newEditorState);
    };

    insertImage = (editorState, base64) => {
        const contentState = editorState.getCurrentContent();
        const contentStateWithEntity = contentState.createEntity(
            'image',
            'IMMUTABLE',
            { src: base64 },
        );
        const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
        const newEditorState = EditorState.set(
            editorState,
            { currentContent: contentStateWithEntity },
        );
        return AtomicBlockUtils.insertAtomicBlock(newEditorState, entityKey, ' ');
    };
}

// Custom overrides for "code" style.
const styleMap = {
    CODE: {
        backgroundColor: 'rgba(0, 0, 0, 0.05)',
        fontFamily: '"Inconsolata", "Menlo", "Consolas", monospace',
        fontSize: 16,
        padding: 2,
    },
};

function getBlockStyle(block) {
    switch (block.getType()) {
        case 'blockquote': return 'RichEditor-blockquote';
        default: return null;
    }
}

class StyleButton extends React.Component {
    constructor() {
        super();
        this.onToggle = (e) => {
            e.preventDefault();
            this.props.onToggle(this.props.style);
        };
    }

    render() {
        let className = 'RichEditor-styleButton';
        if (this.props.active) {
            className += ' RichEditor-activeButton';
        }

        return (
            <span className={className} onMouseDown={this.onToggle}>
              {this.props.label}
            </span>
        );
    }
}

const BLOCK_TYPES = [
    {label: 'H1', style: 'header-one'},
    {label: 'H2', style: 'header-two'},
    {label: 'H3', style: 'header-three'},
    {label: 'H4', style: 'header-four'},
    {label: 'H5', style: 'header-five'},
    {label: 'H6', style: 'header-six'},
    {label: 'Blockquote', style: 'blockquote'},
    {label: 'UL', style: 'unordered-list-item'},
    {label: 'OL', style: 'ordered-list-item'},
    {label: 'Code Block', style: 'code-block'},
];

const BlockStyleControls = (props) => {
    const {editorState} = props;
    const selection = editorState.getSelection();
    const blockType = editorState
        .getCurrentContent()
        .getBlockForKey(selection.getStartKey())
        .getType();

    return (
        <div className="RichEditor-controls">
            {BLOCK_TYPES.map((type) =>
                <StyleButton
                    key={type.label}
                    active={type.style === blockType}
                    label={type.label}
                    onToggle={props.onToggle}
                    style={type.style}
                />
            )}
        </div>
    );
};

var INLINE_STYLES = [
    {label: 'Bold', style: 'BOLD'},
    {label: 'Italic', style: 'ITALIC'},
    {label: 'Underline', style: 'UNDERLINE'},
    {label: 'Monospace', style: 'CODE'},
];

const InlineStyleControls = (props) => {
    var currentStyle = props.editorState.getCurrentInlineStyle();
    return (
        <div className="RichEditor-controls">
            {INLINE_STYLES.map(type =>
                <StyleButton
                    key={type.label}
                    active={currentStyle.has(type.style)}
                    label={type.label}
                    onToggle={props.onToggle}
                    style={type.style}
                />
            )}
        </div>
    );
};


import React, { Component } from 'react';
//import Tokenizr from 'Tokenizr';
import DropDownBox from './dropDownBox';
import Definitions from './definitions';

let Tokenizr = require('tokenizr');

export default class Template extends Component {

    buildRadioButtons(arr, type, id) {
        return arr.map((choice, i) => {
          return (
            <div key={i} onChange={this.onChange}>
              <input
              type={type}
              name={id}
              value={choice}
            />          
            <label>{choice}</label>
          </div>
         )
      })
     }
    
     onChange = (e) => {
        console.log(e.target.name, e.target.value);

        if(this.props.onEvent){
            this.props.onEvent({
                type: 'setContractProperty',
                parameters: { key: e.target.name, value: e.target.value }
            });
        }
    } 

    onSubmit = (e) => {
        if(this.props.onEvent){
            this.props.onEvent({
                type: 'saveContract'
            });
        }
      }



    parse_tag(s) {
        // console.log(">>>parsing tag>>> ", s);
        let list = s.split('::');

        let varName = list[0];
        let varCompType = list[1];
        let varNote = list[2];
        let varCompStyle = list[3];

        let tag = {
            var_name: varName,
            var_comp_type: varCompType,
            var_note: varNote,
            var_comp_style: varCompStyle,
            type: 'variable'
        }

        return tag;
    }

    split_apart(str) {
        if((typeof str) !== 'string'){
            console.log('tokenizr: invalid string!', str);
            return null;
        }

        let arr;
        try{
            let lexer = new Tokenizr();

            lexer.rule(/\$\{([^\{\}]+)\}/, (ctx, match) => {
                ctx.accept(
                    "tag", this.parse_tag(match[1])
                    )
            });
    
            //lexer.rule(/(?:\$$|$[^\[]|[^\$\[\]])+/, (ctx, match) => {
            lexer.rule(/(?:\$$|\$[^\{]|[^\$\{\}])+/, (ctx, match) => {
                ctx.accept("text")
            });
    
            lexer.input(str);
            arr = lexer.tokens();
        }
        catch(e) {
            console.log(e);
            console.log('>>> Error from: ', str);
        }

        return arr;
    }

      // header is array
    displayComponent(header) {

        let lines;
        if(header){
            lines = header.map((line, i) => {

                // analysis the item, convert to corresponding component

                if(!(line.field)){
                    return (<h4>{line.title}</h4>);
                }

                let fieldItems = this.split_apart(line.field);      //tokenizr

                let row;
                row = fieldItems.map( (item, j) => {
                    // console.log(item);
                    if(item.type === 'tag'){
                        // variable infor => item.value.var_comp_type
                        let varName = item.value.var_name; 
                        let varType = item.value.var_comp_type;
                        let varNote = item.value.var_note;
                        let varStyle = item.value.var_comp_style;


                        if(varType === "textinput"){
                            return (
                                <input type="text" name={varName} placeholder={varName} onChange={this.onChange}></input>
                            )
                        }
                        else if(varType === "textarea"){
                            return (
                                <textarea name={varName} placeholder={varNote} onChange={this.onChange}></textarea>
                            )
                        }
                        else if(varType === "checkbox"){
                            return (
                                <input type="checkbox" name={varName} onChange={this.onChange} />
                            )
                        }
                        else if(varType === "singleselection"){
                            let values = varNote.split(",");
        
                            return (
                                this.buildRadioButtons(values, "radio", varName)
                            )
                        }
                        else if(varType === "calander"){
                            return (
                                <input type="date" name={varName} onChange={this.onChange}></input>
                            )
                        }
                        else if(varType === "multipleselection" || varType === "dropdownlist"){
                          //  ${partB-province::dropdownlist::VVV:codetable:province}

                          let dataSource = {varName, varNote, varStyle};
                          return (
                            <DropDownBox name={varName} codetables={this.props.codetables} 
                                            dataSource={dataSource} 
                                            onEvent={(e)=>this.props.onEvent(e)}
                                            onChange={this.onChange}></DropDownBox>
                            );
                        }
                        else{
                            // line.field
                            return (
                                <div style={formStyleA}>
                                    {/* <label>{line.field}
                                    </label> */}
                                </div>
                            )
                        }



                    } // end of if -> tag
                    else if(item.type === 'text'){
                        // display as label
                        let text = item.value;
                        let style;
                        if(item.value.includes("###")){
                            let i = item.value.indexOf("###");
                            let i1 = item.value.indexOf("####");
                            text = item.value.slice(0, i);
                            style = item.value.slice(i+1, i1);
                            // console.log(style);
                        }

                        if(style){
                            if(style.includes('center')){
                                return (
                                    <div style={labelCenter}>
                                        <label style={labelCenter}>
                                            {text}
                                        </label>
                                    </div>  
                                );
                            }
                            else if(style.includes('right')){
                                return (
                                    <div style={labelDisplayRight}>
                                        <label style={labelDisplayRight}>
                                            {text}
                                        </label>
                                    </div>  
                                );
                            }
                        }else{
                            return (
                                <label>
                                    {text}
                                </label>
                            );
                        }
                    }

                });

                return (
                    <div style={divPadding}>
                        {row}
                    </div>
                );

            })
        }

        return lines;
    }

    displayDefinitions(defines) {
        return (
            <Definitions required={defines} definitions={this.props.definitions} onEvent={(e)=>this.props.onEvent(e)}></Definitions>
            );
    }

    render() {
        if(!this.props.template.content){
            console.log(this.props.template.content);
            return (<div></div>);
        }

        let headerItems;
        if(this.props.template.content.body.header){
            let header = this.props.template.content.body.header;
            headerItems = this.displayComponent(header);
        }

        let definedItems;
        if(this.props.template.content.body.definitions){
            let defineList = this.props.template.content.body.definitions;
            definedItems = this.displayDefinitions(defineList);
        }

        let paymentItems;
        if(this.props.template.content.body.payments){
            let payment = this.props.template.content.body.payments;
            paymentItems = this.displayComponent(payment);
        }


       // return (<div></div>);


        return (
            <div>
                <div className="borderLine" >
                    <label style={labelA}>Template: </label>
                    <label>{this.props.template.id}</label>
                </div>
                <div style={labelRight}>
                    <input style={inputMargin} type="textbox" name='contractName'  onChange={this.onChange} placeholder="contract name...">
                    </input>
                    <input type="button" 
                            value="Save Contract" 
                            className="btn" onClick={this.onSubmit}>
                    </input>
                    <input type="button" 
                            value="Export to Alfrasco" 
                            className="btn">
                    </input>
                </div>

                <div style={formStyleB}>
                    {headerItems}
                    {definedItems}
                    {paymentItems}
                </div>
            </div>
        )

    }


}


const inputMargin = {
    margin: "0px 20px 5px 5px"
  };

const labelRight = {
    padding: '10px 10px 10px 10px',
    float: 'right',
    backgroundColor: '#b4d0f7',
  };

const divPadding = {
    padding: '5px 5px 5px 5px',
};

const labelCenter = {
  padding: '1px 1px 1px 1px',
  float: 'center',
  backgroundColor: '#dbe8fc',
  textAlign: 'center'
};

const labelDisplayRight = {
    padding: '1px 1px 1px 1px',
    backgroundColor: '#dbe8fc',
    textAlign: 'right'
  };

const labelA = {
    padding: '5px 20px'
  };

const formStyleA = {
    padding: '5px 10px'
  };

const formStyleB = {
    backgroundColor: '#f4f8ff',
    padding: '5px 10px',
    color: '#000'
  };

const selected = {
    backgroundColor: '#b4d0f7',
    padding: '5px 10px',
    color: '#1376d8',
    border: '10px',
    borderColor: '#1376d8'
};
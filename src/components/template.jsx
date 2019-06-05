import React, { Component } from 'react';
//import Tokenizr from 'Tokenizr';

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

    getCodeValue = (db_infor) => {
        if(this.props.onEvent){
            this.props.onEvent({
                type: 'getCodeValue',
                parameters: { table: db_infor.table, codeName: db_infor.codeName}
            });
        }
    }

    parse_tag(s) {
        console.log(">>>parsing tag>>> ", s);
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
                    console.log("null");
                    return (<div></div>);
                }

                let fieldItems = this.split_apart(line.field);
                if(fieldItems){
                    console.log('---------------------------');
                    console.log(fieldItems);
                }

                let row;
                row = fieldItems.map( (item, j) => {
                    console.log(item);
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
                          if(varNote.toUpperCase().includes("VVV")){
                            let db_info = varNote.split(":");
                            let table = db_info[1];
                            let codeName = db_info[2];

                            // console.log(this.props.data.codetables[codeName]);

                            if(this.props.data.codetables[codeName]){
                                // display dropdownlist
                                //if()
                                console.log(this.props.data.codetables[codeName]);
                            }
                            else{
                                let parameters = {
                                  table: table,
                                  codeName: codeName
                                };
                                this.getCodeValue(parameters);
                            }
                          }

                          return (
                              <select>
                                  
                              </select>
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
                        return (
                            <label>
                                {item.value}
                            </label>
                        );
                    }

                });

                return (
                    <div>
                        {row}
                    </div>
                );

            })
        }

        return lines;
    }


    render() {
        if(!this.props.template.content){
            console.log(this.props.template.content);
            return (<div></div>);
        }
        let roles = this.props.template.content.body;
        console.log(roles);

        let header = this.props.template.content.body.header;
        let headerItems = this.displayComponent(header);

        let payment = this.props.template.content.body.payments;
        let paymentItems = this.displayComponent(payment);

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
                    {/* {items} */}
                    {headerItems}
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

const labelA = {
    padding: '5px 20px'
  };

const formStyleA = {
    padding: '5px 10px'
  };

const formStyleB = {
    backgroundColor: '#e8eff9',
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
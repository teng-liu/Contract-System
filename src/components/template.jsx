import React, { Component } from 'react'


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
        //e.preventDefault();
        console.log('hello');
        if(this.props.onEvent){
            this.props.onEvent({
                type: 'saveContract'
            });
        }
      }

    render() {
        if(!this.props.template.content){
            console.log(this.props.template.content);
            return (<div></div>);
        }
        let roles = this.props.template.content.roles;
        console.log(roles);
        let contractAuthor;
        if(roles){
            roles.forEach(function(role) {
                if(role.role === "contract-author"){
                    console.log(role);
                    contractAuthor = role.content;
                }
            });
        }
        
        let items;
        if(contractAuthor){
            items = contractAuthor.map((item, i) => {

                // analysis the item, convert to corresponding component
                let i1 =  item.field.indexOf("$[");
                let partI =  item.field.slice(0, i1);
                let i2 =  item.field.indexOf("]");
                let vars =  item.field.slice(i1+2, i2);
                let partII = item.field.slice(i2+1);

                // analysis the vars   var-name::type::display
                let varInfor = vars.split("::");
                let varName = varInfor[0]; 
                let varType = varInfor[1];
                let varNote = varInfor[2];

                if(varType === "textinput"){
                    return (
                        <div key={item.code} style={formStyleA}>
                            <label>{partI}
                                <input type="text" name={varName} placeholder={varNote} onChange={this.onChange}></input>
                            </label>
                            <br />
                        </div>
                    )
                }
                else if(varType === "textarea"){
                    return (
                        <div style={formStyleA}>
                            <label>{partI}
                                <br />
                                <textarea name={varName} placeholder={varNote} onChange={this.onChange}>
                                </textarea>
                                <br />
                            </label>
                        </div>
                    )
                }
                else if(varType === "checkbox"){
                    return (
                        <div style={formStyleA}>
                            <label>{partI}
                                <input type="checkbox" name={varName} onChange={this.onChange} />
                            </label>
                        </div>
                    )
                }
                else if(varType === "calander"){
                    return (
                        <div style={formStyleA}>
                            <label>{partI}
                                <input type="date" name={varName} onChange={this.onChange}></input>
                            </label>
                        
                        </div>
                    )
                }
                else if(varType === "singleselection"){
                    let values = varNote.split(",");

                    return (
                        <div style={formStyleA}>
                            <label>{partI}
                                {this.buildRadioButtons(values, "radio", varName)}
                            </label>
                        </div>
                    )
                }
                else if(varType === "multipleselection"){

                }
                else{

                }
            })
        }

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
                    {items}
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
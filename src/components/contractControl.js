import React, { Component } from 'react'

export default class ContractControl extends Component {

    buildRadioButtons(arr, type, id) {
        return arr.map((choice, i) => {
          return (
            <div key={i}>
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
    
    render() {
        let roles = this.props.roles;
        let contractAuthor;
        if(roles){
            roles.forEach(function(role) {
                if(role.role === "contract-author"){
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
                                <input type="text" name={varName} placeholder={varNote}></input>
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
                                <textarea name={varName} placeholder={varNote}>
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
                                <input type="checkbox" name={varName} />
                            </label>
                        </div>
                    )
                }
                else if(varType === "calander"){
                    return (
                        <div style={formStyleA}>
                            <label>{partI}
                                <input type="date" name={varName}></input>
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
            <div style={formStyleB}>
                {items}
            </div>
        )

    }
}

const formStyleA = {
    padding: '5px 10px'
  };

const formStyleB = {
    backgroundColor: '#7b7e82',
    padding: '5px 10px',
    color: '#fff'
  };

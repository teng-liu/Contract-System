import React, { Component } from 'react'

export default class DropDownBox extends Component {

    componentDidMount() {

        let data = this.props.dataSource;
        let varNote = data.varNote;
        

        if(varNote.toUpperCase().includes("VVV")){
            let db_info = varNote.split(":");
            let table = db_info[1];
            let codeName = db_info[2];

            this.codeName = codeName;

            if(this.props.onEvent){
                this.props.onEvent({
                    type: 'getCodeValue',
                    parameters: { table: table, codeName: codeName}
                });
            }


            // if(this.props.data.codetables[codeName]){
            //     // display dropdownlist
            //     //if()
            //     console.log(this.props.data.codetables[codeName]);
            // }
            // else{
            //     let parameters = {
            //       table: table,
            //       codeName: codeName
            //     };
            //     this.getCodeValue(parameters);
            // }
          }
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


    render() {
        if(this.props.codetables[this.codeName]){
            return (            
                <select name={this.props.name} onChange={this.onChange}>
                    {/* {this.state.teams.map((team) => <option key={team.value} value={team.value}>{team.display}</option>)} */}
                    {this.props.codetables[this.codeName].body.map((code) => <option key={code.code} onChange={this.onChange} value={code.display}>{code.display}</option>)}
                </select>
            );
        }
        else{
            return (
                <select></select>
            );
        }
    }
}



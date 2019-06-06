import React, { Component } from 'react'

export default class Definitions extends Component {

    componentDidMount(){
        // call api to get all the definitions, 
        // then analysis the required ones to display

        if(this.props.onEvent){
            this.props.onEvent({
                type: 'getDefinitions',
                parameters: {}
            });
        }

        if(this.props.required.list){
            this.required = this.props.required.list.split(";");
        }


        if(this.props.definitions){
            console.log(this.props.definitions);
        }

    }




    render() {
        if(this.required && this.props.required){
            return (
                <div>
                    <h4>{this.props.required.title}</h4>
                    {this.required.map((defineName) => <div style={divPadding}><label>{this.props.definitions[defineName]}</label></div>)}
                </div>
            );
        }
        return (<div></div>);


    }
}


const divPadding = {
    padding: '5px 5px 5px 5px',
};
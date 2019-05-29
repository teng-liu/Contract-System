import React, { Component } from 'react'

export default class TemplateList extends Component {

    
    select(item) {
        if(this.props.onEvent){
            this.props.onEvent({
            type: 'setCurrentTemplate',
            parameters: { id: item.name_key, content: item.content }
        });
    }}

    render() {
        // const listData = ['aaa', 'bbb', '0000', 'aaera', 'btwebb'];
        const listData = this.props.templateList;

        const listItems = listData.map((item) => { 
            return (<li key={item.uuid} 
                        style={normal} 
                        onClick={() => this.select(item)}>
                        {item.name_key}
                    </li>);
        }
        );

        console.log(this.props.current);
        return (
            <div>
                <ul>
                    {listItems}
                </ul>
                <div style={selected}>
                    {this.props.current}
                </div>
                
            </div>
        )
    }
}



const selected = {
    backgroundColor: '#4286f4',
    padding: '5px 10px',
    color: '#fff'
  };
const normal = {
    backgroundColor: '#fff',
    padding: '5px 10px',
    color: '#7b7e82'
  };

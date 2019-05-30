import React, { Component } from 'react'

export default class TemplateList extends Component {

    
    select(item) {
        if(this.props.onEvent){
            this.props.onEvent({
                type: 'setCurrentTemplate',
                parameters: { id: item.name_key, content: item.content }
            });
        }
    }

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

        return (
            <div>
                <ul>
                    {listItems}
                </ul>
                
            </div>
        )
    }


}




const selected = {
    backgroundColor: '#b4d0f7',
    padding: '5px 10px',
    color: '#1376d8'
  };
const normal = {
    backgroundColor: '#fff',
    padding: '5px 10px',
    color: '#7b7e82'
  };

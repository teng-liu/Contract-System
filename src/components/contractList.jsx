import React, { Component } from 'react'

export default class ContractList extends Component {

    select(item) {
        console.log("contract: ", item.name_key)
        // if(this.props.onEvent){
        //     this.props.onEvent({
        //         type: 'setCurrentContract',
        //         parameters: { id: item.name_key, content: item.content }
        //     });
        // }
    }

    render() {
        // const listData = ['aaa', 'bbb', '0000', 'aaera', 'btwebb'];
        const listData = this.props.contractList;

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
                <ul className="ulNoBullets">
                    {listItems}
                </ul>
                
            </div>
        )
    }
}


const normal = {
    backgroundColor: '#fff',
    padding: '5px 10px',
    color: '#7b7e82'
  };
import React, { Component } from 'react'

export default class ExampleComponent extends Component {


    select(id) {
        if(this.props.onEvent){
            this.props.onEvent({
                type: 'user-selected',
                parameters: { id: id }
            })
        }
    }

    render() {
        let data = this.props.data;
        let items;
        if(data) {
            items = data.users.map((user, i) => {
                return (
                    <div key={user.id} 
                        className={data.selected === user.id ? "row-selected": "row"}
                        onMouseDown={() => this.select(user.id)}>
                        <div className="cell1">{user.firstName}</div>
                        <div className="cell2">{user.lastName}</div>
                    </div>
                )
            })
        }

        return (
            <div className="table">
                {items}
            </div>
        )
    }
}



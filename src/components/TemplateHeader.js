import React, { Component } from 'react'

export default class TemplateHeader extends Component {
  render() {


    const items = this.props.lines.map(line => (
        <div key={line.lineorder}>
            <label className="Label-content">{line.line}</label>
        </div>
    ));


    return (
        <div >
            {items}
        </div>
    );


  }
}

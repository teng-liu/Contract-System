import React, { Component } from 'react'
import contract from '../contract.png';
import template from '../template.png';
import settings from '../settings.png';
import home from '../home.jpg';

export default class Navigator extends Component {


    onClick = (e) => {
        console.log('clicked: ', e.target.name);
        if(this.props.onEvent){
            this.props.onEvent({
                type: 'updateCurrentTab',
                parameters: e.target.name
            });

            if(e.target.name === 'contract'){
                this.props.onEvent({
                    type: 'getContractList'
                })
            }

        }

    }

    render() {
        return (

            <div className="nav">
            <div>
                <button className="img-btn" 
                        title="Home panel"
                        onClick={this.onClick}>
                    <img name="home"  src={home} className="img-normal" onClick={this.onClick} ></img>
                </button>
            </div>
            <div>
                <button className="img-btn" 
                        title="Contract"
                        onClick={(e) => this.onClick(e)}>
                    <img name="contract"  src={contract} className="img-normal" onClick={this.onClick} ></img>
                </button>
            </div>
            <div>
                <button onClick={this.onClick} 
                        className="img-btn" 
                        title="Contract Template">
                    <img name="template"  src={template} className="img-normal" onClick={this.onClick}  ></img>
                </button>
            </div>
            <div>
                <button className="img-btn" 
                        title="Settings - Role Configuration"
                        onClick={this.onClick}>
                    <img name="settings"  src={settings} className="img-normal" onClick={this.onClick} ></img>
                </button>
            </div>
        </div>

        )
    }
}

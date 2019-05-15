import React, {Component} from 'react';
import logo from './logo.PNG';
import './App.css';
import TemplateHeader from './components/TemplateHeader';
import Store from './store';

class App extends Component {

    constructor(props){
        super(props);
        this.store = new Store();        // define store first, outside class ??
        this.store.redux.subscribe(() => this.onStateChange());     // subscribe -> addListener
        this.state = {};
    }

    componentDidMount() {
        let fakeState = {
            "head": {
                "id": "contract-template-itss",
                "code": "contract-template-itss",
                "title": "Default Contract Template",
                "version": "1.0"
            },
            "body": {
                "clauses": [
                    {
                        "type": "title/1",
                        "field": "{$agreement-name}"
                    },
                    {
                        "type": "body/begining",
                        "field": [
                            {
                                "lineorder": 1,
                                "line": "THIS AGREEMENT made this {$made-date, #formate-date}"
                            },
                            {
                                "lineorder": 2,
                                "line": "BETWEEN: {$party-a}, as represented by the Minister of {$party-a-minister}",
                                "line-note": "(hereinafter referred to as \"Government\")",
                                "line-break": "OF THE FIRST PART;"
                            },
                            {
                                "lineorder": 3,
                                "line": "AND: {$party-b-department}, of {$party-b-company} in {$party-b-county} County,  Province of {$party-b-province}",
                                "line-note": "(hereinafter referred to as the \"Contractor\")",
                                "line-break": "OF THE SECOND PART."
                            },
                            {
                                "lineorder": 4,
                                "line": "WHEREAS Government wishes to engage the services of the Contractor to carry out the services described in Schedule \"A\" attached hereto;"
                            },
                            {
                                "lineorder": 5,
                                "line": "AND WHEREAS the Contractor has agreed to provide Government with these services on certain terms and conditions as more particularly set out in this Agreement;"
                            },
                            {
                                "lineorder": 6,
                                "line": "NOW THEREFORE in consideration of the mutual promises contained in this Agreement, the Parties agree that the terms and conditions of their relationship are as follows:"
                            }]
                    },
                    {
                        "type": "body/definitions",
                        "title": "Definitions",
                        "field": "In this Agreement, the following definitions apply: {$definitions}"
                    }
                ]
            }
        };      // end of state

        let action = {
            type: "reset",
            parameters: { state: fakeState }
        }
        this.store.redux.dispatch(action);      // redux accept this action


    } // end of componentDidMount


    /** Everytime state changed, setState() called */
    onStateChange() {
        let s = this.store.redux.getState();
        this.setState({data: s});       // data -> state.data stores all the state
    }
  
    
    render(){
        return (
        <div>
            <div className="App-header">
                <p>Contract Management System</p>
            </div>
            <div>
                <TemplateHeader lines={this.state.body}/>
            </div>
        </div>
        );
    }
}

export default App;

import React, {Component} from 'react';
import './App.css';
import TemplateHeader from './components/TemplateHeader';
import ExampleComponent from './components/exampleAction';
import Store from './store';
import ContractControl from './components/contractControl';

class App extends Component {

    constructor(props){
        super(props);
        this.store = new Store();        // define store first, outside class ??
        this.store.redux.subscribe(() => this.onStateChange());     // subscribe -> addListener
        this.state = {
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
            },
            "data": {
                "selected": 1,
                "users": [
                    {"id": 1, "firstName": "Smith", "lastName": "Lee"},
                    {"id": 2, "firstName": "Lucy", "lastName": "Huang"}
                ]
            }
        };
    }

    componentDidMount() {
        let s = {
            "data": {
                "selected": 1,
                "users": [
                    {"id": 1, "firstName": "Smith", "lastName": "Lee"},
                    {"id": 2, "firstName": "Lucy", "lastName": "Huang"}
                ]
            }

        };      // end of state.data

        let controlData = {
            "roles": [
                {
                    "role": "contract-author",
                    "content": [
                        {
                            "code": "contract-title",
                            "field": "TITLE OF THE CONTRACT: $[contract-title::textinput::Type Here. Provide a descriptive title and ensure it matches the title on the contract document]"
                        },
                        {
                            "code": "vender-name",
                            "field": "VENDOR NAME: $[vendor-name::textinput::Type here]",
                            "requirement": "$[verified::checkbox]I verified that the vendor is registered to do business on PEI (Registry$[registry-link::link::https://www.princeedwardisland.ca/en])"
                        },
                        {
                            "code": "start-end-date",
                            "field": "START DATE: $[start-date::calander::Type Here]  END DATE: $[start-date::calander::Type Here]"
                        },
                        {
                            "code": "contract-summary",
                            "field": "CONTRACT SUMMARY: $[contract-summary::textarea::The summary is meant to be a description, in layman’s terms, of what the vendor will provide to government within this contract. It is intended to brief executive leadership about the contract. It should be summarized in 3-4 sentences.]"
                        },
                        {
                            "code": "contract-type",
                            "field": "$[contract-type::singleselection::Professional Services,Maintenance/Service Support,Standing Offer Contract]"
                        },
                        {
                            "code": "amendment-no",
                            "field": "Amendment No: $[amendment-no::textinput::Type here]"
                        },
                        {
                            "code": "contract-value",
                            "field": "TOTAL CONTRACT VALUE: $ $[totalvalue::textinput::Type here]",
                            "requirement": "Value/Year (if multi-year, add as needed): 2018-2019: $ $[value-20182019::textinput::Type here] 2019-2020: $ $[value-20192020::textinput::Type here] 2020-2021: $ $[value-20202021::textinput::Type here]"
                        },
                        {
                            "code": "history-contract-value",
                            "field": "HISTORICAL CONTRACT VALUE",
                            "requirement": "Add Previous Years if same scope of work: 2016-2017: $ $[value-20162017::textinput::Type here] 2017-2018: $ $[value-20172018::textinput::Type here]"
                        },
                        {
                            "code": "associated-tb-ec",
                            "field": "List associated TB/EC decision#, if applicable $[associated-tb-ec::textinput::Type here]"
                        },
                        {
                            "code": "contract-notes",
                            "field": "CONTRACT NOTES: $[contract-notes::textarea::Type here  If there are any notes to be highlighted regarding increases in costs, or other relevant notes – please add that detail here]"
                        },
                        {
                            "code": "vender-selected-by",
                            "field": "Vendor Selected by: $[vender-selected-by::singleselection::Competitive Process, Sole Source, Three Quotes Received]"
                        },
                        {
                            "code": "background-documentation",
                            "field": "Background Documentation: $[background-doc::multipleselection::Used standard template with no changes, Legal Review Notes Attached, Risk Review Notes Attached, The Contract Review Checklist was completed and is included in the contract package (available on Alfresco)]"
                        },
                        {
                            "code": "contract-management-items",
                            "field": "Ongoing Follow-up Required: $[ongoing-required::textarea::Identify any conditions in the contract ie reporting dates, multiple payment dates, or credit reviews that needs to be reviewing during the life of the contract]",
                            "requirement": "Option to Extend:  $[option-extend::textarea::Identify any option to extend the contract and provide a note on extension details]"
                        },
                        {
                            "code": "contract-management-items",
                            "field": "BUDGET SECTION CODES: $[budegt-section::textarea::Section] $[budegt-object::textarea::Object] $[budegt-program::textarea::Program] $[budegt-project::textarea::Project] $[budegt-contract-no::textarea::Contract #] ",
                            "notes": "Authors should confirm budget codes with Manager/Director Contract# is provided by SCC and is required to be referenced in the SOW"
                        }
                    ]
    
    
                },
                {
                    "role": "scc",
                    "content": {}
                },
                {
                    "role": "approvals",
                    "content": {}
                }
    
            ]
        };


        // let action = {
        //     type: "reset",
        //     parameters: { state: s.data }
        // }

        let action = {
            type: "reset",
            parameters: { state: controlData.roles }
        }

        this.store.redux.dispatch(action);      // redux accept this action
       // this.store.redux.dispatch(displayRoles);      // redux accept this action

    } // end of componentDidMount


    /** Everytime state changed, setState() called */
    onStateChange() {
        let s = this.store.redux.getState();
        //this.setState({data: s});       // data -> state.data stores all the state
        this.setState({roles: s});       // data -> state.data stores all the state
    }
  
    onEvent(e) {
        if(e.type === 'user-selected'){
            let action = {
                type: 'select-user',
                parameters: {
                    id: e.parameters.id
                }
            }
            this.store.redux.dispatch(action);
        }
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
            <div>
                <h1>React, Redux example</h1>
                {/* <ExampleComponent 
                    data={this.state.data} 
                    onEvent={(e)=>this.onEvent(e)} /> */}
            </div>
            <div>
                <h1>IT SHARED SERVICES CONTRACT/AGREEMENT APPROVAL</h1>
                <ContractControl roles={this.state.roles}/>
            </div>
        </div>
        );
    }
}

export default App;

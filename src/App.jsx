import React, {Component} from 'react';
import './App.css';
import TemplateHeader from './components/TemplateHeader';
import ExampleComponent from './components/exampleAction';
import Store from './store';
import ContractControl from './components/contractControl';
import TemplateList from './components/templateList';
import Template from './components/template';

class App extends Component {

    constructor(props){
        super(props);
        this.store = new Store();        // define store first, outside class ??
        this.store.redux.subscribe(() => this.onStateChange());     // subscribe -> addListener
        this.state = {
            localdb: {
                currentTemplate: "", 
                currentContract: {
                    uuid: "",
                    nameKey: "",
                    content: {
                        head: {},
                        body: {}
                    }
                },
                data: {
                    templates:[],
                    contracts:[],
                    codetables: {},
                    definitions:{}
                    
                }
            }
        }
    }

        /**
         * state => {
         * 
         * current: "",
         * data: {
         *      templates: {},
         *      contacts: {}
         * }
         * }
         */



    

    componentDidMount() {

        // call api get Template
        let action = {
            type: 'GetTemplateList',
            kind: 'api',
            status: 'new'
        }

        this.store.redux.dispatch(action)        // redux accept this action
    }

    /** Everytime state changed, setState() called */
    onStateChange() {
        let s = this.store.redux.getState();
        this.setState({localdb: s.localdb});
    }
  
    onEvent(e) {
        console.log(e);
        if(e.type === 'user-selected'){
            let action = {
                type: 'select-user',
                kind: 'api',
                status: 'new',
                parameters: {
                    id: e.parameters.id
                }
            }
            this.store.redux.dispatch(action);
        }
        else if(e.type === 'setContractProperty'){
            console.log(e.parameters);
            
            let action = {
                type: 'UpdateContractAttribute',
                parameters: e.parameters
            }
            this.store.redux.dispatch(action);

            // parameters: {
            //     key: "vendor-name",
            //     value: "delta"
            // }
        }
        else if(e.type === 'saveContract'){
            console.log(e);
            if(this.state.localdb.currentContract.nameKey !== "") {
                let action = {
                    type: 'UpsertContractByKey',
                    kind: 'api',
                    status: 'new',
                    parameters: {}
                }
                this.store.redux.dispatch(action);
            }
            else{
                alert("Please input contract Name");
            }

        }
        else if(e.type === 'setCurrentTemplate'){
            let action = {
                type: "SetCurrentTemp",
                parameters: e.parameters
            }
            this.store.redux.dispatch(action);
        }
        else if(e.type === 'getCodeValue'){
            let action = {
                type: 'GetCodeValue',
                kind: 'api',
                status: 'new',
                parameters: e.parameters
            }
            this.store.redux.dispatch(action);
        }
        else if(e.type === 'getDefinitions'){
            let action = {
                type: 'GetDefinitions',
                kind: 'api',
                status: 'new'
            }
            this.store.redux.dispatch(action);
        }

    }

    render(){
        if (this.state) {
            return (
                <div>
                    <div className="App-header">
                        <h1>Contract Management System</h1>
                    </div>

                    {/* <div>
                        <TemplateHeader lines={this.state.data.body}/>
                    </div>
                    <div>
                        <h1>React, Redux example</h1>
                        <ExampleComponent 
                            data={this.state.data.data} 
                            onEvent={(e)=>this.onEvent(e)} />
                    </div>
                    <div>
                        <h1>IT SHARED SERVICES CONTRACT/AGREEMENT APPROVAL</h1>
                        <ContractControl roles={this.state.data.roles}/>
                    </div> */}

                    <div>
                        <input type="button" 
                                name="btn_template_builder"
                                value="Template Builder" 
                                className="btnLeft">
                        </input>
                    </div>
                    <br />
                    <div>
                        <h1>Contract Template List</h1>
                    </div>

                    <div>
                        <TemplateList 
                            onEvent={(e)=>this.onEvent(e)} 
                            templateList={this.state.localdb.data.templates}/>
                    </div>
                    <div>
                        <Template 
                            onEvent={(e)=>this.onEvent(e)} 
                            template={this.state.localdb.currentTemplate}
                            codetables={this.state.localdb.data.codetables}
                            definitions={this.state.localdb.data.definitions}/>
                    </div>
                </div>
                )        
        }
        else { 
            return (
            <div>
            </div>)
        }
    }
}

export default App;

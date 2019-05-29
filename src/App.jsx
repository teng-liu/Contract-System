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
                current: "", 
                data: {
                    templates:[],
                    contracts:[]
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

        // let action = {
        //     type: 'GetControlSheet',
        //     kind: 'api',
        //     status: 'new'
        // }

        // let action = {
        //     type: "reset",
        //     parameters: { state: s.data }
        // }

        // call api get Templat
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
        console.log(s);
        this.setState({localdb: s.localdb});
        console.log(this.state);
    }
  
    onEvent(e) {
        console.log(e.parameters);
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
        else if(e.type === 'submitContractI'){
            
        }
        else if(e.type === 'setCurrentTemplate'){
            let action = {
                type: "SetCurrentTemp",
                parameters: e.parameters
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
                        <h1>Contract Template List</h1>
                    </div>
                    <div>
                        <TemplateList 
                            onEvent={(e)=>this.onEvent(e)} 
                            current={this.state.localdb.current} 
                            templateList={this.state.localdb.data.templates}/>
                    </div>
                    <div>
                        <Template template={this.state.localdb.current}/>
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

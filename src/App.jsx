import React, {Component} from 'react';
import './App.css';
import TemplateHeader from './components/TemplateHeader';
import ExampleComponent from './components/exampleAction';
import Store from './store';
import ContractControl from './components/contractControl';
import TemplateList from './components/templateList';
import ContractList from './components/contractList';
import Template from './components/template';
import itss from './itss.png';
import Navigator from './components/navigator';

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
                currentTab: "",
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
        else if(e.type === 'updateCurrentTab'){
            console.log('updateCurrentTab -> SetCurrentTab', e.parameters);
            let action = {
                type: "SetCurrentTab",
                parameters: e.parameters
            }
            this.store.redux.dispatch(action);
        }
        else if(e.type === 'getContractList'){
            let action = {
                type: 'GetContractList',
                kind: 'api',
                status: 'new'
            }
    
            this.store.redux.dispatch(action);
        }

    }


    currentTab () {
        if(this.state.localdb.currentTab) {
            if(this.state.localdb.currentTab === 'home'){
                return (
                    <div className="templateList">This is Home Page</div>
                );
            }
            else if(this.state.localdb.currentTab === 'template'){
                return (

                    <div className="templateList">
                        {/* <div>
                            <div>here will display the informations of contract/templat</div>
                        </div> */}
                        <div>
                            <div>
                                <h3 className="h2Color">Contract Template List</h3>
                            </div>
                            <div>
                                <TemplateList 
                                    onEvent={(e)=>this.onEvent(e)} 
                                    templateList={this.state.localdb.data.templates}
                                    currentTemp={this.state.localdb.currentTemplate}/>
                            </div>
                        </div>
                        <div>
                            <Template 
                                onEvent={(e)=>this.onEvent(e)} 
                                template={this.state.localdb.currentTemplate}
                                codetables={this.state.localdb.data.codetables}
                                definitions={this.state.localdb.data.definitions}/>
                        </div>
                    </div>

                    );
            }
            else if(this.state.localdb.currentTab === 'contract'){
                return (
                    <div className="templateList">
                        <div>
                            <h3 className="h2Color">Contract List</h3>
                        </div>
                        <div>
                            <ContractList 
                                onEvent={(e)=>this.onEvent(e)} 
                                contractList={this.state.localdb.data.contracts}/>
                        </div>
                    </div>
                    );
            }
            else if(this.state.localdb.currentTab === 'settings'){
                return (
                    <div className="templateList">This is Settings Page</div>
                    );
            }
            else { 
                return (<div></div>)
            }

        }
    }

    render(){
        let currenttab = this.currentTab();
        if (this.state) {
            return (
                <div className="grid">
                    <div className="logo">
                        <img src={itss} className="img-logo"></img>
                    </div>
                    <div className="title">
                        <h1>ITSS Contract Management System</h1>
                    </div>

                    {/* <div>
                        <input type="button" 
                                name="btn_template_builder"
                                value="Template Builder" 
                                className="btnLeft">
                        </input>
                    </div>
                    <br /> */}

                    {/* <div className="nav">
                        <div>
                            <button name="btnHome" 
                                    className="img-btn" 
                                    title="Home panel"
                                    onClick={this.onEvent({'type': 'updateCurrentTab', 'parameters': 'home'})}>
                                <img src={home} className="img-normal"></img>
                            </button>
                        </div>
                        <div>
                            <button name="btnContract" className="img-btn" title="Contract">
                                <img src={contract} className="img-normal"></img>
                            </button>
                        </div>
                        <div>
                            <button name="btnTemplate" 
                                    onClick={this.onEvent({'type': 'updateCurrentTab', 'parameters': 'template'})} 
                                    className="img-btn" 
                                    title="Contract Template">
                                <img src={template} className="img-normal"></img>
                            </button>
                        </div>
                        <div>
                            <button name="btnSettings" 
                                    className="img-btn" 
                                    title="Settings - Role Configuration"
                                    onClick={this.onEvent({'type': 'updateCurrentTab', 'parameters': 'template'})}>
                                <img src={settings} className="img-normal"></img>
                            </button>
                        </div>
                    </div> */}
                    <Navigator onEvent={(e)=>this.onEvent(e)} />
                    {currenttab}
                    <div className="footer">I am footer...</div>
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

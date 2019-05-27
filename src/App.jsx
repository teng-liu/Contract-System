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
        this.state = {};

    }

    componentDidMount() {
        let action = {
            type: 'GetControlSheet',
            kind: 'api',
            status: 'new'
        }

        // let action = {
        //     type: "reset",
        //     parameters: { state: s.data }
        // }

        this.store.redux.dispatch(action)        // redux accept this action
    }

    /** Everytime state changed, setState() called */
    onStateChange() {
        let s = this.store.redux.getState();
        this.setState({data: s.data});          // data -> state.data stores all the state
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
        else if(e.type === 'submitContractI'){
            
        }
    }
    
    render(){
        if (this.state.data) {
            return (
                <div>
                    <div className="App-header">
                        <p>Contract Management System</p>
                    </div>
                    <div>
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
                    </div>
                </div>
                )        
        }
        else {
            return (<div />)
        }
    }
}

export default App;

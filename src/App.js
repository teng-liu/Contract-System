import React, {Component} from 'react';
import logo from './logo.PNG';
import './App.css';
import TemplateHeader from './components/TemplateHeader';

class App extends Component {

  state = {
    "head": {
        "id": "contract-template-itss",
        "code": "contract-template-itss",
        "title": "Default Contract Template",
        "version": "1.0"
    },
    "body": {
        "clauses": [
            {
                  "id": "23432",
                "type": "title/1",
                "field": "{$agreement-name}"
            },
            {
                 "id": "23432",
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
};

  render(){
    return (
      <div className="App">
        <header className="App-header">
          <p>Contract Management System</p>
          <TemplateHeader lines={this.state.body.clauses[1].field}/>
        </header>
      </div>
    );
  }
}

export default App;

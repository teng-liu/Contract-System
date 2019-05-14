import React, { Component } from 'react'
import { restElement } from '@babel/types';
import { notEqual } from 'assert';

class TemplateHeader extends Component {

    render() {
  
        let title = this.props.lines.clauses[0].field;
        let titleitem = (<div style={centerStyle}>{title}</div>);     //   "type": "title/1"   
    
        let items = this.props.lines.clauses[1].field.map(line => {
            var result;
            if(line.lineorder === 1){
                result = this.getLine1(line);
            }
            else if(line.lineorder === 2){
                result = this.getLine2(line);
            }
            else if(line.lineorder === 3){
                result = this.getLine3(line);
            }
            else{
                result = (
                 <div style={staticLines} key={line.lineorder}>
                    <label>{line.line}</label>
                </div>
                )
            }
            return result;
        });
    
    
        return (
            <div>
                {titleitem}
                <form name="formGeneral0" onSubmit={this.onSubmit} >
                    <input type="submit" 
                            value="Submit" 
                            className="btn"></input>
                    {items}
                </form>
            </div>
        );
      }



      onSubmit = (e) => {
        e.preventDefault();
        // this.formGeneral0.
        console.log(this.state);
      }

      onChange = (e) => {
          console.log([e.target.name, e.target.value]);
          this.setState({[e.target.name]: e.target.value});
          console.log(this.state);
      }
 
    getLine1(line) {
        // var regex = /(\w*)(\{\$[\w,$#\s-]+\})(\w*)/g;
        // var regex = /(?<left>\w*)(?<vars>\{\$[\w,$#\s-]+\})(?<right>\w*)/;
        // let res = regex.exec(line.line);
        // console.log(res.groups.left);
        var firstLeftS = line.line.indexOf("{");
        var firstLeftE = line.line.indexOf("}");

        var left = line.line.slice(0,firstLeftS);
        var vars = line.line.slice(firstLeftS,firstLeftE+1);   //{$made-date, #formate-date}
        var right = line.line.slice(firstLeftE+1);

        var reg = /\{\$([\w-]*), #([\w-]*)\}/;
        var res = vars.match(reg);
        var var1 = res[1];  // variable
        var var2 = res[2];  // format

        return (
        // <div key={line.lineorder}>
        //     <form>
                <div key={line.lineorder} style={staticLines}>
                    <label>{left}</label>
                    <input type="date" 
                            name="made-date"
                            onChange={this.onChange}></input>
                    <label>{right}</label>
                </div>
        //     </form>
        // </div>
        );
    }

    getLine2(line) {
                    
        var i1 = line.line.indexOf("{");
        var i2 = line.line.indexOf("}");

        var strBetween = line.line.slice(0,i1);
        var vars1 = line.line.slice(i1,i2+1);
        var remain = line.line.slice(i2+1);

        var middle = remain.slice(0,remain.indexOf("{"));
        var vars2 = remain.slice(1+remain.indexOf("{"));

        var lineNote = line["line-note"];
        var lineBreak = line["line-break"];

        return (
            // <div >
            //     <form style={formStyleA}>
                    <div style={formStyleA}>
                        <div>
                            <label>{strBetween}</label>
                            <input type="text" 
                                    name="party-a"
                                    width="800px"
                                    value="GOVERNMENT OF PRINCE EDWARD ISLAND"
                                    onChange={this.onChange}></input>
                            <label>{middle}</label>
                            <input type="text" 
                                    name="party-a-minister"
                                    onChange={this.onChange}></input>
                        </div>
                        <div>
                            <label>{lineNote}</label>
                        </div>
                        <div style={rightStyle}>
                            <label>{lineBreak}</label>
                        </div>
                    </div>
            //     </form>
            // </div>
        );
    }

    getLine3(line) {
        var i1o = line.line.indexOf("{");
        var i1c = line.line.indexOf("}");
        var strAnd = line.line.slice(0, i1o);
        var varPartyBdepartment = line.line.slice(i1o+1, i1c);
        var remain = line.line.slice(i1c+1);

        i1o = remain.indexOf("{");
        i1c = remain.indexOf("}");
        var str2 = remain.slice(0,i1o);
        var varPartBcompany = remain.slice(i1o+1, i1c);
        remain = remain.slice(i1c+1);

        i1o = remain.indexOf("{");
        i1c = remain.indexOf("}");
        var str3 = remain.slice(0,i1o);
        var varPartBcounty = remain.slice(i1o+1, i1c);
        remain = remain.slice(i1c+1);

        i1o = remain.indexOf("{");
        i1c = remain.indexOf("}");
        var str4 = remain.slice(0,i1o);
        var varPartBprovince = remain.slice(i1o+1, i1c);
        //remain = remain.slice(i1c+1);
        var lineNote = line["line-note"];
        var lineBreak = line["line-break"];

        return (
            <div style={formStyleB}>
                <label>{strAnd}</label>
                <input type="text" 
                        name="$party-b-department" 
                        onChange={this.onChange}></input>
                <label>{str2}</label>
                <input type="text" 
                        name="party-b-company" 
                        onChange={this.onChange}></input>
                <label>{str3}</label>
                <input type="text" 
                        name="party-b-county" 
                        onChange={this.onChange} 
                        placeholder="$party-b-county"></input>
                <label>{str4}</label>
                <input type="text" 
                        name="party-b-province" 
                        onChange={this.onChange} 
                        placeholder="$party-b-province"></input>
                <div>
                    <label>{lineNote}</label>
                </div>
                <div style={rightStyle}>
                    <label>{lineBreak}</label>
                </div>
            </div>

        );
    }



}

const formStyleA = {
    padding: '5px 10px'
  };
const formStyleB = {
    backgroundColor: '#f2f5f9',
    padding: '5px 10px'
  };
const rightStyle = {
    padding: '10px',
    textAlign: 'right'
  };
const centerStyle = {
    padding: '10px',
    textAlign: 'center'
  };
const staticLines = {
    padding: '5px 10px 5px 10px',
    
}
export default TemplateHeader;

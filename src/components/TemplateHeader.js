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
            console.log("line order is 1 =>" + line.line);
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

            result = (
            <div key={line.lineorder}>
                <form>
                    <div>
                        <label>{left}</label>
                        <input type="text" name="made-date" value="$made-date" minLength="60"></input>
                        <label>{right}</label>
                    </div>
                </form>
            </div>
            );
        }
        else if(line.lineorder === 2){
            console.log("line order is 2 =>" + line.line);
            
            var i1 = line.line.indexOf("{");
            var i2 = line.line.indexOf("}");

            var strBetween = line.line.slice(0,i1);
            var vars1 = line.line.slice(i1,i2+1);
            var remain = line.line.slice(i2+1);

            var middle = remain.slice(0,remain.indexOf("{"));
            var vars2 = remain.slice(1+remain.indexOf("{"));

            console.log(strBetween);
            console.log(vars);
            console.log(middle);
            console.log(vars2);

            var lineNote = line["line-note"];
            var lineBreak = line["line-break"];

            result = (
                <div >
                    <form style={formStyleA}>
                        <div>
                            <div>
                                <label>{strBetween}</label>
                                <input type="text" name="party-a" value="$party-a" minLength="60"></input>
                                <label>{middle}</label>
                                <input type="text" name="party-a-minister" value="$party-a-minister" minLength="60"></input>
                            </div>
                            <div>
                                <label>{lineNote}</label>
                            </div>
                            <div style={rightStyle}>
                                <label>{lineBreak}</label>
                            </div>
                        </div>
                    </form>
                </div>
            );
        }
        else if(line.lineorder === 3){
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

            result = (
                <div style={formStyleB}>
                    <form>
                        <div>
                            <div>
                                <label>{strAnd}</label>
                                <input type="text" name="$party-b-department" value="$party-b-department" minLength="60"></input>
                                <label>{str2}</label>
                                <input type="text" name="party-b-company" value="$party-b-company" minLength="60"></input>
                                <label>{str3}</label>
                                <input type="text" name="party-b-county" value="$party-b-county" minLength="60"></input>
                                <label>{str4}</label>
                                <input type="text" name="party-b-province" value="$party-b-province" minLength="60"></input>
                                <div>
                                    <label>{lineNote}</label>
                                </div>
                                <div style={rightStyle}>
                                    <label>{lineBreak}</label>
                                </div>
                            </div>

                        </div>
                    </form>
                </div>
            );

        }
        else{
            result = (
             <div key={line.lineorder}>
                <label>{line.line}</label>
            </div>
            )
        }
        return result;
    });


    return (
        <div >
            {titleitem}
            {items}
        </div>
    );


  }
}

const formStyleA = {
    backgroundColor: '#f4f4f0',
    padding: '5px 10px'
  };
const formStyleB = {
    backgroundColor: '#f4f4fa',
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

export default TemplateHeader;

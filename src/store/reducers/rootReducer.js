
export default function rootReducer(old, action) {

    if(old){
        if(action.type === 'reset'){
            return action.parameters.state;  
        }
        else if (action.type === 'GetContractList') {       // get all contracts - list
            if (action.status === 'succeeded') {
                return {
                    ...old,
                    localdb: {
                        ...old.localdb,
                        data: {
                            ...old.localdb.data,
                            contracts: action.response.data.contract
                        }
                    }
                }
            }
        }
        else if(action.type === 'GetTemplateList'){
            if(action.status === 'succeeded'){
                console.log(action.response.data.contract_template);
                return {
                    ...old,
                    localdb: {
                        ...old.localdb,
                        data: {
                            ...old.localdb.data,
                            templates: action.response.data.contract_template
                        }
                    }
                }
            }
        }
        else if(action.type === 'UpsertContractByKey') {
            // insert or update contract by key
            console.log(action);
            if(action.status === 'succeeded'){
                return old;
            }
        }
        else if(action.type === 'SetCurrentTemp'){
            return {
                ...old,
                localdb: {
                    ...old.localdb,
                    currentTemplate: action.parameters
                }
                
            };
        }
        else if(action.type === 'GetCodeValue'){

            if(action.status === 'succeeded'){
                let code = action.response.data;
                let codeName= code.name_key;
                let codeValue= code.content;
    
                return {
                    ...old,
                    localdb: {
                        ...old.localdb,
                        data: {
                            ...old.localdb.data,
                            codetables: {
                                ...old.localdb.data.codetables,
                                [codeName]: codeValue
                            }
                        }
                    }
                }
            }
        }
        else if(action.type === 'GetDefinitions'){
            if(action.status === 'succeeded'){
                console.log(action.response.data.definition);

                let defines = {};
                action.response.data.definition.forEach(function(define) {
                    defines[define.name_key] = define.content.body;
                });

                console.log(defines);

                return {
                    ...old,
                    localdb: {
                        ...old.localdb,
                        data: {
                            ...old.localdb.data,
                            definitions: defines
                        }
                    }
                }
            }
        }
        else if(action.type === 'UpdateContractAttribute'){     // update contract -> attributes, name, template-key
            if(action.parameters.key === 'contractName'){
                return {
                    ...old,
                    localdb: {
                        ...old.localdb,
                        currentContract: {
                            ...old.localdb.currentContract,
                            content: {
                                ...old.localdb.currentContract.content,
                                head: {
                                    ...old.localdb.currentContract.content.head,
                                    code: action.parameters.value,
                                    'template-key': old.localdb.currentTemplate.id
                                }
                            },
                            nameKey: action.parameters.value
                        }
                    }
                }
            }
            else{
                return {
                    ...old,
                    localdb: {
                        ...old.localdb,
                        currentContract: {
                            ...old.localdb.currentContract,
                            content: {
                                ...old.localdb.currentContract.content,
                                body: {
                                    ...old.localdb.currentContract.content.body,
                                    [action.parameters.key]: action.parameters.value
                                }
                            }
                        }
                    }
                }
            }

        }
        else if(action.type === 'select-user'){

            if (action.status === 'succeeded') {

                // shallow copy of every level:
                // https://redux.js.org/recipes/structuring-reducers/immutable-update-patterns
                return {
                    ...old,
                    data: {
                        ...old.data,
                        data: {
                            ...old.data.data,
                            selected: action.response.data.selected
                        }
                    }
                }
            }
        }



        return old;
    }
    else{               // if old is null, then return empty object {}
        return {
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
                    codetables:{},
                    definitions:{}
                }
            }
        }


    }
}

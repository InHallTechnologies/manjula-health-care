import React, { createContext, useReducer } from 'react';
import SAMPLE_FORM_ENTRY from '../enteties/sampleFormEntry';
import CONTEXT_TYPES from './contectType';


const Context = createContext();
const reducerFunction = (state, action) => {
    switch(action.type){
        case CONTEXT_TYPES.getUser :
        case CONTEXT_TYPES.getSampleRequest:{
            return {
                ...state
            }
        }
    
        case CONTEXT_TYPES.setUser:{
            return {
                ...state,
                userData:action.payload
            }
        }

      

        case CONTEXT_TYPES.setSampleRequest:{
            console.log(action.payload);
            return {
                ...state,
                sampleRequest:action.payload
            }
        }

        default:
            return {...state}
          
    }

}

export const Provider = ({children}) => {

    
    const [globalState, dispatchForGlobalState]  = useReducer(reducerFunction, {sampleRequest:SAMPLE_FORM_ENTRY});
    return(
        <Context.Provider value={[globalState, dispatchForGlobalState]}>
            {children}
        </Context.Provider>
    )
}

export default Context


import React, { createContext, useReducer } from 'react';
import CONTEXT_TYPES from './contectType';


const Context = createContext();
const reducerFunction = (state, action) => {
    switch(action.type){
        case CONTEXT_TYPES.getUser :
            return {
                ...state
            }
           
    
        case CONTEXT_TYPES.setUser:{
            return {
                ...state,
                userData:action.payload
            }
        }
        default:
            return {...state}
          
    }

}

export const Provider = ({children}) => {

    
    const [globalState, dispatchForGlobalState]  = useReducer(reducerFunction, null);
    return(
        <Context.Provider value={[globalState, dispatchForGlobalState]}>
            {children}
        </Context.Provider>
    )
}

export default Context


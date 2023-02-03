import React, { createContext, useReducer } from "react";

export const Cartcontext = createContext();
const Context = (props) => {
  const reducer = (state, action) => {
    switch (action.type) {
      case "ADD":
        const tempslate=state.filter((item)=>action.payload.id===item.id);
        if(tempslate.length>0){
             return state;
        }else{
            return[...state,action.payload]
        }
        case "INCREASE":
            const tempslate1=state.map((item)=>{
              if(item.id===action.payload.id){
                return{...item,quantity:item.quantity+1}
              }else{
                return item
              }
            });
            return tempslate1;
            case "DECREASE":
            const tempslate2=state.map((item)=>{
              if(item.id===action.payload.id){
                return{...item,quantity:item.quantity-1}
              }else{
                return item
              }
            });
            return tempslate2;
            case "REMOVE":
              const tempslate3=state.filter((item)=>item.id!==action.payload.id);
              return tempslate3;
      default:
        return state;
    }
  };
  const [state, dispatch] = useReducer(reducer, []);
  const cart = { state, dispatch };
  return (
    <Cartcontext.Provider value={cart}>{props.children}</Cartcontext.Provider>
  );
};

export default Context;

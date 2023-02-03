import React from "react";
import { useContext } from "react";
import { BsArrowLeft } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import { Cartcontext } from "../context/Context";

const Cart = () => {
  const globalstate = useContext(Cartcontext);
  const state = globalstate.state;
  const dispatch = globalstate.dispatch;
  const navigate=useNavigate();
  const total=state.reduce((total,item)=>{
    return total+item.price*item.quantity;
  },0)
 
  const handleClick=()=>{
    navigate('/')
  }
  return (
    <>
     {state.length===0
     ?
    <>
    <div className="d-flex justify-content-center mt-5">
    <h1 className="text-danger">Your Cart is Empty</h1>
    </div>
   <Link to={'/'}>
   <div className="d-flex justify-content-center mt-5">
    <span className="text-primary"><span><BsArrowLeft/></span>Start Shopping</span>
    </div>
   </Link>
   
    </>
     :
   <>
     <div className="container cart">
     {state.map((item, index) => {
       return (
         <div className=" " key={index}>
           <h2 className="text-info ms-2">{item.id}</h2>
           <img src={item.image} alt="imge" style={{ width: "75px" }} />
           <h5 className="text-primary ms-2">Title: {item.title}</h5>
           <h4 className="text-success ms-2">Price: {item.quantity*item.price}</h4>
           <div className="quantity">
             <button onClick={()=>dispatch({type:"INCREASE",payload:item})}>+</button>
             <p>{item.quantity}</p>
             <button  onClick={()=>
             {if(item.quantity>1){
               dispatch({type:"DECREASE",payload:item})
             }else{
               dispatch({type:"REMOVE",payload:item})
             }
             }}>-</button>
           </div>
           <span  onClick={()=>dispatch({type:"REMOVE",payload:item})}>Remove</span>
           <hr/>
         </div>
       );
     })}
    
     {state.length>0 && (
       <div className="float-right">
         <h2 className="text-danger">Total: {total}</h2>
       </div>
     )}
   </div>
   <div className="d-flex justify-content-end mb-4">
     <button className="btn btn-success" onClick={()=>handleClick()}>Home</button>
   </div>
   </>}
    </>
  );
};

export default Cart;

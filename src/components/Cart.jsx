import React from "react";
import { useContext } from "react";
import { BsArrowLeft } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import { Cartcontext } from "../context/Context";

const Cart = () => {
  const globalstate = useContext(Cartcontext);
  const state = globalstate.state;
  const dispatch = globalstate.dispatch;
  const navigate = useNavigate();
  const total = state.reduce((total, item) => {
    return total + item.price * item.quantity;
  }, 0);

  const handleClick = () => {
    navigate("/");
  };
  return (
    <>
      {state.length === 0 ? (
        <>
          <div className="d-flex justify-content-center mt-5">
            <h1 className="text-danger">Your Cart is Currently Empty</h1>
          </div>
          <Link to={"/"}>
            <div className="d-flex justify-content-center mt-5">
              <span className="text-primary">
                <span>
                  <BsArrowLeft />
                </span>
                Start Shopping
              </span>
            </div>
          </Link>
        </>
      ) : (
        <>
          <div>
            <div className=" container titles d-flex justify-content-between">
              <h3 className="product-product">Product</h3>
              <h3 className="product-title ">Title</h3>
              <h3 className="product-price me-5 ">Price</h3>
              <h3 className="product-Quantity me-5">Quantity</h3>
            </div>
            <div className="container cart ">
              {state.slice(0, 3).map((item, index) => {
                return (
                  <div className=" d-flex justify-content-between" key={index}>
                    <img
                      src={item.image}
                      alt="imge"
                      style={{ width: "75px" }}
                    />

                    <h5 className="text-primary"> {item.title}</h5>
                    <h4 className="text-success ms-5">
                      {" "}
                      {item.quantity * item.price}
                    </h4>
                    <div className="quantity d-flex justify-content-between ms-5">
                      <button
                        style={{ height: "27px", width: "50px" }}
                        onClick={() =>
                          dispatch({ type: "INCREASE", payload: item })
                        }
                      >
                        +
                      </button>
                      <p>{item.quantity}</p>
                      <button
                        style={{ height: "27px", width: "50px" }}
                        onClick={() => {
                          if (item.quantity > 1) {
                            dispatch({ type: "DECREASE", payload: item });
                          } else {
                            dispatch({ type: "REMOVE", payload: item });
                          }
                        }}
                      >
                        -
                      </button>
                    </div>

                    <hr />
                    <span
                      onClick={() =>
                        dispatch({ type: "REMOVE", payload: item })
                      }
                    >
                      Remove
                    </span>
                  </div>
                );
              })}

              <h5 className="text-primary">Title: {total}</h5>
            </div>
          </div>
          <div className="d-flex justify-content-end mb-4">
            <button className="btn btn-success" onClick={() => handleClick()}>
              Home
            </button>
          </div>
        </>
      )}
    </>
  );
};

export default Cart;

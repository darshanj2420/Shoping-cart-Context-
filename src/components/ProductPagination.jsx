
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Productpagination = ({ Dataperpage, Onpagechange,total}) => {
  const [count, setCount] = useState(1);

 

  const onButtonClick=(type)=>{
    if(type === "prev"){
      if(count === 1){
        setCount(1)
      }else{
        setCount(count - 1)
      }

    }else if(type === "next"){
      if(Math.ceil(total/Dataperpage)===count){
        setCount(count)
      }else{
        setCount(count + 1)
      }
     }
  }

  useEffect(() => {
    let value = Dataperpage * count;
    console.log("startvelue",value-Dataperpage);
    Onpagechange(value - Dataperpage, value);
    console.log("endvalue",value);
  }, [count]);
  return (
    <>
      <nav aria-label="Page navigation example">
        <ul className="pagination mb-0">
          <li className="page-item">
            <Link className="page-link" href="#">
              <span onClick={()=>onButtonClick("prev")}>Previous</span>
            </Link>
          </li>
          <li className="page-item">
            <Link className="page-link" href="#">
              1
            </Link>
          </li>
          <li className="page-item">
            <Link className="page-link" href="#">
              2
            </Link>
          </li>
          <li className="page-item">
            <Link className="page-link" href="#">
              3
            </Link>
          </li>
          <li className="page-item">
            <Link className="page-link" href="#">
              <span onClick={()=>onButtonClick("next")}>Next</span>
            </Link>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Productpagination;

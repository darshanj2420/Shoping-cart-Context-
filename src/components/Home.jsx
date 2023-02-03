import { useEffect, useState } from "react";

import axios from "axios";
import { useContext } from "react";
import { Cartcontext } from "../context/Context";
import { useNavigate } from "react-router-dom";
import ProductPagination from "./ProductPagination";

const Home = () => {
  const [api, setApi] = useState([]);
  const [inputFilter, setInputFilter] = useState("");
  const [Dataperpage] = useState(3);
  let [Itemsonpage, setItemsonpage] = useState({
    start: 0,
    end: Dataperpage,
  });

  let Onpagechange = (start, end) => {
    setItemsonpage({ start: start, end: end });
  };

  const navigate = useNavigate();
  const globalState = useContext(Cartcontext);
  const dispatch = globalState.dispatch;

  const handleAdd = () => {
    navigate("/cart");
  };

  console.log(globalState);
  useEffect(() => {
    try {
      const fetchdata = async () => {
        const data = await axios.get("https://fakestoreapi.com/products");
        setApi(data.data);
      };
      fetchdata();
    } catch (err) {
      console.log("error");
    }
  }, []);

  return (
    <>
      <div className="container">
        <div className="row">
          <h1 className="text-center mt-4 text-danger">Products</h1>
          <div className="text-center">
            <input
              type="text"
              placeholder="Search here..."
              onChange={(e) => {
                setInputFilter(e.target.value);
              }}
            />
          </div>
          {api
            .filter((e) => {
              if (inputFilter === "") {
                return e;
              } else if (
                e.title.toLowerCase().includes(inputFilter.toLowerCase())
              ) {
                return e;
              }
            })
            .slice(Itemsonpage.start, Itemsonpage.end)
            .map((e) => {
              e.quantity = 1;
              return (
                <>
                  <div className="col-lg-4 mt-4">
                    <div className="card d-flex justify-content-between">
                      <h2 className="text-info ms-2">{e.id}</h2>
                      <img src={e.image} alt="imge" style={{ width: "75px" }} />
                      <h5 className="text-primary ms-2">Title: {e.title}</h5>
                      <h4 className="text-success ms-2">Price: ${e.price}</h4>
                      <div className="d-flex justify-content-center mb-4 mt-2">
                        <button
                          className="btn btn-primary"
                          onClick={() =>
                            handleAdd(dispatch({ type: "ADD", payload: e }))
                          }
                        >
                          Add
                        </button>
                      </div>
                    </div>
                  </div>
                </>
              );
            })}
          <div className="d-flex justify-content-center mt-5">
            <ProductPagination
              Dataperpage={Dataperpage}
              Onpagechange={Onpagechange}
              total={api.length}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;

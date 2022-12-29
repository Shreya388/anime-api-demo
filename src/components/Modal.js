import React from "react";
import { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import "../App.css";

function Modal({ id, closeModal }) {

    const [query, setQuery] = useState("");
    const [list, setList] = useState([]);
    const [data, setData] = useState({})

    const getData = async () => {
        const res = await fetch(
          `https://api.jikan.moe/v4/anime/${id}`
        );
        const resData = await res.json();
        console.log("AA ", resData.data)
        setData(resData.data);
      };
    
      useEffect(() => {
        getData();
      }, []);
    
    return(
        <div className="Modal">
            <div className="model-container">
                <button className="btn close-btn" onClick={() => closeModal()}> X </button>
                <div className="container mt-4 box-content">
                    <img src={data?.images?.jpg?.image_url} height="100px" />
                    <h1 className="mt-2">{data?.title}</h1>
                    <b><p className="navbar-brand">{data?.type}</p></b>
                    <p className="navbar-brand">{data?.source}</p>
                    <p>{data?.synopsis}</p>
                </div>

            </div>
        </div>
        
    );
}

export default Modal;
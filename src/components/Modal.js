import React from "react";
import { useState, useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import { AiOutlineCloseCircle } from 'react-icons/ai';
import "../App.css";

function Modal({ id, closeModal }) {

    
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
                <button className="btn close-btn" onClick={() => closeModal()}> <AiOutlineCloseCircle /> </button>
                <div className="container mt-4 box-content">
                  <div className="container">
                  <Row>
                    <Col lg={4} md={12} sm={6}>
                    <img className="prev-img card-image" src={data?.images?.jpg?.image_url} />
                    </Col>
                    <Col lg={1}md={12} sm={1}>
                    
                    </Col>
                    <Col lg={7} md={12} sm={5}>
                      <div className="text-card mt-4">
                    <h1 className="mt-4">{data?.title}</h1>
                    <b><p className="navbar-brand">{data?.type}</p></b>
                    <p>{data?.synopsis}</p>
                    <br />
                    </div>
                    </Col>
                  </Row>
                  </div>
                </div>

            </div>
        </div>
        
    );
}

export default Modal;
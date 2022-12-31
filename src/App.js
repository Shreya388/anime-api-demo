import React from "react";
import "./App.css";
import { useState, useEffect } from "react";
import { Card, Col, Container, Navbar, Row } from "react-bootstrap";
import Modal from "./components/Modal";
import { FaSearch } from "react-icons/fa";
import { AiOutlineArrowRight } from "react-icons/ai";

function App() {
  const [query, setQuery] = useState("");
  const [list, setList] = useState([]);
  const [selectedID, setSelectedID] = useState(null);
  const [openModal, setOpenModal] = useState(false);

  const getData = async () => {
    const res = await fetch(
      `https://api.jikan.moe/v4/anime?q=${query}&limit=20`
    );
    const resData = await res.json();
    setList(resData.data || []);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="app">
      <Navbar variant="dark" className="myNavbar pt-4 pb-4">
        <Container>
          <div className="form-container">
            <input
              className="input-box"
              placeholder="Search Anime Series"
              type="search"
              onChange={(e) => setQuery(e.target.value)}
            />
            <button className="search-btn" type="button" onClick={getData}>
              <FaSearch />
            </button>
          </div>
        </Container>
      </Navbar>
      <div className="header">
        <div className="header-overlay">
        <img src="" />
        <h1 className="display-3 text-center text-white">Search Anime List</h1>
        </div>
        </div>
      <Container className="mt-4">
        
        <Row>
          {list?.map((item) => (
            <Col md={6} lg={4} sm={12}>
              <Card className="mt-4 box-card">
                <div key={item.youtube_id}>
                  <img
                    alt={item.mal_id}
                    className="anime-img"
                    src={item.images.jpg.large_image_url}
                  />
                  <Card.Body>
                    <b>
                      <p className="item-title">{item.title}</p>
                    </b>
                    <p>{item.year}</p>
                    <button
                      className="pt-2 pb-2 pl-3 pr-3 openModalBtn"
                      onClick={() => {
                        setSelectedID(item.mal_id);
                        setOpenModal(true);
                      }}
                    >
                      View More <AiOutlineArrowRight />
                    </button>
                  </Card.Body>
                </div>
              </Card>
            </Col>
          ))}
        </Row>

        {openModal && <Modal id={selectedID} closeModal={setOpenModal} />}
      </Container>
      <Navbar variant="dark" className="myNavbar mt-4 pt-4 pb-4">
        <Container>
          <p className="mx-auto text-white">Hello</p>
        </Container>
      </Navbar>
    </div>
  );
}

export default App;

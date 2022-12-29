import React from "react";
import "./App.css";
import { useState, useEffect } from "react";
import { Card, Col, Container, Navbar, Row } from "react-bootstrap";
import Modal from "./components/Modal";

function App() {
  const [query, setQuery] = useState("");
  const [list, setList] = useState([]);
  const [selectedID, setSelectedID] = useState(null)
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
          <img
            height="40px"
            src="https://i.ibb.co/p0P6V7M/Untitled-design-1.jpg"
            alt="logo"
          />

          <div className="mx-auto">
            <input
              className="input-box"
              placeholder="Search Anime Series"
              type="search"
              onChange={(e) => setQuery(e.target.value)}
            />
            <button className="search-btn" type="button" onClick={getData}>
              Search
            </button>
          </div>
        </Container>
      </Navbar>

      <Container className="mt-4">
        <Row>
          {list?.map((item) => (
            <Col md={6} lg={3} sm={12}>
              <Card className="mt-4">
                <div key={item.youtube_id}>
                  <img
                    alt={item.mal_id}
                    className="anime-img"
                    src={item.images.jpg.large_image_url}
                  />
                  <Card.Body>
                    <b>
                      <p>{item.title}</p>
                    </b>
                    <p>{item.duration}</p>
                    <button
                      className="btn btn-dark pt-2 pb-2 pl-3 pr-3 openModalBtn"
                      onClick={() => {
                        setSelectedID(item.mal_id)
                        setOpenModal(true);
                      }}
                    >
                      View
                    </button>
                  </Card.Body>
                </div>
              </Card>
            </Col>
          ))}
        </Row>

        {openModal && <Modal id={selectedID} closeModal={setOpenModal} />}
      </Container>
    </div>
  );
}

export default App;

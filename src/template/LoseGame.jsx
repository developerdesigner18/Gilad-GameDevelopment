import React, { Component } from "react";
import { Col, Row, Container, Image } from "react-bootstrap";

import { useNavigate } from "react-router-dom";
import "./loseGame.css";

const LoseGame = ({ playAgain, resetGame, gameData }) => {
  const navigate = useNavigate();

  return (
    // <div style={{ textAlign: "center" }}>
    //
    // </div>
    <div
      className={
        JSON.parse(localStorage.getItem("isDarkMode"))
          ? `container2Dark`
          : `container2Light`
      }
    >
      <div>
        <Row style={{ margin: 0, padding: 0 }}>
          <Col
            style={{
              fontSize: 40,
              padding: 0,
              margin: 0,
              marginLeft: 25,
              textAlign: "center",
              marginBottom: 10,
              marginTop: 40,
            }}
          >
            <Image src="./close.png" style={{ width: 200, marginBottom: 30 }} />
            <h2>Oops!</h2>
            <h4 style={{ fontSize: 22 }}>
              {" "}
              The Word was {gameData?.solution.toUpperCase()}
            </h4>
          </Col>
          <span
            className="close2"
            style={{
              textAlign: "center",
              // border: "1px solid white",
              borderRadius: "50%",

              width: 30,
              height: 30,
              padding: "0px 8px",
              margin: 0,
              marginTop: 17,
            }}
            onClick={() => {
              navigate("/");
            }}
          >
            <i class="fa-regular fa-circle-xmark"></i>
          </span>
        </Row>
      </div>
      <Row style={{ margin: 0, padding: 0 }}>
        <Col
          style={{
            fontSize: 15,
            padding: 0,
            margin: 0,

            textAlign: "center",
            marginBottom: 15,
            marginTop: 0,
          }}
        >
          <p style={{ marginBottom: 0 }}>
            {" "}
            Current Streak : <b>{gameData?.currentStreak}</b>
          </p>
          <p>
            Longest streak : <b> {gameData?.longestStreak}</b>
          </p>
        </Col>
      </Row>
      <div
        style={{
          textAlign: "center",
          marginTop: 18,
          marginBottom: 10,
        }}
      >
        {playAgain && (
          <button
            class={
              JSON.parse(localStorage.getItem("isDarkMode"))
                ? `setDark`
                : `setLight`
            }
            onClick={() => {
              resetGame();
              alert("Watch ad for new game");
            }}
          >
            Play Again!
          </button>
        )}
      </div>
    </div>
  );
};
export default LoseGame;

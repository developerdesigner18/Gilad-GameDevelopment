import React, { Component } from "react";
import { Col, Row, Container } from "react-bootstrap";

// import { useNavigate } from "react-router-dom";

import "./winGame.css";
import { useNavigate } from "react-router-dom";
const WinGame = ({ playAgain, resetGame, gameData }) => {
  const navigate = useNavigate();

  return (
    <div
      className={
        JSON.parse(localStorage.getItem("isDarkMode"))
          ? `container1Dark`
          : `container1Light`
      }
    >
      <div>
        <Row style={{ margin: 0, padding: 0 }}>
          <Col
            style={{
              fontSize: 35,
              padding: 0,
              margin: 0,
              marginLeft: 25,
              textAlign: "center",
              marginBottom: 25,
              marginTop: 7,
            }}
          >
            {" "}
            Congrats 🎉
          </Col>
          <span
            className="close1"
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

      <div
        className={`jumbotron p-4  ${
          JSON.parse(localStorage.getItem("isDarkMode")) ? "dark" : "light"
        }`}
        style={{
          width: "250px",
          margin: "0px auto",
          border: "1px solid black",
          marginBottom: 25,
        }}
      >
        <div style={{ marginLeft: 20 }}>
          <Row>Current Streak</Row>
          <Row>
            <h2>{gameData?.currentStreak}</h2>
          </Row>
        </div>
      </div>
      <div
        className={`jumbotron p-4  ${
          JSON.parse(localStorage.getItem("isDarkMode")) ? "dark" : "light"
        }`}
        style={{
          width: "250px",
          margin: "0px auto",
          border: "1px solid black",
          marginBottom: 25,
        }}
      >
        <div style={{ marginLeft: 20 }}>
          <Row>Avg. gussees in streak</Row>
          <Row>
            <h2>
              {gameData.status === "WIN"
                ? (
                    (gameData?.averageFinal?.reduce((p, c) => p + c, 0) +
                      gameData?.currentStreak) /
                    (gameData?.averageFinal.length + 1)
                  ).toFixed(1)
                : (
                    gameData?.average?.reduce((p, c) => p + c, 0) /
                    gameData?.average?.length
                  ).toFixed(1)}
            </h2>
          </Row>
        </div>
      </div>
      <div
        className={`jumbotron p-4  ${
          JSON.parse(localStorage.getItem("isDarkMode")) ? "dark" : "light"
        }`}
        style={{
          width: "250px",
          margin: "0px auto",
          border: "1px solid black",
          marginBottom: 25,
        }}
      >
        <div style={{ marginLeft: 20 }}>
          <Row>Longest streak</Row>
          <Row>
            <h2>{gameData?.longestStreak}</h2>
          </Row>
        </div>
      </div>
      <div
        className="jumbotron p-0"
        style={{
          width: "75px",
          margin: "0px auto",
        }}
      >
        <Row>
          {playAgain && (
            <button
              class={
                JSON.parse(localStorage.getItem("isDarkMode"))
                  ? `setDark`
                  : `setLight`
              }
              onClick={resetGame}
              style={{ background: "#eee" }}
            >
              Play Again!
            </button>
          )}
        </Row>
      </div>
    </div>
  );
};
export default WinGame;

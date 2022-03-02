import React, { Component } from "react";
import { useNavigate } from "react-router-dom";
import { Col, Row, Container, Image } from "react-bootstrap";
import "./suggestion.css";

const Suggestion = ({ setSuggestionPage, gameData }) => {
  let arr1 = ["W", "E", "A", "R", "Y"];
  let arr2 = ["A", "M", "O", "N", "G"];
  let arr3 = ["M", "O", "N", "T", "H"];

  let navigate = useNavigate();

  return (
    // <div style={{ textAlign: "center" }}>
    //
    // </div>
    <div
      className={
        JSON.parse(localStorage.getItem("isDarkMode"))
          ? `container4Dark`
          : `container4Light`
      }
    >
      <div style={{ textAlign: "end" }}>
        <span
          className="close1"
          style={{
            marginRight: 15,
            fontSize: 30,

            boxShadow: "none",
          }}
          onClick={() => {
            navigate("/");
          }}
        >
          <i class="fa-regular fa-circle-xmark"></i>
        </span>
      </div>

      <div style={{ margin: 0, padding: 0 }}>
        <div
          style={{
            fontSize: 15,
            padding: "-1px 23px",
            margin: 0,
            marginLeft: 20,
            textAlign: "left",
            marginBottom: 10,
            marginTop: 0,
          }}
        >
          <p>
            {" "}
            Guess the <b>WORD</b> in six tries
          </p>
          <p>
            Each guess must be a valid five-letter word. Hit the enter button to
            submit
          </p>
          <p>
            After each guess, the color of the circle will change to show hoe
            close your guess was to word.
          </p>
        </div>
      </div>
      <hr></hr>
      <div>
        <Row style={{ margin: 0, padding: 0 }}>
          <div
            style={{
              fontSize: 15,
              padding: "-1px 23px",
              margin: 0,
              marginLeft: 8,
              textAlign: "left",
              marginBottom: 10,
              marginTop: 0,
            }}
          >
            <h5>Examples</h5>

            <div
              style={{ marginTop: 20, flexDirection: "row", marginBottom: 10 }}
            >
              {[0].map((row, rowIndex) => (
                /* {console.log(error, "😂😂😂")} */
                <div
                  className={`cube-row ${
                    gameData && row === gameData.rowIndex
                  }`}
                  // className={`error ${error}`}
                  style={{ margin: "0px auto" }}
                  key={rowIndex}
                  // className="cube-row"
                >
                  {arr1.map((column, letterIndex) => (
                    <div
                      key={letterIndex}
                      id={`letter1${letterIndex}`}
                      className={
                        JSON.parse(localStorage.getItem("isDarkMode"))
                          ? `letter1Dark`
                          : `letter1Light`
                      }
                    >
                      {column}
                    </div>
                  ))}
                </div>
              ))}
            </div>

            <p>The letter W is in the word and in correct spot.</p>
            <div
              style={{ marginTop: 20, flexDirection: "row", marginBottom: 10 }}
            >
              {[0].map((row, rowIndex) => (
                /* {console.log(error, "😂😂😂")} */
                <div
                  className={`cube-row ${
                    gameData && row === gameData.rowIndex
                  }`}
                  // className={`error ${error}`}
                  style={{ margin: "0px auto" }}
                  key={rowIndex}
                  // className="cube-row"
                >
                  {arr2.map((column, letterIndex) => (
                    <div
                      key={letterIndex}
                      id={`letter2${letterIndex}`}
                      className={
                        JSON.parse(localStorage.getItem("isDarkMode"))
                          ? `letter1Dark`
                          : `letter1Light`
                      }
                    >
                      {column}
                    </div>
                  ))}
                </div>
              ))}
            </div>

            <p>The letter O is in the word but in wrong spot.</p>
            <div
              style={{ marginTop: 20, flexDirection: "row", marginBottom: 10 }}
            >
              {[0].map((row, rowIndex) => (
                /* {console.log(error, "😂😂😂")} */
                <div
                  className={`cube-row ${
                    gameData && row === gameData.rowIndex
                  }`}
                  // className={`error ${error}`}
                  style={{ margin: "0px auto" }}
                  key={rowIndex}
                  // className="cube-row"
                >
                  {arr3.map((column, letterIndex) => (
                    <div
                      key={letterIndex}
                      id={`letter3${letterIndex}`}
                      className={
                        JSON.parse(localStorage.getItem("isDarkMode"))
                          ? `letter1Dark`
                          : `letter1Light`
                      }
                    >
                      {column}
                    </div>
                  ))}
                </div>
              ))}
            </div>

            <p>The letter T is not in the word in any spot.</p>
          </div>
        </Row>
      </div>
    </div>
  );
};

export default Suggestion;

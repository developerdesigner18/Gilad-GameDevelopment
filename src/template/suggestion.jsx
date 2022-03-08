import React, { Component, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Col, Row, Container, Image } from "react-bootstrap";
import "./suggestion.css";

const Suggestion = ({
  setSuggestionPage,
  gameData,
  watchAdvertise1,
  watchAdvertise2,
  addv,
  addButton,
}) => {
  const [add, setAdd] = useState(false);
  const [add1, setAdd1] = useState(false);
  const [watchAdd, setWatchAdd] = useState(true);
  const [watchAdd1, setWatchAdd1] = useState(true);

  let arr1 = ["H", "O", "N", "E", "Y"];
  let arr2 = ["A", "M", "O", "N", "G"];
  let arr3 = ["M", "O", "N", "T", "H"];

  let navigate = useNavigate();
  // const handleClickLetter = () => {
  //   (prev) => !prev;
  //   JSON.parse(localStorage.setItem("Ads", addv));
  //   setWatchAdd(false);
  // };
  useEffect(() => {}, []);

  const handleClickWord = () => {
    setAdd1(true);
    setWatchAdd1(false);
  };
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
            In six attempts, guess the <b>WORD</b>
            <span
              className="close1"
              style={{
                marginLeft: 55,
                fontSize: 30,

                boxShadow: "none",
              }}
              onClick={() => {
                navigate("/");
              }}
            >
              <i class="fa-regular fa-circle-xmark"></i>
            </span>
          </p>

          <p>
            After each guess the colour of tile indicates how close the guess
            was to the word.
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

            <p>The letter H is in the word and in correct spot.</p>
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
            <hr></hr>
            <h5>Hint </h5>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginRight: 10,
              }}
            >
              Reveal 2 letters by watching a video
              {JSON.parse(localStorage.getItem("FirstAdButton")) && (
                <>
                  {console.log("Hello!")}
                  <i
                    className="fa-solid fa-circle-play"
                    style={{ color: "rgb(224 78 84)", marginLeft: 30 }}
                    onClick={watchAdvertise1}
                  ></i>
                </>
              )}
            </div>
            <div style={{ textAlign: "center", paddingBottom: 10 }}>
              {JSON.parse(localStorage.getItem("FirstAd")) &&
                gameData?.solution[2] + " ," + gameData?.solution[4]}
            </div>

            {/* {
              const firstLetter = Math.floor(Math.random() * gameData?.solution.length);

              gameData?.solution[
                firstLetter
              ] +
                "," +
                gameData?.solution.slice(gameData?.solution.indexOf(firstLetter), gameData?.solution.indexOf(firstLetter) + 1)[
                  Math.floor(Math.random() * gameData?.solution.slice(gameData?.solution.indexOf(firstLetter), gameData?.solution.indexOf(firstLetter) + 1).length)
                ]} */}
            <div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginRight: 10,
                }}
              >
                Reveal word by watching 2 videos
                {JSON.parse(localStorage.getItem("SecondAdButton")) && (
                  <i
                    class="fa-solid fa-circle-play"
                    onClick={watchAdvertise2}
                    style={{
                      marginLeft: 30,

                      color: "rgb(224 78 84)",
                    }}
                  ></i>
                )}
              </div>
            </div>
            <div style={{ textAlign: "center", paddingBottom: 10 }}>
              {JSON.parse(localStorage.getItem("SecondAd")) &&
                gameData?.solution}
            </div>
          </div>
        </Row>
      </div>
    </div>
  );
};

export default Suggestion;

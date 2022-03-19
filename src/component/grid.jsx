import React, {
  useState,
  useContext,
  useEffect,
  createRef,
  useRef,
} from "react";
import "./grid.css";
import data from "../Data/wordList.json";

import Keyboard from "../classes/keyboard";
import { Row, Col, Image } from "react-bootstrap";
import WinGame from "../template/winGame";
import LoseGame from "../template/LoseGame";
import { useLocation, useNavigate } from "react-router-dom";

const Grid = ({
  gameData,
  playAgain,
  resetGame,
  setGameData,
  setPlayAgain,
  OnKeyPress,
}) => {
  const isDarkMode = localStorage.getItem("isDarkMode")
    ? JSON.parse(localStorage.getItem("isDarkMode"))
    : false;
  const [message, setMessage] = useState(null);
  // const [error, setError] = useState(false);
  const [charArray, setCharArray] = useState([]);

  const navigate = useNavigate();
  const [input, setInput] = useState([]);

  const onKeyPress = (e) => {
    if (
      (e.keyCode >= 65 && e.keyCode <= 90) ||
      e.keyCode === 8 ||
      e.keyCode === 13
    ) {
      setInput([...input, e.key]);
      if (gameData.rowIndex > 5 || gameData.status === "WIN") {
        return true;
      }
      if (e.key === "Enter") {
        if (charArray.length === 5) {
          let word = charArray.join("").toLowerCase();
          const test = data.filter((data) => {
            return data.toLowerCase() === word;
          });

          if (test.length === 0) {
            handleMessage("Not In List");

            return;
          }
          if (test.length > 0) {
            enterGameWord(word);
            setCharArray([]);
          }
        } else {
          handleMessage("Not Enough Letters");
        }
        return;
      }

      if (e.key == "Backspace") {
        charArray.splice(charArray.length - 1, 1);
        setCharArray([...charArray]);
      } else if (charArray.length < 5) {
        charArray.push(e.key);
        setCharArray([...charArray]);
        // setError(false);
      }
      enterCurrentWord(charArray.join("").toLowerCase());
    }
  };
  const ref = useRef();
  useEffect(() => {
    ref.current.focus();
  }, [ref]);

  const enterGameWord = (word) => {
    let gameWords = gameData.gameWords;
    let solution = gameData.solution;
    let absentArray = gameData.absentArray;
    let gameRowStatus = gameData.gameRowStatus;
    let presentArray = gameData.presentArray;
    let correctArray = gameData.correctArray;
    let rowIndex = gameData.rowIndex;
    let rowStatus = [];
    let status = gameData.status;
    let count = 0;
    let characterOne = gameData.characterOne;
    let characterTwo = gameData.characterTwo;

    let currentStreak = JSON.parse(localStorage.getItem("gameData"))
      .currentStreak
      ? JSON.parse(localStorage.getItem("gameData")).currentStreak
      : 0;
    let longestStreak = JSON.parse(localStorage.getItem("gameData"))
      .longestStreak
      ? JSON.parse(localStorage.getItem("gameData")).longestStreak
      : 0;
    let noOfGames = JSON.parse(localStorage.getItem("gameData")).noOfGames
      ? JSON.parse(localStorage.getItem("gameData")).noOfGames
      : 0;
    let average = JSON.parse(localStorage.getItem("gameData")).average
      ? JSON.parse(localStorage.getItem("gameData")).average
      : [];
    let averageFinal = JSON.parse(localStorage.getItem("gameData")).averageFinal
      ? JSON.parse(localStorage.getItem("gameData")).averageFinal
      : [];

    for (let index = 0; index < word.length; index++) {
      if (solution.charAt(index) === word.charAt(index)) {
        count++;

        rowStatus.push("Correct");
        if (!correctArray.includes(word.charAt(index))) {
          correctArray.push(word.charAt(index));
        }
        if (presentArray.indexOf(word.charAt(index)) !== -1) {
          presentArray.splice(presentArray.indexOf(word.charAt(index)), 1);
        }
      } else if (solution.includes(word.charAt(index))) {
        rowStatus.push("Present");
        if (
          !correctArray.includes(word.charAt(index)) &&
          !presentArray.includes(word.charAt(index))
        )
          presentArray.push(word.charAt(index));
      } else {
        rowStatus.push("Absent");
        if (!absentArray.includes(word.charAt(index)))
          absentArray.push(word.charAt(index));
      }
    }
    if (count === 5) {
      status = "WIN";
      noOfGames++;
      currentStreak++;
      // theme = true;
      let temp =
        averageFinal?.reduce((p, c) => p + c, 0) +
        currentStreak / (averageFinal.length + 1);

      average?.push(1);

      // if (average.length[-1] == 1 && average.length[-2] == 0)
      //   averageFinal?.pop(averageFinal.length);

      if (currentStreak > longestStreak) longestStreak++;
      setPlayAgain(true);
      setTimeout(() => {
        navigate("/win");
      }, 500);

      // handleMessage("Winner Winner CHicken Dinnner");
    } else if (rowIndex === 5) {
      status = "LOSE";

      averageFinal?.push(currentStreak);

      // average = average.push(currentStreak);
      average.push(0);

      noOfGames++;
      currentStreak = 0;

      // handleMessage(`Word is ${gameData.solution}`);
      setPlayAgain(true);
      setTimeout(() => {
        navigate("/lose");
      }, 500);
    }
    gameRowStatus.push(rowStatus);
    gameWords[rowIndex] = word;
    let newGameData = {
      ...gameData,
      gameWords: gameWords,
      gameRowStatus: gameRowStatus,
      rowIndex: rowIndex + 1,
      status: status,
      currentStreak: currentStreak,
      longestStreak: longestStreak,
      presentArray: presentArray,
      absentArray: absentArray,
      correctArray: correctArray,
      currentStreak: currentStreak,
      noOfGames: noOfGames,
      average: average,
      averageFinal: averageFinal,
      characterOne: characterOne,
      characterTwo: characterOne,
    };

    setGameData(newGameData);

    localStorage.setItem("gameData", JSON.stringify(newGameData));
  };

  const handleMessage = (message) => {
    setMessage(message);
    // if (message === "Not In List") console.log(error, "❤️❤️❤️");
    setTimeout(() => {
      setMessage(null);
    }, 4000);
  };
  // const handleError = () => {
  // setError(true);
  // setTimeout(() => {
  //   setError(true);
  // }, 1000);

  // };
  const enterCurrentWord = (word) => {
    let gameWords = gameData.gameWords;
    let rowIndex = gameData.rowIndex;
    gameWords[rowIndex] = word;
    let newGameData = { ...gameData, gameWords: gameWords };
    setGameData(newGameData);
  };

  const handleKeyPress = (key) => {
    if (gameData.rowIndex > 5 || gameData.status === "WIN") {
      return true;
    }
    if (key === "ENTER") {
      if (charArray.length === 5) {
        let word = charArray.join("").toLowerCase();
        const test = data.filter((data) => {
          return data.toLowerCase() === word;
        });
        // console.log(test);
        if (test.length === 0) {
          // handleError();
          // console.log(message);
          // if (message == "Not In List") {
          //   setError((prevState) => !prevState);
          //   console.log("Error------->", error);
          // } else {
          //   setError(false);
          //   console.log("Error------->", error);
          // }
          // console.log(error, "👽👽👽👽", "false");

          handleMessage("Not In List");
          // console.log("not in list", word);
          return;
        }
        if (test.length > 0) {
          enterGameWord(word);
          setCharArray([]);

          // console.log(error, "👽👽👽👽", "true");
        }
      } else {
        handleMessage("Not Enough Letters");
        // console.log("not enough letters");
      }
      return;
    }
    if (key === "⌫") {
      charArray.splice(charArray.length - 1, 1);
      setCharArray([...charArray]);
    } else if (charArray.length < 5) {
      charArray.push(key);
      setCharArray([...charArray]);
      // setError(false);
    }
    enterCurrentWord(charArray.join("").toLowerCase());
  };

  return (
    <div
      className={
        JSON.parse(localStorage.getItem("isDarkMode"))
          ? `containerGridDark`
          : `containerGridLight`
      }
      tabIndex={1}
      onKeyDown={onKeyPress}
      ref={ref}
    >
      <div className="top">
        <div className="title">GUESS WORD</div>

        <div className="title" style={{ paddingLeft: 45, marginTop: -1 }}>
          {/* <FontAwesomeIcon icon={"user-secret"} /> */}
          <i
            className="fa-regular fa-circle-question"
            onClick={() => {
              navigate("/suggestion");
            }}
          ></i>
        </div>
        {"  "}
        <div className="title" style={{ paddingLeft: 17, marginTop: -1 }}>
          <i
            className="fa-solid fa-gear"
            onClick={() => {
              navigate("/settings");
            }}
          ></i>
        </div>
      </div>
      <div className="topAdHolder">
        <Image
          src="./banner.jpg"
          className="adImageTop"
          // style={{ height: 120, marginTop: 10 }}
        />
      </div>
      {message && (
        <div className="message" style={{ marginTop: 15, width: "250px" }}>
          {message}
        </div>
      )}

      <div className="cube" style={{ marginTop: 15 }}>
        {[0, 1, 2, 3, 4, 5].map((row, rowIndex) => (
          <div
            className={`cube-row ${gameData && row === gameData.rowIndex}`}
            style={{ margin: "0px auto" }}
            key={rowIndex}
          >
            {[0, 1, 2, 3, 4].map((column, letterIndex) => (
              <div
                value={input[letterIndex]}
                key={letterIndex}
                className={
                  JSON.parse(localStorage.getItem("isDarkMode"))
                    ? `letterDark ${
                        gameData && gameData.gameRowStatus[row]
                          ? gameData.gameRowStatus[row][column]
                          : ""
                      }`
                    : `letterLight ${
                        gameData && gameData.gameRowStatus[row]
                          ? gameData.gameRowStatus[row][column]
                          : ""
                      }`
                }
              >
                {/* {gameData && input[row] && input[row][column]} */}
                {gameData &&
                  gameData.gameWords[row] &&
                  gameData.gameWords[row][column]}
              </div>
            ))}
          </div>
        ))}
      </div>
      <div className="bottomAdHolder">
        <Image
          className="adImageBottom"
          src="./banner.jpg"
          // style={{ height: 120, marginTop: 10 }}
        />
      </div>
      <div
        className={
          JSON.parse(localStorage.getItem("isDarkMode"))
            ? "stickyDark"
            : "stickyLight"
        }
      >
        <Keyboard
          gameData={gameData}
          handleKeyPress={handleKeyPress}

          // handleKeyboardPress={handleKeyboardPress}
        />

        <div style={{ textAlign: "center", marginTop: 18, marginBottom: 10 }}>
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
    </div>

    /* // ) : <div>{gameData?.status === "WIN" && navigate("/win")}</div> ? (
      //   <div> {gameData?.status === "LOSE" && navigate("/lose")}</div>
      // ) : (
      //   ""
      // )} */
  );
};

export default Grid;

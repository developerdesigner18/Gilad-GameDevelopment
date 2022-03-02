import logo from "./logo.svg";
import React, { useState, useContext, useEffect } from "react";

import Grid from "./component/grid.jsx";
import LoseGame from "./template/LoseGame";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import WinGame from "./template/winGame";
import data from "../src/Data/wordList.json";
import Suggestion from "./template/suggestion";
import Settings from "./template/settings";
import DarkModeToggle from "react-dark-mode-toggle";
import "bootstrap/dist/css/bootstrap.min.css";

import "./App.css";
// const StyledApp = styled.div`
//   color: ${(props) => props.theme.fontColor};
// `;
function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const [playAgain, setPlayAgain] = useState(false);

  const [gameData, setGameData] = useState(
    JSON.parse(
      localStorage.getItem("gameData") && localStorage.getItem("gameData")
    )
  );

  const [isDarkMode, setIsDarkMode] = useState(
    localStorage.getItem("isDarkMode")
      ? localStorage.getItem("isDarkMode")
      : false
  );

  // console.log(
  //   darkMode,
  //   "📉📉📉",
  //   JSON.parse(localStorage.getItem("isDarkMode"))
  // );

  const toggle = (e) => {
    console.log("checked : ", e.target.checked);
    setIsDarkMode(e.target.checked);
    localStorage.setItem("isDarkMode", e.target.checked);
    console.log(isDarkMode, "🤣🤣🤣");
  };
  const handleSwitch = (elem, state) => {
    console.log("handleSwitch. elem:", elem);
    console.log("name:", elem.props.name);
    console.log("new state:", state);
    setIsDarkMode();
    localStorage.setItem("isDarkMode", state);
  };
  const randomNumber = Math.floor(Math.random() * data.length);
  const tempData = data[randomNumber];
  const [suggestionPage, setSuggestionPage] = useState(true);
  // console.log(location, "🔥🔥🔥");

  const resetGame = () => {
    navigate("/");
    setPlayAgain(false);
    let newGameData = {
      ...gameData,
      solution: tempData,
      rowIndex: 0,
      gameWords: [],
      gameRowStatus: [],
      presentArray: [],
      absentArray: [],
      correctArray: [],
      currentStreak: gameData.currentStreak,
      longestStreak: gameData.longestStreak,
      noOfGames: gameData.noOfGames,
      status: "IN_PROGRESS",
    };
    setGameData(newGameData);
    localStorage.setItem("gameData", JSON.stringify(newGameData));
    // let newTheme = {
    //   ...mode,
    //   theme: mode.theme,
    // };
    // setmode(newTheme);
    // localStorage.setItem("theme", JSON.stringify(newTheme));

    // console.log(mode);
    console.log(newGameData.solution);
  };

  useEffect(() => {
    console.log(gameData);
    console.log("useEffect called: 👽👽👽");
    if (gameData?.noOfGames === 0 && gameData?.rowIndex === 0)
      navigate("/suggestion");
    if (gameData?.status === "IN_PROGRESS" && location.pathname == "/win") {
      navigate("/");
    }
    if (gameData?.status === "IN_PROGRESS" && location.pathname == "/lose") {
      navigate("/");
    }
    if (gameData?.status === "WIN" || gameData?.status === "LOSE")
      setPlayAgain(true);
    // if (gameData?.status === "WIN") navigate("/win");
    // if (gameData?.status === "WIN") gameData.currentStreak++;
    if (!gameData || !gameData.solution) {
      let newGameData = {
        ...gameData,
        solution: tempData,
        currentStreak: JSON.parse(localStorage.getItem("gameData"))
          ?.currentStreak
          ? JSON.parse(localStorage.getItem("gameData"))?.currentStreak
          : 0,
        longestStreak: JSON.parse(localStorage.getItem("gameData"))
          ?.longestStreak
          ? JSON.parse(localStorage.getItem("gameData"))?.longestStreak
          : 0,
        noOfGames: JSON.parse(localStorage.getItem("gameData"))?.noOfGames
          ? JSON.parse(localStorage.getItem("gameData"))?.noOfGames
          : 0,
        rowIndex: 0,
        gameWords: [],
        gameRowStatus: [],
        presentArray: [],
        absentArray: [],
        correctArray: [],
        status: "IN_PROGRESS",
      };
      setGameData(newGameData);
      localStorage.setItem("gameData", JSON.stringify(newGameData));
      // let newTheme = {
      // ...darkMode,
      // theme: darkMode.theme,
      // };
      console.log("useEffect called if condition: 👽👽👽");

      // setDarkMode(true);
      // localStorage.setItem("isDarkMode", JSON.stringify(darkMode));

      console.log(newGameData.solution);
    }
  }, []);
  // const validate = () => {
  //   if (gameData.status === "WIN") {
  //     navigate("/win");
  //   } else if (gameData.status === "LOSE") navigate("/lose");
  //   else navigate("/");
  // };

  return (
    // <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
    //   <GlobalStyles />
    //   <StyledApp>
    <div
      className={
        JSON.parse(localStorage.getItem("isDarkMode"))
          ? `darkMode`
          : `lightMode`
      }
    >
      <Routes>
        <Route
          path="/"
          element={
            <Grid
              gameData={gameData}
              playAgain={playAgain}
              resetGame={resetGame}
              setPlayAgain={setPlayAgain}
              setGameData={setGameData}

              // OnKeyPress={OnKeyPress}
              // theme={theme}
            />
          }
        />
        {gameData?.status === "WIN" && (
          <Route
            path="/win"
            element={
              <WinGame
                gameData={gameData}
                playAgain={playAgain}
                resetGame={resetGame}
              />
            }
          />
        )}
        {gameData?.status === "LOSE" && (
          <Route
            path="/lose"
            element={
              <LoseGame
                gameData={gameData}
                playAgain={playAgain}
                resetGame={resetGame}
              />
            }
          />
        )}
        {suggestionPage && (
          <Route
            path="/suggestion"
            element={
              <Suggestion
                gameData={gameData}
                setSuggestionPage={setSuggestionPage}
              />
            }
          ></Route>
        )}
        <Route
          path="/settings"
          element={
            <Settings
              toggle={toggle}
              isDarkMode={isDarkMode}
              handleSwitch={handleSwitch}
            />
          }
        ></Route>
      </Routes>

      {/* <LoseGame /> */}
    </div>
    //   </StyledApp>
    // </ThemeProvider>
  );
}

export default App;

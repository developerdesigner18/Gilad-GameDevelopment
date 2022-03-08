import logo from "./logo.svg";
import React, { useState, useContext, useEffect, useRef } from "react";

import Grid from "./component/grid.jsx";
import LoseGame from "./template/LoseGame";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import WinGame from "./template/winGame";
import data from "../src/Data/wordList.json";

import Suggestion from "./template/suggestion";
import Settings from "./template/settings";

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
  const [answer, setAnswer] = useState("");

  const [isDarkMode, setIsDarkMode] = useState(
    localStorage.getItem("isDarkMode")
      ? localStorage.getItem("isDarkMode")
      : false
  );
  const [mode, setMode] = useState(
    localStorage.getItem("Mode") ? localStorage.getItem("Mode") : "Easy"
  );
  // let randomNumber2 = Math.floor(Math.random() * easyWord.length);

  // const [random, setRandom] = useState(easyWord[randomNumber2].toLowerCase());
  // console.log(mode, "👽👽👽");
  const [firstAd, setFirstAd] = useState(
    localStorage.getItem("FirstAd") ? localStorage.getItem("FirstAd") : false
  );
  const [firstAdButton, setFirstAdButton] = useState(
    localStorage.getItem("FirstAdButton")
      ? localStorage.getItem("FirstAdButton")
      : true
  );
  const [secondAd, setSecondAd] = useState(
    localStorage.getItem("SecondAd") ? localStorage.getItem("SecondAd") : false
  );
  const [secondAdButton, setSecondAdButton] = useState(
    localStorage.getItem("SecondAdButton")
      ? localStorage.getItem("SecondAdButton")
      : true
  );
  // const removeChar = (str) => {
  //   // str[firstIndex], newStr[secondIndex];
  // };

  const watchAdvertise1 = () => {
    setFirstAdButton(false);
    setFirstAd(true);
    // console.log("Character One", gameData?.characterOne, character1);
    // gameData?.characterOne.push(character1);
  };

  localStorage.setItem("FirstAdButton", firstAdButton);

  localStorage.setItem("FirstAd", firstAd);
  const watchAdvertise2 = () => {
    setSecondAdButton(false);
    setSecondAd(true);
    // console.log("Character One", gameData?.characterOne, character1);
    // gameData?.characterOne.push(character1);
  };
  localStorage.setItem("SecondAdButton", secondAdButton);
  localStorage.setItem("SecondAd", secondAd);
  // console.log(
  //   darkMode,
  //   "📉📉📉",
  //   JSON.parse(localStorage.getItem("isDarkMode"))
  // );

  const toggle = (e) => {
    setIsDarkMode(e.target.checked);
    localStorage.setItem("isDarkMode", e.target.checked);
  };
  const handleSwitch = (elem, state) => {
    setIsDarkMode();
    localStorage.setItem("isDarkMode", state);
  };
  // ---------------------------------------------Mode --------------------------------------------------------------
  // useEffect(() => {
  //   if (localStorage.getItem("Mode") === "Easy") {
  //     const randomNumber = Math.floor(Math.random() * easyWord.length);
  //     setRandom(easyWord[randomNumber].toLowerCase());
  //   } else if (localStorage.getItem("Mode") === "Medium") {
  //     const randomNumber = Math.floor(Math.random() * mediumWord.length);
  //     setRandom(mediumWord[randomNumber].toLowerCase());
  //   } else if (localStorage.getItem("Mode") === "Hard") {
  //     const randomNumber = Math.floor(Math.random() * hardWord.length);
  //     setRandom(hardWord[randomNumber].toLowerCase());
  //   }
  // }, [gameData?.noOfGames, mode]);
  // console.log(random);
  //

  const randomNumber = Math.floor(Math.random() * data.length);
  const tempData = data[randomNumber];

  // let tempSolution = gameData?.solution;
  // const firstIndex = Math.floor(Math.random() * tempSolution?.length);
  // const charToRemove = tempSolution?.slice(firstIndex, firstIndex + 1);
  // const newtempSolution = tempSolution
  //   ?.split("")
  //   .filter((char) => char !== charToRemove)
  //   .join("");
  // const secondIndex = Math.floor(Math.random() * newtempSolution?.length);
  // const character1 = tempSolution && tempSolution[firstIndex];
  // const character2 = newtempSolution && tempSolution[secondIndex];

  // -------------------------------------hint------------------------------------------------------------
  // let tempData1 = gameData?.solution;
  // // const randomNumber1 = Math.floor(Math.random() * tempData1.length);
  // const saveElement = tempData1[2];
  // console.log(tempData1[2], tempData1[3]);
  const [suggestionPage, setSuggestionPage] = useState(true);
  // console.log(location, "🔥🔥🔥");

  const resetGame = () => {
    setFirstAd(false);

    localStorage.setItem("FirstAd", firstAd);

    setFirstAdButton(true);
    localStorage.setItem("FirstAdButton", firstAdButton);
    setSecondAd(false);

    localStorage.setItem("SecondAd", secondAd);

    setSecondAdButton(true);
    localStorage.setItem("SecondAdButton", secondAdButton);

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
      revealTwoLetter: [],
      characterOne: [],
      characterTwo: [],
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
  };

  useEffect(() => {
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
        characterOne: [],
        characterTwo: [],
      };
      setGameData(newGameData);
      localStorage.setItem("gameData", JSON.stringify(newGameData));

      // let newTheme = {

      // ...darkMode,
      // theme: darkMode.theme,
      // };

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
                watchAdvertise1={watchAdvertise1}
                firstAd={firstAd}
                firstAdButton={firstAdButton}
                secondAd={secondAd}
                secondAdButton={secondAdButton}
                watchAdvertise2={watchAdvertise2}
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
              mode={mode}
              setMode={setMode}
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

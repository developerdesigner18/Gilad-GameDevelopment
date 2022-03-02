import React, { useState } from "react";
import { keys } from "../component/keys";
import "./keyboard.css";
const Keyboard = ({ handleKeyPress, gameData, OnKeyPress }) => {
  return (
    <div className="keyboard" style={{ margin: "0px auto" }}>
      {keys?.map((row, i) => (
        <div className="keyboardButtons" key={i}>
          {row.map((column, j) => (
            <a
              key={j}
              role="button"
              className={`${
                gameData && gameData?.correctArray?.includes(column)
                  ? "Correct"
                  : gameData?.presentArray?.includes(column)
                  ? "Present"
                  : gameData?.absentArray?.includes(column)
                  ? "Absent"
                  : ""
              }`}
              onClick={() => {
                handleKeyPress(column.toUpperCase());
                // OnKeyPress(column.toUpperCase());
              }}
            >
              {column}
            </a>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Keyboard;

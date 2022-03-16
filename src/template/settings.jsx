import React, { Component } from "react";
import { Col, Row, Form } from "react-bootstrap";

import "./settings.css";
import { useNavigate } from "react-router-dom";

const Settings = ({ toggle, darkModeButton, isDarkMode, mode, setMode }) => {
  const navigate = useNavigate();
  return (
    <div>
      <div
        className={
          JSON.parse(localStorage.getItem("isDarkMode"))
            ? "container3Dark"
            : "container3Light"
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
              Settings
            </Col>
            <span
              className="close3"
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
          style={{
            textAlign: "center",
            // border: "1px solid white",
          }}
        >
          <Form>
            <Row>
              <Col></Col>

              <Col
                style={{
                  paddingRight: 0,
                  paddingLeft: 6,
                  fontSize: 20,
                  textAlign: "left",
                }}
              >
                Light
              </Col>
              <Col
                style={{
                  paddingRight: 0,
                  paddingLeft: 0,
                  fontSize: 20,
                  top: 2,
                  textAlign: "end",
                }}
              >
                {" "}
                <Form.Check
                  type="switch"
                  style={{ backgroudColor: "red" }}
                  id="custom-switch"
                  onChange={toggle}
                  checked={JSON.parse(localStorage.getItem("isDarkMode"))}
                >
                  {/* <label>Dark</label> */}
                </Form.Check>
              </Col>

              <Col
                style={{
                  paddingRight: 0,
                  paddingLeft: 0,
                  fontSize: 20,
                  textAlign: "left",
                }}
              >
                {" "}
                Dark
              </Col>
              <Col></Col>
            </Row>

            {/* <span>Dark</span> */}
          </Form>
        </div>
        {/* <div
          className="buttonGropuForEasyAndHard text-center
        my-2"
        >
          {console.log(mode)}
          <ButtonGroup>
            <Button
              // className={
              //   localStorage.getItem("Mode") === "Easy"
              //     ? "bg-info text-dark"
              //     : "bg-light text-dark"
              // }
              value="Easy"
              onClick={(e) => {
                setMode(e.target.value);
                // setMode(localStorage.setItem("Mode", JSON.stringify("Medium")));
                localStorage.setItem("Mode", e.target.value);
              }}
            >
              Easy
            </Button>
            <Button
              value="Medium"
              onClick={(e) => {
                setMode(e.target.value);
                // setMode(localStorage.setItem("Mode", JSON.stringify("Medium")));
                localStorage.setItem("Mode", e.target.value);
              }}
            >
              Medium
            </Button>
            <Button
              value="Hard"
              onClick={(e) => {
                setMode(e.target.value);
                // setMode(localStorage.setItem("Mode", JSON.stringify("Medium")));
                localStorage.setItem("Mode", e.target.value);
              }}
            >
              Hard
            </Button>
          </ButtonGroup>
          <br />
          {localStorage.getItem("Mode") === "Easy"
            ? "You are in Easy Mode"
            : localStorage.getItem("Mode") === "Medium"
            ? "Your are in Medium Mode"
            : localStorage.getItem("Mode") === "Hard"
            ? "You are in Hard Mode"
            : ""}
        </div> */}
      </div>
    </div>
  );
};

export default Settings;

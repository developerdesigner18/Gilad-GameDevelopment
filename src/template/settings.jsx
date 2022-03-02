import React, { Component } from "react";
import { Col, Row, Container, Form } from "react-bootstrap";
import Switch from "react-switch";

// import { useNavigate } from "react-router-dom";

import "./settings.css";
import { useNavigate } from "react-router-dom";

const Settings = ({ toggle, darkModeButton, isDarkMode }) => {
  console.log(!isDarkMode);
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
          <Form.Check
            type="switch"
            id="custom-switch"
            onChange={toggle}
            checked={JSON.parse(localStorage.getItem("isDarkMode"))}
          ></Form.Check>
        </div>
      </div>
    </div>
  );
};

export default Settings;

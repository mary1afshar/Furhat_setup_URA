import React, { useState } from "react";
import "./App.css";
import "./Ready.css";
import { Link } from "react-router-dom";
import faceItems from "./data/faceInfo";
import { useUserSelection } from "./userInfo";

const Ready = () => {
  const { selections } = useUserSelection();
  const maskSelected = selections.mask;
  const faceSelected = selections.face;

  const face = faceItems[maskSelected];
  const selectedItem = face.find((item) => item.name === faceSelected);

  const saveInfo = () => {
    // send info to furhat API
    console.log(selections);
  };

  return (
    <div className="image-button-container">
      <h1>Your Coach is Ready ✅</h1>
      <h2>
        Hi {selections.name} 👋 my name is {selections.face}!
      </h2>
      <img
        src={selectedItem.image}
        alt={selectedItem.name}
        className="centered-image"
      />

      <h3>Let's talk about our favourite song!</h3>
      <em>Mine is "Let It Go" from Frozen</em>
      <h3>What is your favourite song?</h3>
      {/* <div className="question">
      <input className="input" type="text" id="song" placeholder="song" />
      </div> */}
      <button className="slide-button" onClick={() => saveInfo()}>
        Ready to Begin
      </button>
      <Link
        to="/select-voice"
        style={{ textDecoration: "none", margin: "20px" }}
      >
        <button className="slide-button">Back</button>
      </Link>
    </div>
  );
};

export default Ready;

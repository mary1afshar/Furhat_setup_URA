import { Link } from "react-router-dom";
import "./App.css";
import "./HomePage.css";
import logo from "./assets/WelcomeRobot.webp";
import React, { useState, useEffect } from "react";
import { useUserSelection } from "./userInfo";

const HomePage = () => {
  const [recording, setRecording] = useState(false);
  const [showRecording, setShowRecording] = useState(false);
  const [audioURL, setAudioURL] = useState("");
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [timer, setTimer] = useState(0); // Timer state

  const [name, setName] = useState("");
  const [age, setAge] = useState("");

  const { selections, updateSelection } = useUserSelection();

  const saveInfo = (item) => {
    updateSelection("name", name);
    updateSelection("age", age);
  };

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then((stream) => {
        const recorder = new MediaRecorder(stream);
        setMediaRecorder(recorder);

        const audioChunks = [];
        recorder.ondataavailable = (event) => audioChunks.push(event.data);

        recorder.onstop = () => {
          const audioBlob = new Blob(audioChunks, { type: "audio/wav" });
          const audioUrl = URL.createObjectURL(audioBlob);
          setAudioURL(audioUrl);
        };
      })
      .catch((error) => console.log("Error accessing the microphone: ", error));
  }, []);

  useEffect(() => {
    let interval = null;
    if (recording) {
      interval = setInterval(() => {
        setTimer((prevTime) => prevTime + 1);
      }, 1000);
    } else if (!recording && timer !== 0) {
      clearInterval(interval);
      setTimer(0);
    }
    return () => clearInterval(interval);
  }, [recording, timer]);

  const startRecording = () => {
    setShowRecording(false);
    if (mediaRecorder) {
      setRecording(true);
      mediaRecorder.start();
    }
  };

  const stopRecording = () => {
    if (mediaRecorder) {
      setRecording(false);
      mediaRecorder.stop();
    }
    setShowRecording(true);
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleAgeChange = (event) => {
    setAge(event.target.value);
  };

  return (
    <div>
      <div className="home-container">
        <div className="form-container">
          <h1>Hi 👋 </h1>
          <h1>My name is Furhat!</h1>
          <div className="question">
            <label htmlFor="name">What is your name?</label>
            <input
              type="text"
              id="name"
              placeholder="name"
              onChange={handleNameChange}
            />
          </div>
          <div className="question">
            <label htmlFor="age">How old are you?</label>
            <input
              type="text"
              id="age"
              placeholder="age"
              onChange={handleAgeChange}
            />
          </div>
          <div className="question">
            <label htmlFor="pronunciation">
              How do we pronounce your name?
            </label>
            {showRecording && <audio src={audioURL} controls />}
            <br />
            <button
              className="record-button"
              onClick={startRecording}
              disabled={recording}
            >
              Start Recording
            </button>
            <button
              className="record-button"
              onClick={stopRecording}
              disabled={!recording}
            >
              Stop Recording
            </button>
            {recording && <p>Recording Time: {timer} seconds</p>}
          </div>
          <div className="button-container">
            <Link to="/select-mask">
              <button className="slide-button" onClick={saveInfo}>
                Next
              </button>
            </Link>
          </div>
        </div>
        <div className="robot-container">
          <img src={logo} alt="Robot" className="robot-image" />
        </div>
      </div>
    </div>
  );
};

export default HomePage;

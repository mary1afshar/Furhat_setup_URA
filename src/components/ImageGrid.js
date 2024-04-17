import React, { useState } from "react";
import "./GridLayout.css";
import { useUserSelection } from "../userInfo";
import AudioVideo from "../assets/Voices/audioPlaying.gif";

const ImageGrid = ({ title, data, onSelectionChange, type, audioClip }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const { selections, updateSelection } = useUserSelection();

  const handleImageClick = (item) => {
    setSelectedImage(item.name);
    updateSelection(type, item.name);
    onSelectionChange(true);

    if (audioClip) {
      const audio = new Audio(item.audio);
      audio.play();
    }
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h2 className="title">{title}</h2>
      <div
        style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}
      >
        {data.map((item, index) => (
          <div
            key={index}
            onClick={() => handleImageClick(item)}
            className={`card ${
              selectedImage === item.name ? "card-selected" : ""
            }`}
          >
            <img
              src={
                audioClip && selectedImage === item.name
                  ? AudioVideo
                  : item.image
              }
              alt={item.name}
              onClick={() => handleImageClick(item)}
              style={{ width: "200px", height: "auto", borderRadius: "5px" }}
            />
            {audioClip && <audio src={item.audio} />}
            <p style={{ marginTop: "10px", fontSize: "23px" }}>{item.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageGrid;

import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./App.css";
import ImageGrid from "./components/ImageGrid";
import items from "./data/voiceInfo";
import faceItems from "./data/faceInfo";
import { useUserSelection } from "./userInfo";

const PickVoice = () => {
  const [isItemSelected, setIsItemSelected] = useState(false);
  const { selections } = useUserSelection();
  const maskSelected = selections.mask;
  const faceSelected = selections.face;
  const face = faceItems[maskSelected];
  const selectedItem = face.find((item) => item.name === faceSelected);

  const handleSelection = (isSelected) => {
    setIsItemSelected(isSelected);
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          margin: "20px",
        }}
      >
        <div style={{ marginRight: "20px", textAlign: "center" }}>
          <img
            src={selectedItem.image}
            alt={selectedItem.name}
            style={{
              maxWidth: "200px",
              marginBottom: "10px",
              marginTop: "120px",
            }}
          />
          <p>{selectedItem.name}</p>
        </div>
        <div>
          <ImageGrid
            title="How should I sound?"
            data={items.voice}
            onSelectionChange={handleSelection}
            type="voice"
            audioClip={true}
          />
        </div>
      </div>

      <div style={{ textAlign: "center", margin: "20px" }}>
        <Link to="/select-face">
          <button className="slide-button">Back</button>
        </Link>
        <Link
          to="/ready"
          style={{ textDecoration: "none", marginLeft: "20px" }}
        >
          <button className="slide-button" disabled={!isItemSelected}>
            Next
          </button>
        </Link>
      </div>
    </div>
  );
};

export default PickVoice;

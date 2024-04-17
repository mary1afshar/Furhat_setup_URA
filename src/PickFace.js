import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./App.css";
import ImageGrid from "./components/ImageGrid";
import items from "./data/faceInfo";
import { useUserSelection } from "./userInfo";

const PickFace = () => {
  const [isItemSelected, setIsItemSelected] = useState(false);
  const { selections } = useUserSelection();
  const maskSelected = selections.mask;
  const handleSelection = (isSelected) => {
    setIsItemSelected(isSelected);
  };

  const data = items[maskSelected];

  return (
    <div>
      <ImageGrid
        title="I can change faces, which one do you like?"
        data={data}
        onSelectionChange={handleSelection}
        type="face"
      />
      <div style={{ textAlign: "center", margin: "20px" }}>
        <Link to="/select-mask">
          <button className="slide-button">Back</button>
        </Link>
        <Link
          to="/select-voice"
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

export default PickFace;

import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./App.css";
import ImageGrid from "./components/ImageGrid";
import items from "./data/maskInfo";

const PickMask = () => {
  const [isItemSelected, setIsItemSelected] = useState(false);

  const handleSelection = (isSelected) => {
    setIsItemSelected(isSelected);
  };

  return (
    <div>
      <ImageGrid
        title="I can change how I look, which one do you prefer?"
        data={items.mask}
        onSelectionChange={handleSelection}
        type="mask"
      />
      <div style={{ textAlign: "center", margin: "20px" }}>
        <Link to="/">
          <button className="slide-button">Back</button>
        </Link>
        <Link
          to="/select-face"
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

export default PickMask;

import React, { useEffect } from "react";
import "./ZoomComponent.scss";
import CustomSelectComponent from "../CustomSelectComponent";

interface CustomZoomProps {
  setZoomLevel: React.Dispatch<React.SetStateAction<number>>;
  zoomLevel: number;
}

const CustomZoomComponent: React.FC<CustomZoomProps> = ({
  zoomLevel,
  setZoomLevel,
}) => {
  const handleZoomIn = () => {
    setZoomLevel((prevZoom) => {
      if (prevZoom < 100) {
        return prevZoom + 10;
      } else {
        return prevZoom + 25;
      }
    });
  };

  useEffect(() => {
    console.log(zoomLevel);
  }, [zoomLevel]);

  const handleZoomOut = () => {
    setZoomLevel((prevZoom) => {
      if (prevZoom <= 100) {
        return prevZoom - 10;
      } else {
        return prevZoom - 25;
      }
    });
  };
  const handleZoomChange = (value: number) => {
    console.log(value);
    setZoomLevel(value);
  };

  const zoomOptions = [25, 30, 40, 50, 60, 70, 80, 90, 100, 125, 150];
  const nearestOption = zoomOptions.reduce((closest, option) => {
    return Math.abs(option - zoomLevel) < Math.abs(closest - zoomLevel)
      ? option
      : closest;
  });

  return (
    <div>
      <button onClick={handleZoomOut} className="ButtomZoomOut">
        -
      </button>
      <CustomSelectComponent
        options={zoomOptions}
        selectedOption={nearestOption}
        onChange={handleZoomChange}
      />
      <button onClick={handleZoomIn} className="ButtomZoomIn">
        +
      </button>
    </div>
  );
};

export default CustomZoomComponent;

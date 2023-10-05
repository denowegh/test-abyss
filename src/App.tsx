import React, { useRef, useState } from "react";
import "./App.scss";
import DraggableComponent from "./components/DraggableComponent";
import ZoomComponent from "./components/ZoomComponent";
import Logo from "./components/LogoComponent";

export interface Position {
  x: number;
  y: number;
}

function App() {
  const containerRef = useRef<HTMLDivElement>(null);
  const elementRef = useRef<HTMLDivElement>(null);
  const [zoomLevel, setZoomLevel] = useState(100);
  const [positionDraggableElement, setPositionDraggableElement] =
    useState<Position>({ x: 0, y: 0 });

  const moveTop = () => {
    setPositionDraggableElement((prevState) => ({
      y: prevState.y - 15,
      x: prevState.x,
    }));
  };

  const moveBottom = () => {
    setPositionDraggableElement((prevState) => ({
      y: prevState.y + 15,
      x: prevState.x,
    }));
  };
  const moveRigth = () => {
    setPositionDraggableElement((prevState) => ({
      y: prevState.y,
      x: prevState.x + 15,
    }));
  };

  const moveLeft = () => {
    setPositionDraggableElement((prevState) => ({
      y: prevState.y,
      x: prevState.x - 15,
    }));
  };

  const handleCenterButton = () => {
    const parent = containerRef.current;
    const element = elementRef.current;

    if (parent && element) {
      const parentRect = parent.getBoundingClientRect();
      const elementRect = element.getBoundingClientRect();

      const maxX = parentRect.width - elementRect.width;
      const maxY = parentRect.height - elementRect.height;

      setPositionDraggableElement((prevPosition) => ({
        x: Math.min(maxX, parentRect.width / 2 - elementRect.width / 2),
        y: Math.min(maxY, parentRect.height / 2 - elementRect.height / 2),
      }));
    }
  };

  return (
    <div className="AppClass">
      <div className="Header">
        <Logo />
        <div className="ZoomBlock">
          <button className="ListViewButton">LIST VIEW</button>
          <button className="CenterButton" onClick={handleCenterButton}>
            {
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                id="near-me"
              >
                <path fill="none" d="M0 0h24v24H0V0z"></path>
                <path d="M18.75 3.94L4.07 10.08c-.83.35-.81 1.53.02 1.85L9.43 14c.26.1.47.31.57.57l2.06 5.33c.32.84 1.51.86 1.86.03l6.15-14.67c.33-.83-.5-1.66-1.32-1.32z"></path>
              </svg>
            }
          </button>
          <ZoomComponent zoomLevel={zoomLevel} setZoomLevel={setZoomLevel} />
        </div>
      </div>

      <div className="MainField" ref={containerRef}>
        <DraggableComponent
          elementRef={elementRef}
          parentRef={containerRef}
          position={positionDraggableElement}
          setPosition={setPositionDraggableElement}
          zoom={zoomLevel}
        />
        <button className="ButtonTopClass" onClick={moveTop}>
          {
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="#f5fdff"
            >
              <path d="m12 6.586-8.707 8.707 1.414 1.414L12 9.414l7.293 7.293 1.414-1.414L12 6.586z" />
            </svg>
          }
        </button>
        <button className="ButtonBottomClass" onClick={moveBottom}>
          {
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="#f5fdff"
            >
              <path d="M12 17.414 3.293 8.707l1.414-1.414L12 14.586l7.293-7.293 1.414 1.414L12 17.414z" />
            </svg>
          }
        </button>
        <button className="ButtonRightClass" onClick={moveRigth}>
          {
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="#f5fdff"
            >
              <path d="M7.293 4.707 14.586 12l-7.293 7.293 1.414 1.414L17.414 12 8.707 3.293 7.293 4.707z" />
            </svg>
          }
        </button>
        <button className="ButtonLeftClass" onClick={moveLeft}>
          {
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="#f5fdff"
            >
              <path d="M15.293 3.293 6.586 12l8.707 8.707 1.414-1.414L9.414 12l7.293-7.293-1.414-1.414z" />
            </svg>
          }
        </button>
      </div>
    </div>
  );
}

export default App;

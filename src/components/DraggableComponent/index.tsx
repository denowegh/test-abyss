import React, { useState, useRef, useEffect } from "react";

import "./DraggableComponent.scss";
import { Position } from "../../App";
import { Transform } from "stream";
import CategoryComponent from "../CategoryComponent";
import CategoryComponents from "../CategoryComponents";

interface DraggableComponentProps {
  parentRef: React.RefObject<HTMLDivElement>;
  position: Position;
  setPosition: React.Dispatch<React.SetStateAction<Position>>;
  zoom: number;
  elementRef: React.RefObject<HTMLDivElement>;
}

const DraggableComponent: React.FC<DraggableComponentProps> = ({
  parentRef,
  position,
  setPosition,
  zoom,
  elementRef,
}) => {
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    const parent = parentRef.current;
    const element = elementRef.current;

    if (parent && element) {
      const parentRect = parent.getBoundingClientRect();
      const elementRect = element.getBoundingClientRect();

      const maxX = parentRect.width - elementRect.width;
      const maxY = parentRect.height - elementRect.height;

      setPosition((prevPosition) => ({
        x: Math.min(maxX, parentRect.width / 2 - elementRect.width / 2),
        y: Math.min(maxY, parentRect.height / 2 - elementRect.height / 2),
      }));
    }
  }, [parentRef]);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    const initialX = e.clientX - position.x;
    const initialY = e.clientY - position.y;

    const handleMouseMove = (e: MouseEvent) => {
      const newX = e.clientX - initialX;
      const newY = e.clientY - initialY;

      setPosition({ x: newX, y: newY });
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
  };
  return (
    <div
      ref={elementRef}
      className={`draggable-element elements ${isDragging ? "dragging" : ""} `}
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        transform: `scale(${zoom / 100})`,
      }}
      onMouseDown={handleMouseDown}
    >
      <CategoryComponents />
    </div>
  );
};

export default DraggableComponent;

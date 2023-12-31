// Helper functions
export const signum = (x: number): number => (x < 0 ? -1 : 1);
export const absolute = (x: number): number => (x < 0 ? -x : x);

export const drawPath = (
  svg: SVGElement,
  path: SVGPathElement,
  startX: number,
  startY: number,
  endX: number,
  endY: number
): void => {
  // Get the path's stroke width (if one wanted to be really precise, one could use half the stroke size)
  const stroke = parseFloat(path.getAttribute("stroke-width") || "0");

  // Check if the svg is big enough to draw the path, if not, set height/width
  if (
    svg.getAttribute("height") &&
    parseFloat(svg.getAttribute("height") || "0") < endY
  ) {
    svg.setAttribute("height", String(endY));
  }

  if (
    svg.getAttribute("width") &&
    parseFloat(svg.getAttribute("width") || "0") < startX + stroke
  ) {
    svg.setAttribute("width", String(startX + stroke));
  }

  if (
    svg.getAttribute("width") &&
    parseFloat(svg.getAttribute("width") || "0") < endX + stroke
  ) {
    svg.setAttribute("width", String(endX + stroke));
  }

  const deltaX = (endX - startX) * 0.15;
  const deltaY = (endY - startY) * 0.15;

  // For further calculations, use whichever is the shortest distance
  const delta = deltaY < absolute(deltaX) ? deltaY : absolute(deltaX);

  // Set sweep-flag (counter/clock-wise)
  // If the start element is closer to the left edge,
  // draw the first arc counter-clockwise, and the second one clockwise
  let arc1 = 0;
  let arc2 = 1;
  if (startX > endX) {
    arc1 = 1;
    arc2 = 0;
  }

  // Draw the pipe-like path
  // 1. move a bit down, 2. arc,  3. move a bit to the right, 4. arc, 5. move down to the end
  path.setAttribute(
    "d",
    `M${startX} ${startY} V${startY + delta} A${delta} ${delta} 0 0 ${arc1} ${
      startX + delta * signum(deltaX)
    } ${startY + 2 * delta} H${
      endX - delta * signum(deltaX)
    } A${delta} ${delta} 0 0 ${arc2} ${endX} ${startY + 3 * delta} V${endY}`
  );
};

export const connectElements = (
  container: HTMLElement,
  svg: SVGElement,
  path: SVGPathElement,
  startElem: HTMLElement,
  endElem: HTMLElement
): void => {
  // If the first element is lower than the second, swap!
  if (
    startElem.getBoundingClientRect().top > endElem.getBoundingClientRect().top
  ) {
    const temp = startElem;
    startElem = endElem;
    endElem = temp;
  }

  // Get (top, left) corner coordinates of the svg container
  const svgTop = container.getBoundingClientRect().top;
  const svgLeft = container.getBoundingClientRect().left;

  // Get (top, left) coordinates for the two elements
  const startCoord = startElem.getBoundingClientRect();
  const endCoord = endElem.getBoundingClientRect();

  // Calculate path's start (x,y)  coords
  // We want the x coordinate to visually result in the element's mid point
  const startX = startCoord.left + 0.5 * startCoord.width - svgLeft; // x = left offset + 0.5*width - svg's left offset
  const startY = startCoord.top + startCoord.height - svgTop; // y = top offset + height - svg's top offset

  // Calculate path's end (x,y) coords
  const endX = endCoord.left + 0.5 * endCoord.width - svgLeft;
  const endY = endCoord.top - svgTop;

  // Call function for drawing the path
  drawPath(svg, path, startX, startY, endX, endY);
};

import * as React from "react";
import * as ReactDOM from "react-dom";

interface PortalProps {
  children: React.ReactNode;
  query?: string;
}

const Portal: React.FC<PortalProps> = ({ children, query = "body" }) =>
  ReactDOM.createPortal(children, document.querySelector(query)!);

export default Portal;

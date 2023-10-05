import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import Portal from "./portal";
import { connectElements } from "./utils";

interface ReactConnectElementsProps {
  elements: Array<any>;
  overlay?: number;
  selector: string;
  strokeWidth?: number;
  color?: string;
}
interface ReactConnectElementsState {
  querySelector: string;
}
export default class ReactConnectElements extends PureComponent<
  ReactConnectElementsProps,
  ReactConnectElementsState
> {
  static defaultProps: Partial<ReactConnectElementsProps> = {
    overlay: 0,
    strokeWidth: 5,
    color: "#666",
  };

  constructor(props: ReactConnectElementsProps) {
    super(props);
    this.state = {
      querySelector: "body",
    };
  }
  svgContainer: HTMLElement | null = null;
  svg: SVGElement | null = null;

  componentDidMount() {
    this.checkSelector();
  }

  checkSelector = () => {
    if (document.querySelector(this.props?.selector)) {
      this.setState({ querySelector: this.props?.selector }, () =>
        this.connectAll()
      );
    }
  };

  connectAll = () => {
    const { elements } = this.props;

    elements.map((element, index) => {
      const start = document.querySelector(element.from);
      const end = document.querySelector(element.to);
      const path = document.querySelector(
        `#path${index + 1}`
      ) as SVGPathElement;

      if (this.svgContainer && this.svg)
        return connectElements(this.svgContainer, this.svg, path, start, end);
    });
  };

  render() {
    const { elements, overlay, strokeWidth, color } = this.props;
    return (
      this.state.querySelector && (
        <Portal query={this.state.querySelector}>
          <div
            id="react-connect-elements-container"
            style={{ zIndex: overlay, position: "absolute" }}
            ref={(svg) => {
              this.svgContainer = svg;
            }}
          >
            <svg
              width="0"
              height="0"
              ref={(svg) => {
                this.svg = svg;
              }}
            >
              {elements.map((element, index) => (
                <path
                  key={`${element.from}-${element.to}`}
                  id={`path${index + 1}`}
                  d="M0 0"
                  stroke={element.color || color}
                  fill="none"
                  strokeWidth={`${strokeWidth}px`}
                />
              ))}
            </svg>
          </div>
        </Portal>
      )
    );
  }
}

// Genady Kogan
import React, { ReactElement, useState, useRef, useEffect } from "react";
import Position from "../../../models/Position";
import TreeNodePosition from "../../../models/TreeNodePosition";
import TreeNodeContainer from "./TreeNodeContainer";

interface Props {
  isActive: boolean;
  canvasRef: React.RefObject<HTMLDivElement>;
  zoomPercentage: number;
  nodeIdex: number;
  edgeRef: React.RefObject<HTMLSpanElement> | null;
  children: JSX.Element | JSX.Element[];
}
const GraphNode: React.FC<Props> = (props: Props): ReactElement => {
  const nodeRef: React.RefObject<HTMLDivElement> = useRef<HTMLDivElement>(null);
  const canvasRef: React.RefObject<HTMLDivElement> = props.canvasRef;
  const [position, setPosition] = useState<TreeNodePosition>({
    top: 200,
    left: 600,
  });
  const handleMouseUp = () => {
    document.onmousemove = null;
  };
  const handleMouseDown = () => {
    document.onmousemove = handleMouseMove;
    document.onmouseup = handleMouseUp;
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (nodeRef.current !== null && canvasRef.current !== null) {
      const nodeWidth: number = +nodeRef.current.offsetWidth;
      const canvasWidth: number = +canvasRef.current.offsetWidth;
      const canvasHeight: number = +canvasRef.current.offsetHeight;

      let newLeft: number = e.clientX - nodeWidth / 2;
      let newTop: number = e.clientY - nodeWidth;

      if (newLeft <= 0) {
        newLeft = 0;
      } else if (newLeft >= canvasWidth - nodeWidth) {
        newLeft = canvasWidth - nodeWidth;
      }

      if (newTop <= 0) {
        newTop = 0;
      } else if (newTop >= canvasHeight - nodeWidth) {
        newTop = canvasHeight - nodeWidth;
      }

      setPosition({
        top: newTop,
        left: newLeft,
      });
    }
  };

  //  tree edge effect, node connection 
  useEffect(() => {
    if (props.edgeRef?.current && nodeRef.current) {
      const halfNodeWidth: number = +nodeRef.current.offsetWidth / 2;
      const edgePosition: Position = {
        top: position.top + halfNodeWidth,
        left: position.left + halfNodeWidth,
      };
      const event = new CustomEvent<Position>("position", {
        detail: edgePosition,
      });
      props.edgeRef.current.dispatchEvent(event);
    }
  });


  return (
    <TreeNodeContainer
      isActive={props.isActive}
      position={position}
      onMouseUp={handleMouseUp}
      onMouseDown={handleMouseDown}
      ref={nodeRef}
      zoomPercentage={props.zoomPercentage}
    >
      {props.children}
      {(props.nodeIdex + 1).toString()}
    </TreeNodeContainer>
  );
};

export default GraphNode;

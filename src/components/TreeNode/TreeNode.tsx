import React, { ReactElement, useState, useRef, useEffect } from "react";
import TreeNodeContainer from "./TreeNodeContainer";
import TreeNodePosition from "../../models/TreeNodePosition";

interface Props {
  isActive: boolean;
  content: string;
  canvasRef: React.RefObject<HTMLDivElement>;
  zoomPercentage: number;
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
      const nodeWidth: number =+ nodeRef.current.offsetWidth;
      const canvasWidth: number =+ canvasRef.current.offsetWidth;
      const canvasHeight: number =+ canvasRef.current.offsetHeight;

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
  
  useEffect(() => {
    const handleWindowResize = () => {
      if (nodeRef.current !== null && canvasRef.current !== null) {
        const nodeWidth: number = +nodeRef.current.offsetWidth;
        const canvasWidth: number = +canvasRef.current.offsetWidth;
        const canvasHeight: number = +canvasRef.current.offsetHeight;

        let newLeft: number = position.left;
        let newTop: number = position.top;

        if (position.left - nodeWidth / 2 <= 0) {
          newLeft = 0;
        } else if (position.left - nodeWidth / 2 >= canvasWidth - nodeWidth) {
          newLeft = canvasWidth - nodeWidth;
        }

        if (position.top - nodeWidth <= 0) {
          newTop = 0;
        } else if (position.top >= canvasHeight - nodeWidth) {
          newTop = canvasHeight - nodeWidth;
        }

        setPosition({
          top: newTop,
          left: newLeft,
        });
      }
    };
    window.addEventListener('resize', handleWindowResize);
    return () => window.removeEventListener('resize', handleWindowResize);
  }, [nodeRef, canvasRef, position]);
  return (
    <TreeNodeContainer
      isActive={props.isActive}
      position={position}
      onMouseUp={handleMouseUp}
      onMouseDown={handleMouseDown}
      ref={nodeRef}
      zoomPercentage={props.zoomPercentage}
    >
      {props.content}
    </TreeNodeContainer>
  );
};

export default GraphNode;

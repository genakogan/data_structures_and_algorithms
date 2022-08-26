// Genady Kogan
import React, { ReactElement } from "react";
import Container from "./Container";

interface Props {
  children: JSX.Element | JSX.Element[];
}

const PlayControl: React.FC<Props> = (props: Props): ReactElement => {
  return <Container left = 'calc(100% - 400px - 100px)' top = 'calc(100% - 47px)' >{props.children}</Container>;
};

export default PlayControl;
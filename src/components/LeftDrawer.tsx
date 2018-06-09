import AddToHome from "components/AddToHome";
import * as React from "react";
import styled from "styled-components";
import { ThemeColors } from "../styles";

const LeftDrawerContainer = styled.div`
  width: 250px;
  height: 100%;
  color: ${ThemeColors.PrimaryForeground};
  background-color: ${ThemeColors.SecondaryBackground};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: stretch;
  padding: 1em;
`;

const FooterContainer = styled.div`
  /* justify-self: flex-end; */
  /* flex: 1; */
`;

interface IComponentProps {}

interface IComponentState {}

export default class LeftDrawer extends React.Component<IComponentProps, IComponentState> {
  public render() {
    return (
      <LeftDrawerContainer>
        <FooterContainer style={{ backgroundColor: "green" }}>
          <p>install this app yo</p>
        </FooterContainer>
        <AddToHome />
      </LeftDrawerContainer>
    );
  }
}

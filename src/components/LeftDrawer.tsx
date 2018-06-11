import List from "@material-ui/core/List/List";
import ListItem from "@material-ui/core/ListItem/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText/ListItemText";
import History from "@material-ui/icons/History";
import Info from "@material-ui/icons/Info";
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
`;

const TopContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: stretch;
`;

const Header = styled.div`
  color: ${ThemeColors.SecondaryAccent};
  padding-left: 1em;
`;

interface IComponentProps {}

interface IComponentState {}

export default class LeftDrawer extends React.Component<IComponentProps, IComponentState> {
  public render() {
    return (
      <LeftDrawerContainer>
        <TopContainer>
          <Header>
            <h2>focus on this</h2>
          </Header>
          <List>
            <ListItem button>
              <ListItemIcon>
                <History style={{ color: ThemeColors.PrimaryForeground }} />
              </ListItemIcon>
              <ListItemText disableTypography primary="History" style={{ color: ThemeColors.PrimaryForeground }} />
            </ListItem>
            <ListItem button>
              <ListItemIcon>
                <Info style={{ color: ThemeColors.PrimaryForeground }} />
              </ListItemIcon>
              <ListItemText disableTypography primary="About" style={{ color: ThemeColors.PrimaryForeground }} />
            </ListItem>
          </List>
        </TopContainer>
        <AddToHome />
      </LeftDrawerContainer>
    );
  }
}

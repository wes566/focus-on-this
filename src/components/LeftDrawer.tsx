import AppBar from "@material-ui/core/AppBar/AppBar";
import Divider from "@material-ui/core/Divider/Divider";
import IconButton from "@material-ui/core/IconButton/IconButton";
import List from "@material-ui/core/List/List";
import ListItem from "@material-ui/core/ListItem/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon/ListItemIcon";
import Toolbar from "@material-ui/core/Toolbar/Toolbar";
import Typography from "@material-ui/core/Typography/Typography";
import Close from "@material-ui/icons/Close";
import Info from "@material-ui/icons/Info";
import Launch from "@material-ui/icons/Launch";
import AddToHome from "components/AddToHome";
import * as React from "react";
import styled from "styled-components";
import { ThemeColors } from "../styles";

const LeftDrawerContainer = styled.div`
  max-width: 250px;
  width: 100%;
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

const BottomContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: stretch;
`;

const ListItemContent = styled.div`
  color: ${ThemeColors.PrimaryForeground};
`;

interface IComponentProps {
  onClose: () => void;
}

interface IComponentState {}

export default class LeftDrawer extends React.Component<IComponentProps, IComponentState> {
  public render() {
    return (
      <LeftDrawerContainer>
        <TopContainer>
          <AppBar style={{ position: "relative", backgroundColor: ThemeColors.SecondaryBackground, color: ThemeColors.SecondaryAccent }}>
            <Toolbar>
              <Typography variant="title" color="inherit" style={{ flex: "1" }}>
                focus on this
              </Typography>
              <IconButton color="inherit" onClick={this.props.onClose} aria-label="Menu">
                <Close style={{ opacity: 20 }} />
              </IconButton>
            </Toolbar>
          </AppBar>
          <List>
            <ListItem button>
              <ListItemIcon>
                <Info style={{ color: ThemeColors.PrimaryForeground }} />
              </ListItemIcon>
              <ListItemContent>About</ListItemContent>
            </ListItem>
          </List>
        </TopContainer>
        <BottomContainer>
          <List>
            <ListItem button component="a" href="https://github.com/wes566/focus-on-this/issues/new?template=bug_report.md" target="_blank">
              <ListItemContent>
                Report a Bug
                <span>
                  <Launch style={{ fontSize: "85%", marginLeft: "1em" }} />
                </span>
              </ListItemContent>
            </ListItem>
            <ListItem button component="a" href="https://github.com/wes566/focus-on-this/issues/new?template=feature_request.md" target="_blank">
              <ListItemContent>
                Suggest a Feature
                <span>
                  <Launch style={{ fontSize: "85%", marginLeft: "1em" }} />
                </span>
              </ListItemContent>
            </ListItem>
          </List>
          <Divider />
          <AddToHome />
        </BottomContainer>
      </LeftDrawerContainer>
    );
  }
}

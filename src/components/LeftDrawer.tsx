import AppBar from "@material-ui/core/AppBar/AppBar";
import Divider from "@material-ui/core/Divider/Divider";
import IconButton from "@material-ui/core/IconButton/IconButton";
import List from "@material-ui/core/List/List";
import ListItem from "@material-ui/core/ListItem/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText/ListItemText";
import Toolbar from "@material-ui/core/Toolbar/Toolbar";
import Typography from "@material-ui/core/Typography/Typography";
import Close from "@material-ui/icons/Close";
// import History from "@material-ui/icons/History";
import Info from "@material-ui/icons/Info";
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

// const Header = styled.div`
//   color: ${ThemeColors.SecondaryAccent};
//   padding-left: 1em;
// `;

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
            {/* <ListItem button>
              <ListItemIcon>
                <History style={{ color: ThemeColors.PrimaryForeground }} />
              </ListItemIcon>
              <ListItemText disableTypography primary="History" style={{ color: ThemeColors.PrimaryForeground }} />
            </ListItem> */}
            <ListItem button>
              <ListItemIcon>
                <Info style={{ color: ThemeColors.PrimaryForeground }} />
              </ListItemIcon>
              <ListItemText disableTypography primary="About" style={{ color: ThemeColors.PrimaryForeground }} />
            </ListItem>
          </List>
        </TopContainer>
        <BottomContainer>
          <List>
            <ListItem button>
              <ListItemText disableTypography primary="Report a Bug" style={{ color: ThemeColors.PrimaryForeground }} />
            </ListItem>
            <ListItem button>
              <ListItemText disableTypography primary="Suggest a Feature" style={{ color: ThemeColors.PrimaryForeground }} />
            </ListItem>
          </List>
          <Divider />
          <AddToHome />
        </BottomContainer>
      </LeftDrawerContainer>
    );
  }
}

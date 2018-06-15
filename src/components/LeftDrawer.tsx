import AppBar from "@material-ui/core/AppBar/AppBar";
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
import { RouteComponentProps, withRouter } from "react-router-dom";
import styled from "styled-components";
import { ThemeColors } from "../styles";

export enum LeftDrawerConstants {
  LeftDrawerWidth = "280px"
}

const LeftDrawerContainer = styled.div`
  max-width: ${LeftDrawerConstants.LeftDrawerWidth};
  width: 100%;
  color: ${ThemeColors.PrimaryForeground};
  background-color: ${ThemeColors.SecondaryBackground};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: stretch;
  overflow-y: auto;
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
  padding-bottom: 10px;
`;

const ListItemContent = styled.div`
  color: ${ThemeColors.PrimaryForeground};
`;

interface IComponentProps {
  onClose: () => void;
}

type CombinedProps = IComponentProps & RouteComponentProps<{}>;

interface IComponentState {
  height?: string;
}

export class LeftDrawer extends React.Component<CombinedProps, IComponentState> {
  constructor(props: CombinedProps) {
    super(props);
    this.state = {};

    // add to home screen stuff (from https://developers.google.com/web/updates/2018/06/a2hs-updates)
    // window.addEventListener("beforeinstallprompt", event => {
    //   // tslint:disable-next-line:no-debugger
    //   debugger;
    //   // Prevent Chrome <= 67 from automatically showing the prompt
    //   event.preventDefault();
    //   // Stash the event so it can be triggered later.
    //   this.setState({...this.state, installPromptEvent: event});
    // });
  }

  public render() {
    return (
      <LeftDrawerContainer style={{ height: this.state.height || "100%" }}>
        <TopContainer>
          <AppBar style={{ position: "relative", backgroundColor: ThemeColors.SecondaryBackground, color: ThemeColors.SecondaryAccent }}>
            <Toolbar>
              <Typography variant="title" color="inherit" style={{ flex: "1", cursor: "pointer" }} onClick={this.OnLogoClicked}>
                focus on this
              </Typography>
              <IconButton color="inherit" onClick={this.props.onClose} aria-label="Menu">
                <Close style={{ opacity: 20 }} />
              </IconButton>
            </Toolbar>
          </AppBar>
          <List>
            <ListItem button component="a" href="/#/about?ref=nav">
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
          <AddToHome />
        </BottomContainer>
      </LeftDrawerContainer>
    );
  }

  public componentDidMount() {
    window.addEventListener("resize", this.updateWindowDimensions);
    this.updateWindowDimensions();
  }

  private updateWindowDimensions = () => {
    this.setState({ ...this.state, height: `${window.innerHeight}px` });
  };

  private OnLogoClicked = e => {
    e.preventDefault();

    if (this.props.location.pathname !== "/") {
      this.props.history.push("/");
    }
  };
}

export default withRouter(LeftDrawer);

import AppBar from "@material-ui/core/AppBar/AppBar";
import Toolbar from "@material-ui/core/Toolbar/Toolbar";
import Typography from "@material-ui/core/Typography/Typography";
import ArrowBack from "@material-ui/icons/ArrowBack";
import * as React from "react";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { AltPageContainer, PageContainer, TextContainer, ThemeColors } from "styles";

export class AboutPage extends React.PureComponent<RouteComponentProps<{}>, {}> {
  public render() {
    return (
      <PageContainer>
        <AppBar style={{ position: "relative", backgroundColor: ThemeColors.SecondaryBackground, color: ThemeColors.SecondaryAccent }}>
          <Toolbar>
            <Typography variant="title" color="inherit" style={{ flex: "1", cursor: "pointer" }} onClick={this.OnBackClick}>
              <span>
                <ArrowBack style={{ fontSize: "80%", marginRight: "1em" }} />
              </span>
              focus on this
            </Typography>
          </Toolbar>
        </AppBar>
        <AltPageContainer style={{ position: "static" }}>
          <TextContainer>
            <h2>about</h2>
            <p>
              Hi, I'm Wes. I made this simple app because sometimes I lack focus while working. I'll be at my computer, ready to write some code that
              will <s>eventually get rewritten</s> hopefully do something useful... and then I will mindlessly pick up my phone and look for a
              distraction (what's wrong with me?{" "}
              <a href="https://youtu.be/9VGuYN8NOSI" target="_blank">
                Come on!
              </a>). So I wanted a simple way to have something be up on my phone screen when I unlock it that will remind me of what I'm trying to
              focus on. And so, I wrote this simple app.
            </p>
            <br />
            <h2>tips for use</h2>
            <ul>
              <li>Add this site to your home screen, it will act like a native app (home screen icon, works offline, fast).</li>
              <li>
                Make this your browser start page, so every time you open a new browser window you can have a reminder of what you are focusing on.
              </li>
              <li>
                If you are in a meeting, pull this site up and put in the purpose of your meeting... if any discussion in the meeting does not pertain
                to what is on the screen then point to the screen and <s>yell</s> gently remind folks to stay on topic... if your meeting doesn't have
                a simple purpose that you can capture in a short sentence then cancel your meeting :)
              </li>
            </ul>
          </TextContainer>
        </AltPageContainer>
      </PageContainer>
    );
  }

  private OnBackClick = e => {
    e.preventDefault();

    const params = new URLSearchParams(this.props.location.search);
    const referrer = params.get("ref");
    if (!referrer) {
      this.props.history.push("/");
    } else {
      // if we got to the about page via our own site then the ref query param will be set
      // and we can just go back in the history so the about page isn't on the back stack
      this.props.history.goBack();
    }
  };
}

export default withRouter(AboutPage);

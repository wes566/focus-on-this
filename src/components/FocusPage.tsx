// icon list at https://material.io/tools/icons
import AppBar from "@material-ui/core/AppBar/AppBar";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import Fade from "@material-ui/core/Fade";
import IconButton from "@material-ui/core/IconButton/IconButton";
import Slide from "@material-ui/core/Slide";
import Toolbar from "@material-ui/core/Toolbar/Toolbar";
import Typography from "@material-ui/core/Typography/Typography";
import ArrowForward from "@material-ui/icons/ArrowForward";
import Close from "@material-ui/icons/Close";
import Done from "@material-ui/icons/Done";
import HelpOutline from "@material-ui/icons/HelpOutline";
import * as React from "react";
import styled from "styled-components";
import { getItem, removeItem, saveItem } from "../storage";
import { AltPageContainer, PageContainer, ScrollableContainer, SecondaryAccentColor, SecondaryBackgroundColor, TextContainer } from "../styles";

const ToDoContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
`;

const InfoContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-self: stretch;
`;

const Footer = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 20px;
`;

const Input = styled.input`
  padding: 0.5em;
  text-align: center;
  min-width: 50%;
  margin: 2em;
  border: none;
  border-radius: 3px;
  border-bottom-width: 0;
  padding: 10px;
  font-size: 24px;
`;

const Text = styled.div`
  font-size: 24px;
  margin-top: 30px;
  padding-bottom: 20px;
  cursor: default;
`;

const HintText = styled.div`
  font-size: 16px;
  color: #fafafa;
  opacity: 0.5;
  cursor: default;
`;

const InstructionText = styled.div`
  font-size: 24px;
  cursor: default;
  text-align: center;
`;

interface IComponentProps {}

interface IComponentState {
  text: string;
  todoItem: string;
  isReadingStorage: boolean;
  showInfo: boolean;
}

enum ComponentConstants {
  TODO_KEY = "latestTodo"
}

const SlowFadeTimeout: number = 3000;

function slideUpTransition(props) {
  return <Slide direction="up" {...props} />;
}

export default class FocusPage extends React.Component<IComponentProps, IComponentState> {
  constructor(props: IComponentProps) {
    super(props);
    this.state = { text: "", todoItem: "", isReadingStorage: true, showInfo: false };
  }

  public render() {
    if (this.state.isReadingStorage) {
      return this.renderLoading();
    }

    if (!this.state.todoItem) {
      return this.renderInputTodo();
    }

    return this.renderTodo();
  }

  public async componentDidMount() {
    await this.readTodoFromStorage();
  }

  private onInputChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault(); // TODO: do I need to call this?
    const newText = (e.target && e.target.value) || "";
    this.setState({ ...this.state, text: newText });
  };

  private onKeyUp = async (e: any) => {
    if (e.keyCode === 13) {
      await this.handleToDoEntered(e);
    }
  };

  private handleToDoEntered = async (e: any) => {
    await saveItem(ComponentConstants.TODO_KEY, this.state.text);
    this.setState({ ...this.state, todoItem: this.state.text, text: "" });
  };

  private async readTodoFromStorage() {
    try {
      const todo = await getItem<string>(ComponentConstants.TODO_KEY);
      this.setState({ ...this.state, isReadingStorage: false, todoItem: todo || "" });
    } catch (error) {
      // tslint:disable-next-line:no-console
      console.error(error);
      this.setState({ ...this.state, isReadingStorage: false, todoItem: "" });
    }
  }

  private async clearTodoFromStorage() {
    await removeItem(ComponentConstants.TODO_KEY);
  }

  private markTodoDone = async e => {
    e.preventDefault();
    this.setState({ ...this.state, text: "", todoItem: "" });
    await this.clearTodoFromStorage();
  };

  private showInfo = () => {
    this.setState({ ...this.state, showInfo: true });
  };

  private hideInfo = () => {
    this.setState({ ...this.state, showInfo: false });
  };

  private renderInputTodo() {
    const hasText = !!this.state.text && this.state.text !== "";

    return (
      <div>
        <PageContainer>
          <InputContainer>
            <InfoContainer>
              {/* <HelpOutline onClick={this.showInfo} /> */}
              <IconButton color="inherit" onClick={this.showInfo} aria-label="Close">
                <HelpOutline />
              </IconButton>
            </InfoContainer>
            <InstructionText>{`What one thing do you want to focus on right now?`}</InstructionText>
            <Input onChange={this.onInputChanged} value={this.state.text} autoFocus={true} onKeyUp={this.onKeyUp} />
            <Fade in={hasText}>
              <Button variant="fab" color="primary" aria-label="ok" onClick={this.handleToDoEntered}>
                <ArrowForward />
              </Button>
            </Fade>
            <Fade in={hasText} timeout={hasText ? SlowFadeTimeout : 0}>
              <HintText style={{ paddingTop: "10px" }}>or press Enter</HintText>
            </Fade>
          </InputContainer>
        </PageContainer>
        <Dialog open={this.state.showInfo} onClose={this.hideInfo} fullScreen TransitionComponent={slideUpTransition}>
          <AppBar style={{ position: "relative", backgroundColor: SecondaryBackgroundColor, color: SecondaryAccentColor }}>
            <Toolbar>
              <Typography variant="title" color="inherit" style={{ flex: "1" }}>
                focus on this
              </Typography>
              <IconButton color="inherit" onClick={this.hideInfo} aria-label="Close">
                <Close />
              </IconButton>
            </Toolbar>
          </AppBar>
          <AltPageContainer style={{ position: "static" }}>
            <ScrollableContainer>
              <TextContainer>
                <h2>about</h2>
                <p>
                  Hi, I'm Wes. I made this simple app because sometimes I lack focus while working. I'll be at my computer, ready to write some code
                  that will <s>eventually get rewritten</s> hopefully do something useful... and then I will mindlessly pick up my phone and look for
                  a distraction (what's wrong with me?{" "}
                  <a href="https://youtu.be/9VGuYN8NOSI" target="_blank">
                    Come on!
                  </a>). So I wanted a simple way to have something be up on my phone screen when I unlock it that will remind me of what I'm trying
                  to focus on. And so, I wrote this simple app.
                </p>
                <br />
                <h2>tips for use</h2>
                <ul>
                  <li>Add this site to your home screen, it will act like a native app (home screen icon, works offline, fast).</li>
                  <li>
                    Make this your browser start page, so every time you open a new browser window you can have a reminder of what you are focusing
                    on.
                  </li>
                  <li>
                    If you are in a meeting, pull this site up and put in the purpose of your meeting... if any discussion in the meeting does not
                    pertain to what is on the screen then point to the screen and <s>yell</s> gently remind folks to stay on topic... if your meeting
                    doesn't have a simple purpose that you can capture in a short sentence then cancel your meeting :)
                  </li>
                </ul>
                <br />
                <p>
                  <a href="https://github.com/wes566/focus-on-this/issues/new?template=bug_report.md" target="_blank">
                    Report a bug
                  </a>
                </p>
                <p>
                  <a href="https://github.com/wes566/focus-on-this/issues/new?template=feature_request.md" target="_blank">
                    Suggest a feature
                  </a>
                </p>
              </TextContainer>
            </ScrollableContainer>
          </AltPageContainer>
        </Dialog>
      </div>
    );
  }

  private renderTodo() {
    return (
      <PageContainer>
        <div />
        <ToDoContainer>
          <Fade in={true}>
            <Text>{this.state.todoItem}</Text>
          </Fade>
        </ToDoContainer>
        <Fade in={true} timeout={SlowFadeTimeout}>
          <Footer>
            <Button variant="fab" color="primary" aria-label="done" onClick={this.markTodoDone}>
              <Done />
            </Button>
          </Footer>
        </Fade>
      </PageContainer>
    );
  }

  private renderLoading() {
    return (
      <PageContainer>
        <p>Loading...</p>
      </PageContainer>
    );
  }
}

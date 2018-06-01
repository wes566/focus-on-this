// icon list at https://material.io/tools/icons
import AppBar from "@material-ui/core/AppBar/AppBar";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import Fade from "@material-ui/core/Fade";
import IconButton from "@material-ui/core/IconButton/IconButton";
import Slide from "@material-ui/core/Slide";
import Tab from "@material-ui/core/Tab/Tab";
import Tabs from "@material-ui/core/Tabs/Tabs";
import Toolbar from "@material-ui/core/Toolbar/Toolbar";
import Typography from "@material-ui/core/Typography/Typography";
import ArrowForward from "@material-ui/icons/ArrowForward";
import Close from "@material-ui/icons/Close";
import Done from "@material-ui/icons/Done";
import HelpOutline from "@material-ui/icons/HelpOutline";
import Info from "@material-ui/icons/Info";
import * as React from "react";
import styled from "styled-components";
import { getItem, removeItem, saveItem } from "../storage";
import { AccentColor, PageContainer, PrimaryForegroundColor } from "../styles";

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
  infoTabValue: number;
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
    this.state = { text: "", todoItem: "", isReadingStorage: true, showInfo: false, infoTabValue: 0 };
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

  private handleTabChanged = (event: any, value: number) => {
    this.setState({ ...this.state, infoTabValue: value });
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
          <AppBar style={{ position: "relative" }}>
            <Toolbar color={AccentColor}>
              <Typography variant="title" color="inherit" style={{ flex: "1" }}>
                <Tabs
                  value={this.state.infoTabValue}
                  onChange={this.handleTabChanged}
                  indicatorColor={PrimaryForegroundColor}
                  textColor={PrimaryForegroundColor}>
                  <Tab icon={<HelpOutline />} label="How to use" />
                  <Tab icon={<Info />} label="About" />
                </Tabs>
              </Typography>
              <IconButton color="inherit" onClick={this.hideInfo} aria-label="Close">
                <Close />
              </IconButton>
            </Toolbar>{" "}
          </AppBar>
          {this.state.infoTabValue === 0 && <div>Item One</div>}
          {this.state.infoTabValue === 1 && <div>Item Two</div>}
          {this.state.infoTabValue === 2 && <div>Item Three</div>}

          <div>
            <div>What is this thing?</div>
          </div>
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

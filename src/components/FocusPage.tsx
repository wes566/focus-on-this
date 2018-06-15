import Button from "@material-ui/core/Button";
import Drawer from "@material-ui/core/Drawer";
import Fade from "@material-ui/core/Fade";
import ArrowForward from "@material-ui/icons/ArrowForward";
import Done from "@material-ui/icons/Done";
import Menu from "@material-ui/icons/Menu";
import LeftDrawer from "components/LeftDrawer";
import * as React from "react";
import styled from "styled-components";
import { getItem, removeItem, saveItem } from "../storage";
import { PageContainer } from "../styles";

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

const Footer = styled.div`
  display: flex;
  justify-content: space-between;
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
  padding: 1em;
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
  openDrawer: boolean;
}

enum ComponentConstants {
  TODO_KEY = "latestTodo"
}

const SlowFadeTimeout: number = 3000;

export default class FocusPage extends React.Component<IComponentProps, IComponentState> {
  constructor(props: IComponentProps) {
    super(props);
    this.state = { text: "", todoItem: "", isReadingStorage: true, openDrawer: false };

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

  private showDrawer = () => {
    this.setState({ ...this.state, openDrawer: true });
  };

  private hideDrawer = () => {
    this.setState({ ...this.state, openDrawer: false });
  };

  // private handleInstallApp = e => {
  //   e.preventDefault();

  // // Show the modal add to home screen dialog
  // installPromptEvent.prompt();
  // // Wait for the user to respond to the prompt
  // installPromptEvent.userChoice.then(choice => {
  //   if (choice.outcome === "accepted") {
  //     // tslint:disable-next-line:no-console
  //     console.log("User accepted the A2HS prompt");
  //   } else {
  //     // tslint:disable-next-line:no-console
  //     console.log("User dismissed the A2HS prompt");
  //   }
  //   // Clear the saved prompt since it can't be used again
  //   installPromptEvent = null;
  // });
  // };

  private renderInputTodo() {
    const hasText = !!this.state.text && this.state.text !== "";

    return (
      <PageContainer>
        <InputContainer style={{ paddingTop: "5em" }}>
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
        <Footer>{this.renderMenu()}</Footer>
        <Drawer open={this.state.openDrawer} onClose={this.hideDrawer} style={{ backgroundColor: "yellow" }}>
          <LeftDrawer onClose={this.hideDrawer} />
        </Drawer>
      </PageContainer>
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
        <Footer>
          {this.renderMenu(0.5)}
          <Fade in={true} timeout={SlowFadeTimeout}>
            <Button variant="fab" color="primary" aria-label="done" onClick={this.markTodoDone}>
              <Done />
            </Button>
          </Fade>
        </Footer>
        <Drawer open={this.state.openDrawer} onClose={this.hideDrawer}>
          <LeftDrawer onClose={this.hideDrawer} />
        </Drawer>
      </PageContainer>
    );
  }

  private renderMenu(menuOpacity?: number) {
    const opacityToUse = menuOpacity || 1.0;
    return (
      <Button style={{ opacity: opacityToUse }} variant="fab" color="primary" aria-label="menu" onClick={this.showDrawer}>
        <Menu />
      </Button>
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

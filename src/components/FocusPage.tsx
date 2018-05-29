// icon list at https://material.io/tools/icons
import Button from "@material-ui/core/Button";
import Fade from "@material-ui/core/Fade";
import Modal from "@material-ui/core/Modal";
import ArrowForward from "@material-ui/icons/ArrowForward";
import Done from "@material-ui/icons/Done";
import HelpOutline from "@material-ui/icons/HelpOutline";
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
    // this.setState({ ...this.state, showInfo: true });
    alert("Instructions on how to use this coming soon");
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
              <HelpOutline onClick={this.showInfo} />
              {/* <Button variant="fab" color="inherit" aria-label="info" onClick={this.showInfo}>
              <PriorityHigh />
            </Button> */}
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
        <Modal open={this.state.showInfo} onClose={this.hideInfo}>
          <div style={{ display: "flex", flexDirection:"column", backgroundColor: "white"}}>
            <div>
              What is this thing?
            </div>
          </div>
        </Modal>
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

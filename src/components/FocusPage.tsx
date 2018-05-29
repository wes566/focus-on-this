import Button from "@material-ui/core/Button";
import ArrowForward from "@material-ui/icons/ArrowForward";
import Done from "@material-ui/icons/Done";
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
  padding-top: 70px;
  padding-left: 20px;
  padding-right: 20px;
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
  showContext: boolean;
}

enum ComponentConstants {
  TODO_KEY = "latestTodo"
}

export default class FocusPage extends React.Component<IComponentProps, IComponentState> {
  constructor(props: IComponentProps) {
    super(props);
    this.state = {
      text: "",
      todoItem: "",
      isReadingStorage: true,
      showContext: false
    };
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
    this.setState({ ...this.state, text: "", todoItem: "", showContext: false });
    await this.clearTodoFromStorage();
  };

  private toggleContext = e => {
    this.setState({ ...this.state, showContext: !this.state.showContext });
  };

  private renderInputTodo() {
    return (
      <PageContainer>
        <InputContainer>
          <InstructionText>{`What one thing do you want to focus on right now?`}</InstructionText>
          <Input onChange={this.onInputChanged} value={this.state.text} autoFocus={true} onKeyUp={this.onKeyUp} />
          <Button variant="fab" color="primary" aria-label="ok" onClick={this.handleToDoEntered}>
            <ArrowForward />
          </Button>
          <HintText style={{ paddingTop: "10px" }}>or press Enter</HintText>
        </InputContainer>
      </PageContainer>
    );
  }

  private renderTodo() {
    return (
      <PageContainer>
        <div />
        <ToDoContainer>
          <Text onClick={this.toggleContext}>{this.state.todoItem}</Text>
        </ToDoContainer>
        <Footer>
          <Button variant="fab" color="primary" aria-label="done" onClick={this.markTodoDone}>
            <Done />
          </Button>
        </Footer>
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

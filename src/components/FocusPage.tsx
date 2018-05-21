import Icon from "material-ui/Icon";
import * as React from "react";
import styled from "styled-components";
import { getItem, removeItem, saveItem } from "../storage";
import { PageContainer } from "../styles";

const ToDoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex: 1;
  padding: 40;
`;

const Footer = styled.div`
  display: flex;
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

const Button = styled.button`
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 1px solid #bbb;
  border-radius: 1px;
`;

const Text = styled.div`
  font-size: 24px;
  margin-top: 30px;
  padding-bottom: 20px;
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
      await saveItem(ComponentConstants.TODO_KEY, this.state.text);
      this.setState({ ...this.state, todoItem: this.state.text, text: "" });
    }
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
        <InstructionText>{`What one thing do you want to focus on right now?`}</InstructionText>
        <Input onChange={this.onInputChanged} value={this.state.text} autoFocus={true} onKeyUp={this.onKeyUp} />
        <Icon style={{ fontSize: "84px" }}>arrow_forward</Icon>
      </PageContainer>
    );
  }

  private renderTodo() {
    return (
      <PageContainer>
        <ToDoContainer>
          <Text onClick={this.toggleContext}>{this.state.todoItem}</Text>
          <Footer>
            <div style={{ opacity: this.state.showContext ? 1 : 0 }}>
              <Button onClick={this.markTodoDone}>done</Button>
            </div>
          </Footer>
        </ToDoContainer>
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

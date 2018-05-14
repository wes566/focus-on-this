import Icon from "material-ui/Icon";
import Zoom from "material-ui/transitions/Zoom";
import * as React from "react";
import styled from "styled-components";
import { getItem, removeItem, saveItem } from "../storage";

const PageContainer = styled.div`
  height: 100%;
  width: 100%;
  overflow: hidden;
  position: fixed;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  flex: 1;
  padding-top: 50px;
`;

const ToDoContainer = styled.div`
  height: 100%;
  width: 100%;
  position: fixed;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex: 1;
  padding: 40;
  background-color: #21b6a8;
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

const Text = styled.text`
  font-size: 24px;
  margin-top: 30px;
  padding-bottom: 20px;
  color: pink;
  cursor: default;
`;

const InstructionText = styled.text`
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
  showButton: boolean;
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
      showContext: false,
      showButton: false
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

    setInterval(() => {
      // tslint:disable-next-line:no-console
      console.log("timer hit");
      this.setState({ ...this.state, showButton: !this.state.showButton });
    }, 1000);
  }

  private onTouchMoved = e => {
    e.preventDefault();
  };

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
      <PageContainer onTouchMove={this.onTouchMoved}>
        <InstructionText>{`What one thing do you want to focus on right now?`}</InstructionText>
        <Input onChange={this.onInputChanged} value={this.state.text} autoFocus={true} onKeyUp={this.onKeyUp} />
        <Zoom in={this.state.showButton}>
          <div>
            <Icon style={{ fontSize: "84px", color: "pink" }}>pets</Icon>
            <Icon style={{ fontSize: "84px", color: "pink" }}>pets</Icon>
            <Icon style={{ fontSize: "84px", color: "pink" }}>pets</Icon>
            <Icon style={{ fontSize: "84px", color: "pink" }}>pets</Icon>
            <Icon style={{ fontSize: "84px", color: "pink" }}>pets</Icon>
            <Icon style={{ fontSize: "84px", color: "pink" }}>pets</Icon>
            <Icon style={{ fontSize: "84px", color: "pink" }}>pets</Icon>
            <Icon style={{ fontSize: "84px", color: "pink" }}>pets</Icon>
            <Icon style={{ fontSize: "84px", color: "pink" }}>pets</Icon>
            <Icon style={{ fontSize: "84px", color: "pink" }}>pets</Icon>
            <Icon style={{ fontSize: "84px", color: "pink" }}>pets</Icon>
            <Icon style={{ fontSize: "84px", color: "pink" }}>pets</Icon>
          </div>
        </Zoom>
      </PageContainer>
    );
  }

  private renderTodo() {
    return (
      <ToDoContainer onTouchMove={this.onTouchMoved}>
        <Text onClick={this.toggleContext}>{this.state.todoItem}</Text>
        <Footer>
          <div style={{ opacity: this.state.showContext ? 1 : 0 }}>
            <Button onClick={this.markTodoDone}>done</Button>
          </div>
        </Footer>
      </ToDoContainer>
    );
  }

  private renderLoading() {
    return (
      <PageContainer onTouchMove={this.onTouchMoved}>
        <p>Loading...</p>
      </PageContainer>
    );
  }
}

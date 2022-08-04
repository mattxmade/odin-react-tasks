import styled from "styled-components";
import React, { useState, Component } from "react";
import Overview from "./Overview";
import uniqid from "uniqid";

const Main = styled.main``;

const Input = styled.input`
  padding: 0.5rem;
`;

const Submit = styled.button`
  color: white;
  padding: 0.5rem;
  width: 10rem;
  cursor: pointer;
  border-radius: 0.5rem;
  background-color: black;
`;

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      task: {
        value: "",
        id: uniqid(),
        action: {
          remove: this.removeTask,
          update: this.updateTask,
        },
      },
      tasks: [],
    };
  }

  handleInput = (e) => {
    const { value, id, action } = this.state.task;

    this.setState({
      task: { value: e.target.value, id, action },
    });
  };

  submitTask = (e) => {
    e.preventDefault();

    if (this.state.task.value === "") return;

    this.setState({
      tasks: this.state.tasks.concat(this.state.task),
      task: {
        value: "",
        id: uniqid(),
        action: this.state.task.action,
      },
    });
  };

  removeTask = (e, taskID) => {
    e.preventDefault();

    this.setState({
      tasks: this.state.tasks.filter((task) => task.id !== taskID),
    });
  };

  updateTask = (taskID, newValue) => {
    if (this.state.task.value === newValue || newValue === "") return;

    this.setState({
      tasks: this.state.tasks.filter((task) => {
        if (task.id === taskID) task.value = newValue;
        return task;
      }),
    });
  };

  render() {
    return (
      <Main>
        <h1>My Tasks</h1>

        <form>
          <Input
            type="text"
            value={this.state.task.value}
            onChange={this.handleInput}
            placeholder="Enter a Task"
          />

          <Submit type="submit" value="submit" onClick={this.submitTask}>
            Add Task
          </Submit>
        </form>

        <Overview tasks={this.state.tasks} />
      </Main>
    );
  }
}

export default App;

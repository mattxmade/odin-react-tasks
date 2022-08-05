import styled from "styled-components";
import React, { useState, Component } from "react";
import Overview from "./Overview";
import uniqid from "uniqid";

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

    const sessionStorage = localStorage.getItem("tasks");

    this.state = {
      task: {
        value: "",
        id: uniqid(),
        action: {
          remove: this.removeTask,
          update: this.updateTask,
        },
      },
      tasks:
        sessionStorage && sessionStorage.length
          ? JSON.parse(sessionStorage).map((task) => {
              task.action = {
                remove: this.removeTask,
                update: this.updateTask,
              };
              return task;
            })
          : [],
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.tasks !== this.state.tasks) this.updateLocalStorage();
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

  updateLocalStorage = () =>
    localStorage.setItem("tasks", JSON.stringify(this.state.tasks));

  render() {
    return (
      <main>
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

        <ul>
          {this.state.tasks.map((task, index) => (
            <Overview
              key={index}
              task={task}
              index={index}
              length={this.state.tasks.length}
            />
          ))}
        </ul>
      </main>
    );
  }
}

export default App;

// .bind(this) is not needed as functions are ES6 | context is built-in
// cannot stringify functions | re-add methods to task when parsing

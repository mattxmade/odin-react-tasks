import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const Tasks = styled.ul`
  list-style: none;
`;

const Overview = (props) => {
  const tasks = props.tasks;
  return (
    <Tasks className="tasks">
      {tasks.map((task, index) => (
        <li key={index} id={task.id}>
          <p>
            <span>{tasks.length === 0 ? "" : index + 1 + ". "}</span>
            <span className="task">{task.value}</span>
          </p>
          <div className="icons">
            <i className="fas fa-edit"></i>
            <i
              className="fas fa-trash-alt"
              onClick={(e) => task.remove(e, task.id)}
            ></i>
          </div>
        </li>
      ))}
    </Tasks>
  );
};

export default Overview;

Overview.protoTypes = {
  tasks: PropTypes.array,
};

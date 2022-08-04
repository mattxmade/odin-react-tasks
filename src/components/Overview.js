import React, { useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const Tasks = styled.ul`
  list-style: none;
`;

const Overview = (props) => {
  const tasks = props.tasks;
  const [value, setValue] = useState("");

  const handleInput = (e) => {
    setValue(e.target.value);
  };

  const editTask = (e, task) => {
    const edit = toggleIcon(task.id, e);
    if (edit) task.action.update(task.id, value);
  };

  const toggleIcon = (taskID, e) => {
    const itemInput = document.querySelector(`[data-id=${taskID}]`);
    itemInput.classList.toggle("hide");

    if (e.target.classList.contains("fa-user-edit")) {
      e.target.classList.toggle("fa-user-edit");
      e.target.classList.toggle("fa-user-check");

      return false;
    }

    e.target.classList.toggle("fa-user-edit");
    e.target.classList.toggle("fa-user-check");

    return true;
  };

  return (
    <Tasks className="tasks">
      {tasks.map((task, index) => (
        <li key={index} id={task.id}>
          <div className="task-container">
            <p>{tasks.length === 0 ? "" : index + 1 + ". "}</p>

            <div className="task-info">
              <p className="task">{task.value}</p>
              <input
                type="text"
                data-id={task.id}
                placeholder={task.value}
                onChange={handleInput}
                className={"task-input hide"}
              />
            </div>
          </div>

          <div className="task-icons">
            <i
              className={"fas fa-user-edit"}
              onClick={(e) => editTask(e, task)}
            ></i>
            <i
              className="fas fa-trash-alt"
              onClick={(e) => task.action.remove(e, task.id)}
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

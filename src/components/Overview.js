import React from "react";

const Overview = (props) => {
  return (
    <ul>
      {props.tasks.map((task, index) => {
        <li key={index}>{task}</li>;
      })}
    </ul>
  );
};

export default Overview;

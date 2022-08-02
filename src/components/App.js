import styled from "styled-components";
import React, { useState, useEffect, useCallback, useMemo } from "react";
import Overview from "./Overview";

const Main = styled.main``;
const Input = styled.input``;

const App = () => {
  const [tasks, setTasks] = useState([]);

  return (
    <Main>
      <h1>My Tasks</h1>
      <Input type="text" placeholder="Enter a new task" />
      <Overview tasks={tasks} />
    </Main>
  );
};

export default App;

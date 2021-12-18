import "./App.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Task from "./components/task.jsx";
import React from "react";

function App() {
  return (
    <React.Fragment>
      <ToastContainer />
      <Task />;
    </React.Fragment>
  );
}

export default App;

import React from "react";
import { createTask, deleteTask, getTasks } from "../services/taskService";

class Task extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      todoList: [],
      activeItem: {
        id: null,
        title: "",
        completed: false,
      },
      // editing: false,
    };
  }

  componentDidMount() {
    this.fetchTasks();
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    const task = this.state.activeItem;
    await createTask(task);
    await this.fetchTasks();
    this.setState({
      activeItem: {
        id: null,
        title: "",
        completed: false,
      },
    });
  };

  handleEdit = async (task) => {
    this.setState({
      activeItem: task,
    });
  };

  handleChange = (e) => {
    const { value } = e.target;

    this.setState({
      activeItem: {
        ...this.state.activeItem,
        title: value,
      },
    });
  };

  handleDelete = async (task) => {
    await deleteTask(task);
    await this.fetchTasks();
  };

  fetchTasks = async () => {
    const { data: result } = await getTasks();
    this.setState({ todoList: result });
  };

  invertState = async (task) => {
    task.complete = !task.complete;
    await createTask(task);
    this.fetchTasks();
    console.log(task);
  };

  render() {
    const { todoList: tasks } = this.state;
    return (
      <div className="container">
        <div id="task-container">
          <div id="form-wrapper">
            <form onSubmit={this.handleSubmit} id="form">
              <div className="flex-wrapper">
                <div style={{ flex: 6 }}>
                  <input
                    className="form-control"
                    onChange={this.handleChange}
                    value={this.state.activeItem.title}
                    id="title"
                    type="text"
                    name="title"
                    placeholder="Add task.."
                  />
                </div>

                <div style={{ flex: 1 }}>
                  <input
                    id="submit"
                    className="btn btn-warning"
                    type="submit"
                    value="Add"
                  />
                </div>
              </div>
            </form>
          </div>
          <div id="list-wrapper">
            {tasks.map((task, index) => {
              return (
                <div key={index} className="task-wrapper flex-wrapper">
                  <div
                    onClick={() => this.invertState(task)}
                    style={{ flex: 7 }}
                  >
                    {task.complete === false ? (
                      <span>{task.title}</span>
                    ) : (
                      <strike>
                        <span>{task.title}</span>
                      </strike>
                    )}
                  </div>
                  <div style={{ flex: 1 }}>
                    <button
                      onClick={() => this.handleEdit(task)}
                      className="btn btn-sm btn-outline-info"
                    >
                      Edit
                    </button>
                  </div>

                  <div style={{ flex: 1 }}>
                    <button
                      onClick={() => this.handleDelete(task)}
                      className="btn btn-sm btn-outline-dark delete"
                    >
                      -
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}

export default Task;

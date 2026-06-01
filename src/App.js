import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import $ from "jquery";

import {
  addTask,
  deleteTask,
  toggleTask,
  editTask,
} from "./redux/taskSlice";

function App() {
  const tasks = useSelector((state) => state.tasks.list);
  const dispatch = useDispatch();

  const [taskText, setTaskText] = useState("");
  const [filter, setFilter] = useState("all");

  const showPopup = (message) => {
    $("#popup").text(message).fadeIn();

    setTimeout(() => {
      $("#popup").fadeOut();
    }, 2000);
  };

  const handleAddTask = () => {
    if (taskText.trim() === "") {
      showPopup("Enter a task");
      return;
    }

    dispatch(addTask(taskText));
    setTaskText("");
    showPopup("Task Added");
  };

  const handleEdit = (task) => {
    const newText = prompt("Edit Task", task.text);

    if (newText) {
      dispatch(
        editTask({
          id: task.id,
          text: newText,
        })
      );

      showPopup("Task Updated");
    }
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === "completed") return task.completed;
    if (filter === "pending") return !task.completed;
    return true;
  });

  return (
    <div className="app-bg">

      <div id="popup"></div>

      <div className="container py-5">

        <div className="card shadow main-card">

          <div className="card-body">

            <h1 className="text-center mb-4">
              Smart To-Do Manager
            </h1>

            <div className="input-group mb-4">

              <input
                type="text"
                className="form-control"
                placeholder="Enter Task"
                value={taskText}
                onChange={(e) =>
                  setTaskText(e.target.value)
                }
              />

              <button
                className="btn btn-primary"
                onClick={handleAddTask}
              >
                Add
              </button>

            </div>

            <div className="text-center mb-4">

              <button
                className="btn btn-dark mx-1"
                onClick={() => setFilter("all")}
              >
                All
              </button>

              <button
                className="btn btn-success mx-1"
                onClick={() =>
                  setFilter("completed")
                }
              >
                Completed
              </button>

              <button
                className="btn btn-warning mx-1"
                onClick={() =>
                  setFilter("pending")
                }
              >
                Pending
              </button>

            </div>

            {filteredTasks.map((task) => (

              <div
                className="task-item"
                key={task.id}
              >

                <span
                  className={
                    task.completed
                      ? "completed"
                      : ""
                  }
                >
                  {task.text}
                </span>

                <div>

                  <button
                    className="btn btn-success btn-sm mx-1"
                    onClick={() =>
                      dispatch(
                        toggleTask(task.id)
                      )
                    }
                  >
                    Done
                  </button>

                  <button
                    className="btn btn-info btn-sm mx-1 text-white"
                    onClick={() =>
                      handleEdit(task)
                    }
                  >
                    Edit
                  </button>

                  <button
                    className="btn btn-danger btn-sm mx-1"
                    onClick={() => {
                      dispatch(
                        deleteTask(task.id)
                      );
                      showPopup(
                        "Task Deleted"
                      );
                    }}
                  >
                    Delete
                  </button>

                </div>

              </div>

            ))}

          </div>

        </div>

      </div>

    </div>
  );
}

export default App;
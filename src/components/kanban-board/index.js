import React, { Component } from "react";
import "./index.css";

export default class KanbanBoard extends Component {
  constructor(props) {
    super(props);
    // Each task is uniquely identified by its name.
    // Therefore, when you perform any operation on tasks, make sure you pick tasks by names (primary key) instead of any kind of index or any other attribute.
    this.state = {
      tasks: this.props.tasks,
    };
    this.stagesNames = ["Backlog", "To Do", "Ongoing", "Done"];
  }

  render() {
    const { tasks } = this.state;

    let stagesTasks = [];
    for (let i = 0; i < this.stagesNames.length; ++i) {
      stagesTasks.push([]);
    }
    for (let task of tasks) {
      const stageId = task.stage;
      stagesTasks[stageId].push(task);
    }

    const moveRight = (name) => {
      this.setState((state) => {
        let taskys = state.tasks;
        for (let task of taskys) {
          if (task.name === name && task.stage < stagesTasks.length - 1) {
            return (task.stage = task.stage + 1);
          }
        }
      });
    };

    const moveLeft = (name) => {
      this.setState((state) => {
        let taskys = state.tasks;
        for (let task of taskys) {
          if (task.name === name && task.stage > 0) {
            return (task.stage = task.stage - 1);
          }
        }
      });
    };

    return (
      <div className="mt-20 layout-column justify-content-center align-items-center">
        <div className="mt-50 layout-row">
          {stagesTasks.map((tasks, i) => {
            return (
              <div className="card outlined ml-20 mt-0" key={`${i}`}>
                <div className="card-text">
                  <h4>{this.stagesNames[i]}</h4>
                  <ul className="styled mt-50" data-testid={`stage-${i}`}>
                    {tasks.map((task, index) => {
                      return (
                        <li className="slide-up-fade-in" key={`${i}${index}`}>
                          <div className="li-content layout-row justify-content-between align-items-center">
                            <span
                              data-testid={`${task.name
                                .split(" ")
                                .join("-")}-name`}
                            >
                              {task.name}
                            </span>
                            <div className="icons">
                              <button
                                className={`icon-only x-small mx-2 ${
                                  i === 0 ? "disabled" : null
                                }`}
                                data-testid={`${task.name
                                  .split(" ")
                                  .join("-")}-back`}
                                onClick={() => moveLeft(task.name)}
                                disabled={task.stage === 0}
                              >
                                <i className="material-icons">arrow_back</i>
                              </button>
                              <button
                                className={`icon-only x-small mx-2 ${
                                  i === stagesTasks.length - 1
                                    ? "disabled"
                                    : null
                                }`}
                                data-testid={`${task.name
                                  .split(" ")
                                  .join("-")}-forward`}
                                onClick={() => moveRight(task.name)}
                                disabled={task.stage === stagesTasks.length -1}
                              >
                                <i className="material-icons">arrow_forward</i>
                              </button>
                            </div>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

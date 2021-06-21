function createTask(taskTitle = "", taskDescription = "") {
  return {
    taskTitle: taskTitle,
    taskDescription: taskDescription,
    targetPomodoroCount: 0,
    actualPomodoroCount: 0,
    duration: 0,
    isFinished: false,

    addPomodoro: function () {
      this.pomodoroCount++;
    },
    finishPomodoro: function () {
      this.isFinished = true;
    },
  };
}

export const Task = function () {
  this.taskList = [];
};

Task.prototype.addTask = addTask;
Task.prototype.findTaskByTitle = findTaskByTitle;
Task.prototype.removeTaskByTitle = removeTaskByTitle;
Task.prototype.findTaskIndex = findTaskIndex;
Task.createTask = createTask;

function addTask(task) {
  this.taskList.push(task);
}

function removeTaskByTitle(taskTitle) {
  let index = this.findTaskIndex(taskTitle);
  this.taskList.splice(--index, 1);
}

function findTaskByTitle(taskTitle) {
  return this.taskList.find((task) => task.taskTitle === taskTitle);
}

function findTaskIndex(taskTitle) {
  return this.taskList.findIndex((task) => task.taskTitle === taskTitle);
}

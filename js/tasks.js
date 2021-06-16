export function createTask(taskTitle = "") {
  return {
    taskTitle: taskTitle,
    taskDescription: "",
    estimatedPomodoros: 0,
    duration: 0,
    pomodoroCount: 0,
    isFinished: false,
    addPomodoro: function () {
      this.pomodoroCount++;
    },
  };
}

export function addTask(taskList, task) {
  taskList.push(task);
}

export function removeGivenTask(taskList, taskTitle) {
  let index = findTaskIndex(taskList, taskTitle);
  taskList.splice(--index, 1);
}

export function findTask(taskList, taskTitle) {
  return taskList.find(task => task.taskTitle === taskTitle);
}

export function findTaskIndex(taskList, taskTitle) {
  return taskList.findIndex(task => task.taskTitle === taskTitle);
}

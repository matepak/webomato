export function createTask(taskTitle = "") {
  return {
    taskTitle: taskTitle,
    duration: 0,
    pomodoroCount: 0,
    isFinished: false,
    addPomodoro: function () {
      this.pomodoroCount++;
    },
  };
}

export function addTask(taskList, task) {
  return taskList.push(task);
}

export function findTask(taskList, taskTitle) {
  return taskList.find(task => task.taskTitle === taskTitle);
}

class Task {
  constructor() {
    this.taskList = [];
  }

  static createTask(taskTitle = "", taskDescription = "") {
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

  addTask(task) {
    this.taskList.push(task);
  }

  findTaskByTitle(taskTitle) {
    return this.taskList.find((task) => task.taskTitle === taskTitle);
  }

  findTaskIndex(taskTitle) {
    return this.taskList.findIndex((task) => task.taskTitle === taskTitle);
  }

  removeTaskByTitle(taskTitle) {
    let index = this.findTaskIndex(taskTitle);
    this.taskList.splice(--index, 1);
  }
}

export default Task;

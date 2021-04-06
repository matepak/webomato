const taskList = [];

export function createTask(taskName = "") {
    return {
      taskTitle: taskName,
      duration: 0,
      pomodoroCount: 0,
      isFinished: false,
      addPomodoro: function(){this.pomodoroCount++}
    };
  }

export function addTask(task) {
    taskList.push(task);
  }

export function findTask() {
    return true;
    }
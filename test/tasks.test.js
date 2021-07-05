import Task from "../js/tasks";
describe("Task module", function () {
  describe("Task.createTask()", function () {
    it("When no arguments passed, should return uninitialized task", () => {
      //Arrange
      let uninitializedTask = {
        taskTitle: "",
        taskDescription: "",
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

      //Act
      let createdTask = Task.createTask();

      //Assert
      expect(JSON.stringify(createdTask)).toStrictEqual(
        JSON.stringify(uninitializedTask)
      );
    });

    it("When title and decription passed, returns task with given title and description", () => {
      //Arrange
      let initializedTask = {
        taskTitle: "taskTitle",
        taskDescription: "taskDescription",
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

      //Act
      let task = Task.createTask("taskTitle", "taskDescription");

      //Assert
      expect(JSON.stringify(task)).toStrictEqual(
        JSON.stringify(initializedTask)
      );
    });
  });

  describe("Task handlingg", () => {
    describe("addTask()", () => {
      it("should add one task to the taskList", () => {
        //Arrange
        let pomodoros = new Task();
        let testTask = Task.createTask("testTask");

        //Act
        pomodoros.addTask(testTask);

        //Assert
        expect(pomodoros.taskList.length).toEqual(1);
        expect(pomodoros.findTaskByTitle("testTask").taskTitle).toEqual(
          "testTask"
        );
      });
    });

    describe("findTaskIndex()", () => {
      it("should return task index on the taskList", () => {
        //Arrange
        let pomodoros = new Task();
        let firstTestTask = Task.createTask("firstTestTask");
        let secondTestTask = Task.createTask("secondTestTask");

        //Act
        pomodoros.addTask(firstTestTask);
        pomodoros.addTask(secondTestTask);

        //Assert
        expect(pomodoros.findTaskIndex("firstTestTask")).toBe(0);
        expect(pomodoros.findTaskIndex("secondTestTask")).toBe(1);
        expect(pomodoros.findTaskIndex("thirdTestTask")).toBe(-1); //exclude to own test
      });

      it("should return -1 when task isn't on the list", () => {
        let pomodoros = new Task();

        expect(pomodoros.findTaskIndex("firstTestTask")).toBe(-1);
      });
    });

    describe("findTaskByTitle()", () => {
      it("should find and return task by given title", () => {
        //Arrange
        let pomodoros = new Task();
        let testTask = Task.createTask("firstTestTask");
        pomodoros.addTask(testTask);

        //Act
        let returnedTask = pomodoros.findTaskByTitle("firstTestTask");

        //Assert
        expect(returnedTask.taskTitle).toEqual("firstTestTask");
      });

      it("should return undefined when given task was not found", () => {
        //Arrange
        let pomodoros = new Task();

        //Act
        let returnedTask = pomodoros.findTaskByTitle("firstTestTask");

        //Assert
        expect(returnedTask).toEqual(undefined);
      });
    });
  });

  describe("removeTaskByTitle()", () => {
    it("should remove task by given title", () => {
      //Arrange
      let pomodoros = new Task();
      let testTask = Task.createTask("firstTestTask");
      pomodoros.addTask(testTask);

      //Act
      pomodoros.removeTaskByTitle("firstTestTask");

      //Assert
      expect(pomodoros.findTaskByTitle("firstTestTask")).toBe(undefined);
    });
  });
});

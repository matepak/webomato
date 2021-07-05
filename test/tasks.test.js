import Task from '../js/tasks';

describe('Task module', () => {
  describe('Task.createTask()', () => {
    it('When no arguments passed, should return uninitialized task', () => {
      const uninitializedTask = {
        taskTitle: '',
        taskDescription: '',
        targetPomodoroCount: 0,
        actualPomodoroCount: 0,
        duration: 0,
        isFinished: false,

        addPomodoro() {
          this.pomodoroCount += 1;
        },
        finishPomodoro() {
          this.isFinished = true;
        },
      };

      const createdTask = Task.createTask();
      expect(JSON.stringify(createdTask)).toStrictEqual(
        JSON.stringify(uninitializedTask),
      );
    });

    it('When title and decription passed, returns task with given title and description', () => {
      const initializedTask = {
        taskTitle: 'taskTitle',
        taskDescription: 'taskDescription',
        targetPomodoroCount: 0,
        actualPomodoroCount: 0,
        duration: 0,
        isFinished: false,

        addPomodoro() {
          this.pomodoroCount += 1;
        },
        finishPomodoro() {
          this.isFinished = true;
        },
      };

      const task = Task.createTask('taskTitle', 'taskDescription');
      expect(JSON.stringify(task)).toStrictEqual(
        JSON.stringify(initializedTask),
      );
    });
  });

  describe('Task handlingg', () => {
    describe('addTask()', () => {
      it('should add one task to the taskList', () => {
        const pomodoros = new Task();
        const testTask = Task.createTask('testTask');
        pomodoros.addTask(testTask);
        expect(pomodoros.taskList.length).toEqual(1);
        expect(pomodoros.findTaskByTitle('testTask').taskTitle).toEqual(
          'testTask',
        );
      });
    });

    describe('findTaskIndex()', () => {
      it('should return task index on the taskList', () => {
        const pomodoros = new Task();
        const firstTestTask = Task.createTask('firstTestTask');
        const secondTestTask = Task.createTask('secondTestTask');

        pomodoros.addTask(firstTestTask);
        pomodoros.addTask(secondTestTask);

        expect(pomodoros.findTaskIndex('firstTestTask')).toBe(0);
        expect(pomodoros.findTaskIndex('secondTestTask')).toBe(1);
        expect(pomodoros.findTaskIndex('thirdTestTask')).toBe(-1); // exclude to own test
      });

      it("should return -1 when task isn't on the list", () => {
        const pomodoros = new Task();

        expect(pomodoros.findTaskIndex('firstTestTask')).toBe(-1);
      });
    });

    describe('findTaskByTitle()', () => {
      it('should find and return task by given title', () => {
        const pomodoros = new Task();
        const testTask = Task.createTask('firstTestTask');
        pomodoros.addTask(testTask);

        const returnedTask = pomodoros.findTaskByTitle('firstTestTask');

        expect(returnedTask.taskTitle).toEqual('firstTestTask');
      });

      it('should return undefined when given task was not found', () => {
        const pomodoros = new Task();

        const returnedTask = pomodoros.findTaskByTitle('firstTestTask');

        expect(returnedTask).toEqual(undefined);
      });
    });
  });

  describe('removeTaskByTitle()', () => {
    it('should remove task by given title', () => {
      const pomodoros = new Task();
      const testTask = Task.createTask('firstTestTask');
      pomodoros.addTask(testTask);

      pomodoros.removeTaskByTitle('firstTestTask');

      expect(pomodoros.findTaskByTitle('firstTestTask')).toBe(undefined);
    });
  });
});

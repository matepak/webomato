
import {findTask, findTaskIndex, createTask, addTask, removeGivenTask} from '../js/tasks';

test('creates task object', () => {
    expect(typeof(createTask())).toEqual('object');
    expect(createTask().taskTitle).toEqual('');
});

test('creates task object with given title', () => {
    expect(createTask('taskTitle').taskTitle).toBe('taskTitle');
});

test('adds task to the list', () => {
    const taskList = [];
    let initialTaskListLength = taskList.length;

    addTask(taskList, createTask('testTask'));
    expect(taskList.length).toBeGreaterThanOrEqual(initialTaskListLength);
});

test('returns task index when in the taskList', () => {
    const taskList = [];
    addTask(taskList, createTask('firstTestTask'));
    expect(taskList.some(task => task.taskTitle === 'firstTestTask')).toBeTruthy();
    addTask(taskList, createTask('secondTestTask'));
    expect(taskList.some(task => task.taskTitle === 'secondTestTask')).toBeTruthy();
    expect(findTaskIndex(taskList, 'firstTestTask')).toBe(0);
    expect(findTaskIndex(taskList, 'secondTestTask')).toBe(1);
    expect(findTaskIndex(taskList, 'thirdTestTask')).toBe(-1);
});

test('find and return task by given taskTitle', () => {
    const taskList = [];
    addTask(taskList, createTask('firstTestTask'));
    expect(findTask(taskList, 'firstTestTask').taskTitle).toEqual('firstTestTask');

});

test('remove given task by it title', () => {
    const taskList = [];
    addTask(taskList, createTask('firstTestTask'));
    expect(taskList.some(task => task.taskTitle === 'firstTestTask')).toBeTruthy;
    removeGivenTask(taskList, 'firstTestTask');
    expect(taskList.some(task => task.taskTitle === 'firstTestTask')).toBeFalsy;
});
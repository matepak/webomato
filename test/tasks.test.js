
import {findTask, createTask, addTask} from '../js/tasks';

const taskList = [];


test('creates task object', () => {
    expect(typeof(createTask())).toEqual("object");
    expect(createTask().taskTitle).toEqual("");

});

test('creates task object with given title', () => {
    expect(createTask("taskTitle").taskTitle).toBe("taskTitle");
});

test('adds task to the list', () => {
    expect(addTask(taskList, createTask("testTask"))).toBe(1);

});

test('returns task when in the taskList', () => {
    addTask(taskList, createTask("testTask"));
    expect(findTask(taskList, "testTask").taskTitle).toBe("testTask");
});


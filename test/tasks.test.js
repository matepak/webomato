
import {findTask, createTask} from '../js/tasks';

const taskList = [];


test('creates task object', () => {
    expect(typeof(createTask())).toEqual("object");
    expect(createTask().taskTitle).toEqual("");

});

test('creates task object with given title', () => {
    expect(createTask("taskTitle").taskTitle).toBe("taskTitle");
});

test('returns task when in the taskList', () => {
    expect(findTask()).toBe(true);
});


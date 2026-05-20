// Simple tests for your app
describe('Basic App Tests', () => {

    test('adds 1 + 1 to equal 2', () => {
        expect(1 + 1).toBe(2);
    });

    test('string check', () => {
        expect('todo-app').toContain('todo');
    });

    test('array has item', () => {
        const tasks = ['task1', 'task2'];
        expect(tasks.length).toBe(2);
    });

});

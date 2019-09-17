import { disposableReaction } from './reaction';

test('disposableReaction', () => {
  const action = jest.fn();
  const disposer = jest.fn();
  const reaction = disposableReaction('test', () => {
    action();
    return disposer;
  });
  expect(action.mock.calls.length).toBe(0);
  expect(disposer.mock.calls.length).toBe(0);
  reaction.start();
  expect(action.mock.calls.length).toBe(1);
  expect(disposer.mock.calls.length).toBe(0);
  reaction.start();
  expect(action.mock.calls.length).toBe(1);
  expect(disposer.mock.calls.length).toBe(0);
  reaction.stop();
  expect(action.mock.calls.length).toBe(1);
  expect(disposer.mock.calls.length).toBe(1);
  reaction.stop();
  expect(action.mock.calls.length).toBe(1);
  expect(disposer.mock.calls.length).toBe(1);
  reaction.start();
  expect(action.mock.calls.length).toBe(2);
  expect(disposer.mock.calls.length).toBe(1);
  reaction.start();
  expect(action.mock.calls.length).toBe(2);
  expect(disposer.mock.calls.length).toBe(1);
  reaction.stop();
  expect(action.mock.calls.length).toBe(2);
  expect(disposer.mock.calls.length).toBe(2);
});

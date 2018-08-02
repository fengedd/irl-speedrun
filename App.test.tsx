import * as React from 'react';
import App from './App';
import * as renderer from 'react-test-renderer';
import TimerStore from './data/TimerStore';
import TimerStoreState from './data/TimerStoreState';
import { ComparisonView } from './misc/ViewTypes';
import TimerActionTypes from './data/TimerActionTypes';
import Timer from './data/Timer';

it('renders without crashing', () => {
  const rendered = renderer.create(<App />).toJSON();
  expect(rendered).toBeTruthy();
});

describe('TimerStore', () => {
  let state: TimerStoreState;
  let dispatch: (action: any) => void;

  beforeEach(() => {
    state = TimerStore.getInitialState();
    dispatch = (action: any) => {
      state = TimerStore.reduce(state, action);
    };
  });

  it('Sanity test', () => {
    expect(state).toEqual(state);
  });

  it('Default state', () => {
    expect(state.view).toEqual(ComparisonView.expected);
    expect(state.currTimerIndex).toEqual(-1);
  });

  it('Change view', () => {
    expect(state.view).toEqual(ComparisonView.expected);
    dispatch({ type: TimerActionTypes.CHANGE_VIEW });
    expect(state.view).toEqual(ComparisonView.avg);
    dispatch({ type: TimerActionTypes.CHANGE_VIEW });
    expect(state.view).toEqual(ComparisonView.best);
    dispatch({ type: TimerActionTypes.CHANGE_VIEW });
    expect(state.view).toEqual(ComparisonView.expected);
  });



  describe('reset', () => {
    beforeEach(() => {
      const timers = [['Test1', new Timer('Test1', 10, 32, true, true, 50, 30, 31, 3, 10, [])]];
      state.timers = new Map(timers);
    });

    it('normalReset', () => {
      dispatch({
        type: TimerActionTypes.RESET
      });
      const timer: Timer = state.timers.get('Test1');
      expect(timer.segmentTime).toEqual(0);
      expect(timer.id).toEqual('Test1');
      expect(timer.expected).toEqual(10);
      expect(timer.attempts).toEqual(4);
      expect(timer.avg).toEqual(45.5);
      expect(timer.best).toEqual(30);
      expect(timer.activated).toBeFalsy();
      expect(timer.active).toBeFalsy();
    });

    it('skipped inactivated reset', () => {
      const timers = [['Test1', new Timer('Test1', 10, 1, false, false, 50, 30, 31, 3, 10, [])]];
      state.timers = new Map(timers);
      dispatch({
        type: TimerActionTypes.RESET
      });
      const timer: Timer = state.timers.get('Test1');
      expect(timer.segmentTime).toEqual(1);
      expect(timer.id).toEqual('Test1');
      expect(timer.expected).toEqual(10);
      expect(timer.attempts).toEqual(3);
      expect(timer.avg).toEqual(50);
      expect(timer.best).toEqual(30);
      expect(timer.activated).toBeFalsy();
      expect(timer.active).toBeFalsy();
    });

    it('reset with best time', () => {
      const timers = [['Test1', new Timer('Test1', 10, 1, true, true, 50, 30, 31, 3, 10, [])]];
      state.timers = new Map(timers);
      dispatch({
        type: TimerActionTypes.RESET
      });
      const timer: Timer = state.timers.get('Test1');
      expect(timer.segmentTime).toEqual(0);
      expect(timer.id).toEqual('Test1');
      expect(timer.expected).toEqual(10);
      expect(timer.attempts).toEqual(4);
      expect(timer.avg).toEqual(37.75);
      expect(timer.best).toEqual(1);
      expect(timer.activated).toBeFalsy();
      expect(timer.active).toBeFalsy();
    });
  });

  describe('timerAdd', () => {
    it('Add item success', () => {
      dispatch({
        type: TimerActionTypes.TIMER_ADD,
        id: 'Test1',
        expected: 1
      });

      expect(state.timers.has('Test1')).toEqual(true);
    });

    it('Add item fail ID too long > 14 chars', () => {
      dispatch({
        type: TimerActionTypes.TIMER_ADD,
        id: '01234567891234',
        expected: 1
      });

      expect(state.timers.has('012345678901234')).toEqual(false);
    });

    it('Add item fail ID too short < 1 chars', () => {
      dispatch({
        type: TimerActionTypes.TIMER_ADD,
        id: '',
        expected: 1
      });

      expect(state.timers.has('')).toEqual(false);
    });

    it('Add item fail no expected time', () => {
      dispatch({
        type: TimerActionTypes.TIMER_ADD,
        id: 'Test1',
        expected: undefined
      });

      expect(state.timers.has('Test1')).toEqual(false);
    });
  });

  describe('currTimerIncDec', () => {

    it('currTimerIncrement success', () => {
      dispatch({
        type: TimerActionTypes.CURR_TIMER_INDEX_INCREMENT
      });

      expect(state.currTimerIndex).toEqual(0);
    });

    it('currTimerDecrement success', () => {
      dispatch({
        type: TimerActionTypes.CURR_TIMER_INDEX_DECREMENT
      });

      expect(state.currTimerIndex).toEqual(-2);
    });
  });

  describe('active/activate/deactivate/swap/delete/comparisonTime', () => {
    beforeEach(() => {
      dispatch({
        type: TimerActionTypes.TIMER_ADD,
        id: 'Test1',
        expected: 1
      });

      dispatch({
        type: TimerActionTypes.TIMER_ADD,
        id: 'Test2',
        expected: 2
      });

      dispatch({
        type: TimerActionTypes.TIMER_ADD,
        id: 'Test3',
        expected: 3
      });

      dispatch({
        type: TimerActionTypes.TIMER_ADD,
        id: 'Test4',
        expected: 4
      });
    });

    it('currTimerActivate index 0', () => {
      dispatch({ type: TimerActionTypes.CURR_TIMER_INDEX_INCREMENT });
      dispatch({ type: TimerActionTypes.CURR_TIMER_ACTIVATE });
      expect(state.currTimerIndex).toEqual(0);
      expect(state.timers.get('Test1').activated).toEqual(true);
      expect(state.timers.get('Test1').active).toEqual(true);
      expect(state.timers.get('Test2').activated).toEqual(false);
      expect(state.timers.get('Test2').active).toEqual(false);
      expect(state.timers.get('Test3').activated).toEqual(false);
      expect(state.timers.get('Test3').active).toEqual(false);
      expect(state.timers.get('Test4').activated).toEqual(false);
      expect(state.timers.get('Test4').active).toEqual(false);
    });

    it('currTimerSetInactive index 0', () => {
      dispatch({ type: TimerActionTypes.CURR_TIMER_INDEX_INCREMENT });
      dispatch({ type: TimerActionTypes.CURR_TIMER_ACTIVATE });
      dispatch({ type: TimerActionTypes.CURR_TIMER_SET_INACTIVE });
      expect(state.currTimerIndex).toEqual(0);
      expect(state.timers.get('Test1').activated).toEqual(true);
      expect(state.timers.get('Test1').active).toEqual(false);
    });

    it('currTimerDeActivate index 0', () => {
      dispatch({ type: TimerActionTypes.CURR_TIMER_INDEX_INCREMENT });
      dispatch({ type: TimerActionTypes.CURR_TIMER_ACTIVATE });
      dispatch({ type: TimerActionTypes.CURR_TIMER_DEACTIVATE });
      expect(state.currTimerIndex).toEqual(0);
      expect(state.timers.get('Test1').activated).toEqual(false);
      expect(state.timers.get('Test1').active).toEqual(false);
    });

    it('timerIncTime', () => {
      dispatch({ type: TimerActionTypes.TIMER_INCREMENT_TIME, id: 'Test1' });
      expect(state.timers.get('Test1').segmentTime).toEqual(1);
    });

    it('swapDown Success', () => {
      dispatch({ type: TimerActionTypes.TIMER_SWAP_DOWN, id: 'Test1' });
      const timers = Array.from(state.timers.entries());
      expect(timers[0][1]).toEqual(state.timers.get('Test2'));
      expect(timers[1][1]).toEqual(state.timers.get('Test1'));
    });

    it('swapUp Success', () => {
      dispatch({ type: TimerActionTypes.TIMER_SWAP_UP, id: 'Test2' });
      const timers = Array.from(state.timers.entries());
      expect(timers[0][1]).toEqual(state.timers.get('Test2'));
      expect(timers[1][1]).toEqual(state.timers.get('Test1'));
    });

    it('swap up out of bounds fail', () => {
      dispatch({ type: TimerActionTypes.TIMER_SWAP_UP, id: 'Test1' });
      const timers = Array.from(state.timers.entries());
      expect(timers[0][1]).toEqual(state.timers.get('Test1'));
    });

    it('swap down out of bounds fail', () => {
      dispatch({ type: TimerActionTypes.TIMER_SWAP_DOWN, id: 'Test4' });
      const timers = Array.from(state.timers.entries());
      expect(timers[3][1]).toEqual(state.timers.get('Test4'));
    });

    it('delete success', () => {
      dispatch({ type: TimerActionTypes.TIMER_DELETE, id: 'Test1' });
      expect(state.timers.get('Test1')).toBeUndefined();
    });

    it('delete fail', () => {
      dispatch({ type: TimerActionTypes.TIMER_DELETE, id: 'TestNotExist' });
      expect(state.timers.size).toEqual(4);
    });

    it('comparisonTimeSet', () => {
      dispatch({ type: TimerActionTypes.TOTAL_COMPARISON_TIME_SET });
      expect(state.timers.get('Test1').comparisonTime).toEqual(1);
      expect(state.timers.get('Test2').comparisonTime).toEqual(3);
      expect(state.timers.get('Test3').comparisonTime).toEqual(6);
      expect(state.timers.get('Test4').comparisonTime).toEqual(10);
    });
  });
}
);



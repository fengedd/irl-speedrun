import TimerActionTypes from './TimerActionTypes';
import Dispatcher from './Dispatcher';

const TimerActions = {
    
    currTimerIndexIncrement() {
        Dispatcher.dispatch({
            type: TimerActionTypes.CURR_TIMER_INDEX_INCREMENT
        });
    },
    currTimerIndexDecrement() {
        Dispatcher.dispatch({
            type: TimerActionTypes.CURR_TIMER_INDEX_DECREMENT
        });
    },

    currTimerDeactivate() {
        Dispatcher.dispatch({
            type: TimerActionTypes.CURR_TIMER_DEACTIVATE
        });
    },

    currTimerSetInactive() {
        Dispatcher.dispatch({
            type: TimerActionTypes.CURR_TIMER_SET_INACTIVE
        });
    },

    currTimerActivate() {
        Dispatcher.dispatch({
            type: TimerActionTypes.CURR_TIMER_ACTIVATE
        });
    },

    timerIncrementTime(id: String) {
        Dispatcher.dispatch({
            type: TimerActionTypes.TIMER_INCREMENT_TIME, id
        });
    },

    timerUpdateStats(id: String, segmentTime: number) {
        Dispatcher.dispatch({
            type: TimerActionTypes.TIMER_UPDATE_STATS, id, segmentTime
        });
    },

    timerAdd(id: String, expected: number) {
        Dispatcher.dispatch({
            type: TimerActionTypes.TIMER_ADD,
            id, expected
        });
    },

    timerSwapUp(id: String) {
        Dispatcher.dispatch({
            type: TimerActionTypes.TIMER_SWAP_UP,
            id
        });
    },

    timerSwapDown(id: String) {
        Dispatcher.dispatch({
            type: TimerActionTypes.TIMER_SWAP_DOWN,
            id
        });
    },

    timerDelete(id: String) {
        Dispatcher.dispatch({
            type: TimerActionTypes.TIMER_DELETE,
            id
        });
    },

    reset() {
        Dispatcher.dispatch({
            type: TimerActionTypes.RESET
        });
    },

    totalComparisonTimeSet() {
        Dispatcher.dispatch({
            type: TimerActionTypes.TOTAL_COMPARISON_TIME_SET
        });
    },

    changeView() {
        Dispatcher.dispatch({
            type: TimerActionTypes.CHANGE_VIEW
        });
    },

    loadTimers(timers: string) {
        Dispatcher.dispatch({
            type: TimerActionTypes.LOAD_TIMERS, timers: timers
        });
    }
};

export default TimerActions;
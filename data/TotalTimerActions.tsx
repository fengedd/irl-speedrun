import TotalTimerActionTypes from './TotalTimerActionTypes';
import Dispatcher from './Dispatcher';

const TotalTimerActions: void = {
    pause() {
        Dispatcher.dispatch({
            type: TotalTimerActionTypes.PAUSE
        });
    },
    start() {
        Dispatcher.dispatch({
            type: TotalTimerActionTypes.START
        });
    },
    reset() {
        Dispatcher.dispatch({
            type: TotalTimerActionTypes.RESET
        });
    },
    increment() {
        Dispatcher.dispatch({
            type: TotalTimerActionTypes.INCREMENT
        });
    }
};

export default TotalTimerActions;
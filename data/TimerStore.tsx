import { AsyncStorage } from 'react-native';
import { ReduceStore } from 'flux/utils';
import TimerActionTypes from './TimerActionTypes';
import Dispatcher from './Dispatcher';
import Timer from './Timer';
import TimerStoreState from './TimerStoreState';
import { ComparisonView } from '../misc/ViewTypes';

class TimerStore extends ReduceStore<any, any> {
    constructor() {
        super(Dispatcher);
    }

    getInitialState() {
        return new TimerStoreState();
    }

    reduce(state: TimerStoreState, action) {
        switch (action.type) {
            case TimerActionTypes.CURR_TIMER_INDEX_DECREMENT:
                return this._currTimerDecrement(state);
            case TimerActionTypes.CURR_TIMER_INDEX_INCREMENT:
                return this._currTimerIncrement(state);
            case TimerActionTypes.CURR_TIMER_ACTIVATE:
                return this._currTimerActivate(state);
            case TimerActionTypes.CURR_TIMER_DEACTIVATE:
                return this._currTimerDeactivate(state);
            case TimerActionTypes.CURR_TIMER_SET_INACTIVE:
                return this._currTimerSetInactive(state);
            case TimerActionTypes.TIMER_ADD:
                return this._timerAdd(state, action);
            case TimerActionTypes.TIMER_DELETE:
                return this._timerDelete(state, action);
            case TimerActionTypes.TIMER_UPDATE_STATS:
                return this._timerUpdateStats(state);
            case TimerActionTypes.TIMER_INCREMENT_TIME:
                return this._timerIncrementTime(state, action);
            case TimerActionTypes.TIMER_SWAP_UP:
                return this._swap(state, action, true);
            case TimerActionTypes.TIMER_SWAP_DOWN:
                return this._swap(state, action, false);
            case TimerActionTypes.CHANGE_VIEW:
                return this._changeView(state);
            case TimerActionTypes.RESET:
                return this._reset(state);
            case TimerActionTypes.TOTAL_COMPARISON_TIME_SET:
                return this._totalComparisonTimeSet(state);
            case TimerActionTypes.LOAD_TIMERS:
                return this._loadTimers(state, action);
            default:
                return state;
        }
    }

    public get getView(): ComparisonView {
        return this.getState().view;
    }

    public get getTimersLength(): number {
        return this.getState().timers.size;
    }

    public get getCurrIndex(): number {
        return this.getState().currTimerIndex;
    }

    public get getTimers(): Timer[] {
        console.log('getTimers');
        return Array.from(this.getState().timers.values());
    }

    public timerGetTime(id: String): number {
        return this.getState().timers.get(id).segmentTime;
    }

    public get getTotalComparisonTime(): number {
        return this.getState().totalComparisonTime;
    }

    private _changeView(state: TimerStoreState): any {
        const currView = state.view;
        switch (currView) {
            case ComparisonView.avg:
                return new TimerStoreState(state.timers, ComparisonView.best, this.getCurrIndex);
            case ComparisonView.best:
                return new TimerStoreState(state.timers, ComparisonView.expected, this.getCurrIndex);
            case ComparisonView.expected:
                return new TimerStoreState(state.timers, ComparisonView.avg, this.getCurrIndex);
            default: return state;
        }
    }

    private _timerDelete(state: TimerStoreState, action: any): any {
        state.timers.delete(action.id);
        AsyncStorage.setItem('timers', JSON.stringify(Array.from(state.timers.entries())));
        return new TimerStoreState(state.timers, this.getView, this.getCurrIndex);
    }

    private _totalComparisonTimeSet(state: TimerStoreState) {
        let totalComparisonTime = 0;
        const entries = Array.from(state.timers.entries()).map((tuple) => {
            const key = tuple[0];
            const timer = tuple[1];
            if (!timer[this.getView]) {
                timer.comparisonTime = totalComparisonTime + timer.expected;
                totalComparisonTime = timer.comparisonTime;
                return [key, timer];
                throw new Error('Undefined timer view');
            } else {
                timer.comparisonTime = totalComparisonTime + timer[this.getView];
                totalComparisonTime = timer.comparisonTime;
                return [key, timer];
            }
        });
        return new TimerStoreState(new Map<String, Timer>(entries), this.getView, this.getCurrIndex);
    }

    private _swap(state: TimerStoreState, action: any, isSwapUp: boolean): TimerStoreState {
        const id = action.id;
        const indexOfID = Array.from(state.timers.keys()).findIndex((v) => id === v);
        const indexOfswapee = isSwapUp ? indexOfID - 1 : indexOfID + 1;
        const isOutOfBoundsSwap: boolean = indexOfswapee < 0 || indexOfswapee > state.timers.size - 1;
        if (isOutOfBoundsSwap) {
            return state;
        } else {
            const entries = Array.from(state.timers.entries());
            const temp = entries[indexOfID];
            entries[indexOfID] = entries[indexOfswapee];
            entries[indexOfswapee] = temp;
            return new TimerStoreState(new Map<String, Timer>(entries), this.getView, this.getCurrIndex);
        }
    }

    private _currTimerDeactivate(state: TimerStoreState): TimerStoreState {
        // TODO emit change?
        const key = Array.from(state.timers.keys()).find((value, index) => index === state.currTimerIndex);
        if (!key) throw new Error('cannot deactivate currTimer');
        const timer = state.timers.get(key);
        if (!timer) throw new Error('currTimerDeactivate, cannot find timer');
        timer.activated = false;
        timer.active = false;
        timer.segmentTime = 0;
        return state;
    }

    private _timerIncrementTime(state: TimerStoreState, action) {
        const id = action.id;
        const timer = state.timers.get(id);
        timer.segmentTime++;
        return state;
    }

    private _currTimerSetInactive(state: TimerStoreState) {
        const currTimerKey: String | undefined = Array.from(state.timers.keys()).find((value, index) => index === state.currTimerIndex);
        if (!currTimerKey) return state;
        const currTimer: Timer | undefined = state.timers.get(currTimerKey);
        if (!currTimer) return state;

        const isEndOfSplit: boolean = currTimer.active === true;
        if (!isEndOfSplit) {
            return state;
        } else {
            currTimer.active = false;
            return state;
        }
    }

    private _currTimerActivate(state: TimerStoreState) {
        const currTimerKey: String | undefined = Array.from(state.timers.keys()).find((value, index) => index === state.currTimerIndex);

        if (!currTimerKey) return state;
        const currTimer: Timer | undefined = state.timers.get(currTimerKey);

        if (!currTimer) return state;
        const isFirstActivation: boolean = currTimer.activated === false;

        if (isFirstActivation) {
            currTimer.segmentTime = 0;
            currTimer.active = true;
            currTimer.activated = true;
        } else {
            currTimer.active = true;
        }
        return state;
    }

    private _currTimerDecrement(state: TimerStoreState) {
        return new TimerStoreState(state.timers, this.getView, this.getCurrIndex - 1);
    }

    private _currTimerIncrement(state: TimerStoreState) {
        return new TimerStoreState(state.timers, this.getView, this.getCurrIndex + 1);
    }

    private _timerAdd(state: TimerStoreState, action) {
        const idIsNotUnique = state.timers.has(action.id);
        if (idIsNotUnique) {
            throw new Error('ID is not unique, cannot add.');
        } else {
            if (!action.id || !action.expected) return state;
            state.timers.set(action.id, new Timer(action.id, action.expected));
            AsyncStorage.setItem('timers', JSON.stringify(Array.from(state.timers.entries())));
            return new TimerStoreState(state.timers, this.getView, this.getCurrIndex);
        }
    }

    private _reset(state: TimerStoreState) {
        const timerMap: Map<String, Timer> = this._timerUpdateStats(state);
        AsyncStorage.setItem('timers', JSON.stringify(Array.from(timerMap.entries())));
        console.log(JSON.stringify(Array.from(timerMap.entries())));
        return new TimerStoreState(timerMap, this.getView, -1);
    }

    private _timerUpdateStats(state: TimerStoreState): Map<String, Timer> {
        const entries = Array.from(state.timers.entries()).map((entry: any) => {
            const key: String = entry[0];
            const timer: Timer = entry[1];
            const resultTimer: Timer = new Timer(timer.id, timer.expected);
            if (timer.activated) {
                resultTimer.attempts = timer.attempts + 1;
                resultTimer.avg = timer.avg === undefined ?
                    timer.segmentTime : ((timer.attempts * timer.avg) + timer.segmentTime) / (timer.attempts + 1);
                resultTimer.best = timer.best === undefined ?
                    timer.segmentTime : timer.segmentTime < timer.best ? timer.segmentTime : timer.best;
                // TODO PERSONAL and RUNS
                return [key, resultTimer];
            } else {
                return [key, timer];
            }
        });

        return new Map<String, Timer>(entries);
    }

    private _loadTimers(state: TimerStoreState, action: any) {
        const entries = JSON.parse(action.timers);
        entries.map((x: any) => {
            let obj = x[1];
            x[1] = new Timer(obj.id, obj.expected, obj.segmentTime,
                obj.active, obj.activated, obj.avg, obj.best, obj.personal, obj.attemps, obj.comparisonTime, obj.runs);
            return x;
        });
        const map = new Map<String, Timer>(entries);
        return new TimerStoreState(map, ComparisonView.expected, -1);

    }
}

export default new TimerStore();
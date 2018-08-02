import Immutable from 'immutable';
import { ReduceStore } from 'flux/utils';
import TotalTimerActionTypes from './TotalTimerActionTypes';
import TotalTimerActions from './TotalTimerActions';
import Dispatcher from './Dispatcher';
import TotalTimer from './TotalTimer';

class TotalTimerStore extends ReduceStore<TotalTimer, any> {
    constructor() {
        super(Dispatcher);
    }

    getInitialState(): any {
        return new TotalTimer();
    }

    reduce(state: TotalTimer, action): TotalTimer {
        switch (action.type) {
            case TotalTimerActionTypes.PAUSE:
                return this.pause(state, action);
            case TotalTimerActionTypes.START:
                return this.start(state, action);
            case TotalTimerActionTypes.RESET:
                return this.reset(state, action);
            case TotalTimerActionTypes.INCREMENT:
                return this.increment(state, action);
            default:
                return state;
        }
    }

    public get getGlobalActive(): boolean {
        return this.getState().globalActive;
    }

    public get getTime(): number {
        return this.getState().time;
    }

    private pause(state, action) {
        return new TotalTimer(this.getTime, false);
    }

    private start(state, action) {
        return new TotalTimer(this.getTime, true);
    }

    private reset(state, action) {
        return new TotalTimer();
    }

    private increment(state, action) {
        return new TotalTimer(this.getTime + 1, this.getGlobalActive);
    }
}

export default new TotalTimerStore();
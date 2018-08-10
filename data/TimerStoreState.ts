import {ComparisonView} from '../misc/ViewTypes';
import Timer from './Timer';
export default class TimerStoreState {

    public view: ComparisonView;

    public currTimerIndex: number;

    public timers: Map<String, Timer>;
    public totalComparisonTime: number;

    public constructor(timers?: Map<String, Timer>, view?: ComparisonView, currTimerIndex?: number, totalComparisonTime?: number) {
        this.timers = timers === undefined ? new Map<String, Timer>() : timers;
        this.view = view === undefined ? ComparisonView.expected : view;
        this.currTimerIndex = currTimerIndex === undefined ? -1 : currTimerIndex;
        this.totalComparisonTime = totalComparisonTime === undefined ? 0 : totalComparisonTime;
    }
}

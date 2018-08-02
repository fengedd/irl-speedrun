import * as React from 'react';
import Timer from '../components/Timer';
import TimerStore from '../data/TimerStore';
import TimerActions from '../data/TimerActions';
import { Container } from 'flux/utils';
import TotalTimerStore from '../data/TotalTimerStore';
import { secondsToDisplayedTime } from '../misc/utility';
import { DisplayedTime } from '../misc/types';
import { ComparisonView } from '../misc/ViewTypes';
import { __values } from '../node_modules/tslib';

type Props = {
    segmentTime: number;
    active: boolean;
    activated: boolean;
    id: string;
    avg: number | undefined;
    best: number;
    personal: number | undefined;
    expected: number;
    attempts: number;
    runs: any[];
    comparisonTime: number;
};

type State = {
    index: number;
    segmentTime: number;
    differenceTime: number;
    displayedDifferenceTime: DisplayedTime | undefined;
    globalActive: boolean;
    comparisonView: ComparisonView | undefined;
    segmentTimeInterval: NodeJS.Timer;
    goldSplit: boolean;
    greenSplit: boolean;
    notAnActiveRun: boolean;
    displayedComparisonTime: DisplayedTime | undefined;

};

class TimerContainer extends React.Component<Props, State> {
    static getStores() {
        return [TimerStore, TotalTimerStore];
    }

    static calculateState(prevState: State, props: Props) {
        const segmentTime: number = TimerStore.timerGetTime(props.id);
        const differenceTime: number =
            props.active ? TotalTimerStore.getTime - props.comparisonTime :
                (prevState ? prevState.differenceTime : 0);
        const index = TimerStore.getTimers.findIndex((value) => value.id === props.id );
        return {
            index: index,
            segmentTime: segmentTime,
            differenceTime: differenceTime,
            displayedDifferenceTime: secondsToDisplayedTime(differenceTime),
            globalActive: TotalTimerStore.getGlobalActive,
            comparisonView: TimerStore.getView,
            goldSplit: segmentTime < props.best,
            greenSplit: differenceTime < 0,
            notAnActiveRun: TotalTimerStore.getTime === 0,
            displayedComparisonTime: secondsToDisplayedTime(props.comparisonTime, true)
        };
    }

    constructor(props: any) {
        super(props);
        this.state = {
            index: -1,
            segmentTime: 0,
            differenceTime: 0,
            displayedDifferenceTime: undefined,
            globalActive: false,
            comparisonView: undefined,
            segmentTimeInterval: setInterval(this._segmentTimeTick, 1000),
            goldSplit: false,
            greenSplit: false,
            notAnActiveRun: false,
            displayedComparisonTime: undefined
        };
    }

    public render(): JSX.Element {
        return (
            <Timer
                id={this.props.id}
                index={this.state.index}
                active={this.props.active}
                activated={this.props.activated}
                differenceTime={this.state.differenceTime}
                displayedDifferenceTime={this.state.displayedDifferenceTime}
                comparisonTime={this.state.displayedComparisonTime}
                displayedComparisonTime={this.state.displayedComparisonTime}
                goldSplit={this.state.goldSplit}
                greenSplit={this.state.greenSplit}
                swapUp={this.swapUp}
                swapDown={this.swapDown}
                delete={this.delete}
                globalActive={this.state.globalActive}
            />
        );
    }

    public delete = () => {
        TimerActions.timerDelete(this.props.id);
    }

    public componentWillUnmount(): void {
        clearInterval(this.state.segmentTimeInterval);
    }

    public swapUp: () => void = () => {
        const runNotActive: boolean = this.state.notAnActiveRun;
        if (runNotActive) {
            TimerActions.timerSwapUp(this.props.id);
            TimerActions.totalComparisonTimeSet();
        } else {
            return;
        }
    }

    public swapDown: () => void = () => {
        const runNotActive: boolean = this.state.notAnActiveRun;
        if (runNotActive) {
            TimerActions.timerSwapDown(this.props.id);
            TimerActions.totalComparisonTimeSet();
        } else {
            return;
        }
    }

    private _segmentTimeTick: () => void = () => {
        const timerShouldTick: boolean = this.props.active === true && this.state.globalActive === true && this.props.activated === true;
        if (timerShouldTick) {
            TimerActions.timerIncrementTime(this.props.id);
        } else {
            return;
        }
    }
}

const container = Container.create(TimerContainer, { withProps: true });
export default container;
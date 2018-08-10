
import React from 'react';
import TotalTimerStore from '../data/TotalTimerStore';
import FooterBar from '../components/FooterBar';
import TotalTimerActions from '../data/TotalTimerActions';
import TimerStore from '../data/TimerStore';
import TimerActions from '../data/TimerActions';
import { Container } from 'flux/utils';
import { FooterBarView } from '../misc/ViewTypes';

type Props = {
    stopStart: () => void,
    undo: () => void,
    skip: () => void,
    split: () => void,
    view: () => void
};

type State = {
    globalActive: boolean,
    currTimerIndex: number,
    lengthOfTimers: number,
    view: FooterBarView
};

class FooterBarContainer extends React.Component<Props, State> {
    static getStores() {
        return [TotalTimerStore, TimerStore];
    }

    static calculateState(prevState: State) {
        return {
            globalActive: TotalTimerStore.getGlobalActive,
            currTimerIndex: TimerStore.getCurrIndex,
            lengthOfTimers: TimerStore.getTimersLength,
            view: TimerStore.getCurrIndex === -1
                ? FooterBarView.start : (TimerStore.getCurrIndex >= TimerStore.getTimersLength)
                    ? FooterBarView.reset : FooterBarView.normal
        };
    }

    constructor(props: Props) {
        super(props);
    }

    public render(): JSX.Element {
        return (
            <FooterBar stopStart={this.stopStart} undo={this.undo} skip={this.skip} split={this.split} view={this.state.view} />
        );
    }

    public skip = () => {
        if (!this._isGlobalActive()) return;
        const currTimerIndex: number = this.state.currTimerIndex;
        const isUnskippable: boolean = currTimerIndex >= this.state.lengthOfTimers - 1;
        if (isUnskippable) {
            return;
        } else {
            TimerActions.currTimerDeactivate();
            TimerActions.currTimerIndexIncrement();
            this._currTimerActivate();
        }
    }

    public stopStart = () => {
        const noTimers: boolean = this.state.lengthOfTimers <= 0;
        if (noTimers) return;
        const globalActive: boolean = this.state.globalActive;
        const isFirstStart: boolean = !globalActive && (this.state.currTimerIndex < 0);
        if (isFirstStart) {
            TotalTimerActions.start();
            TimerActions.currTimerIndexIncrement();
            this.split();
        } else if (globalActive) {
            TotalTimerActions.pause();
        } else {
            TotalTimerActions.start();
        }
    }

    public split = () => {
        const isEndOfRun: boolean = this.state.currTimerIndex === this.state.lengthOfTimers - 1;
        const shouldResetRun: boolean = this.state.currTimerIndex > this.state.lengthOfTimers - 1;
        if (isEndOfRun) {
            this._endRun();
        } else if (shouldResetRun) {
            this._resetRun();
        } else {
            this._currTimerSetInactive();
            this._currTimerActivate();
        }
    }

    public undo = () => {
        if (!this._isGlobalActive()) return;
        const canUndo: boolean = 0 < this.state.currTimerIndex;
        if (canUndo) {
            TimerActions.currTimerDeactivate();
            TimerActions.currTimerIndexDecrement();
            TimerActions.currTimerActivate();
        } else {
            return;
        }
    }

    private _currTimerSetInactive() {
        if (!this._isGlobalActive()) return;
        const currTimerExists: boolean = this.state.currTimerIndex >= 0;
        if (currTimerExists) {
            TimerActions.currTimerSetInactive();
            TimerActions.currTimerIndexIncrement();
        }
    }

    private _currTimerActivate() {
        const currTimerExists: boolean = this.state.currTimerIndex < this.state.lengthOfTimers;
        if (currTimerExists) {
            TimerActions.currTimerActivate();
        }
    }

    private _resetRun() {
        TotalTimerActions.reset();
        TimerActions.reset();
        TimerActions.totalComparisonTimeSet();
    }

    private _endRun() {
        TotalTimerActions.pause();
        TimerActions.currTimerIndexIncrement();
    }

    private _isGlobalActive() {
        return this.state.globalActive === true;
    }

}

const container = Container.create(FooterBarContainer);
export default container;
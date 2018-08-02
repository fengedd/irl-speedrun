import * as React from 'react';
import TotalTimer from '../components/TotalTimer';
import TotalTimerStore from '../data/TotalTimerStore';
import TotalTimerActions from '../data/TotalTimerActions';
import { Container } from 'flux/utils';

class TotalTimerContainer extends React.Component<any, any> {
    static getStores() {
        return [TotalTimerStore];
    }

    static calculateState(prevState: any) {
        return {
            globalActive: TotalTimerStore.getGlobalActive,
            time: TotalTimerStore.getTime,
            interval: undefined
        };
    }

    constructor(props: any) {
        super(props);
    }

    public render(): JSX.Element {
        return (
            <TotalTimer time={this.state.time}/>
        );
    }

    public componentDidMount(): void {
        this._initiateTick();
    }

    public componentWillUnmount(): void {
        clearInterval(this.state.interval);
    }

    private _tick = () => {
        let totalTimerIsActive: boolean = this.state.globalActive === true;
        if (totalTimerIsActive) {
            TotalTimerActions.increment();
        }
    }

    private _initiateTick(): void {
        this.setState({ interval: setInterval(this._tick, 1000) });
    }
}

const container = Container.create(TotalTimerContainer);
export default container;
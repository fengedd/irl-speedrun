import * as React from 'react';
import TimerContainer from './TimerContainer';
import TimerList from '../components/TimerList';
import TimerStore from '../data/TimerStore';
import { Container } from 'flux/utils';
import Timer from '../data/Timer';
type Props = {
};

type State = {
    timers: Timer[]
};

class TimerListContainer extends React.Component<Props, State> {
    static getStores() {
        return [TimerStore];
    }

    static calculateState(prevState: any) {
        return {
            timers: TimerStore.getTimers
        };
    }

    constructor(props: any) {
        super(props);
    }

    public render(): JSX.Element {
        return (
            <TimerList
                data={this.state.timers}
                renderItem={this.renderItem}
                keyExtractor={this.keyExtractor}
            />
        );
    }

    public keyExtractor(item: any, index: number): string {
        return item.id;
    }

    public renderItem(info: any): JSX.Element {
        const item = info.item;
        return <TimerContainer {...item} />;
    }
}

const container = Container.create(TimerListContainer);
export default container;

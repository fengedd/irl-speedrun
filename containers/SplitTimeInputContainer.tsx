import React from 'react';
import SplitTimeInput from '../components/SplitTimeInput';
import { timeToSeconds } from '../misc/utility';

type Props = {
    expectedTimeCallback: (time: number) => void
};

type State = {
    selectedHour: number,
    selectedMinute: number,
    selectedSecond: number,
};

export default class SplitTimeInputContainer extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.state = {
            selectedHour: 0,
            selectedMinute: 0,
            selectedSecond: 0
        };

    }

    setHour = (hour: number) => {
        this.setState(() => ({
            selectedHour: hour
        }));
        this.props.expectedTimeCallback(timeToSeconds(hour, this.state.selectedMinute, this.state.selectedSecond));
    }

    setMinute = (minute: number) => {
        this.setState(() => ({
            selectedMinute: minute
        }));
        this.props.expectedTimeCallback(timeToSeconds(this.state.selectedHour, minute, this.state.selectedSecond));
    }

    setSecond = (sec: number) => {
        this.setState(() => ({
            selectedSecond: sec
        }));
        this.props.expectedTimeCallback(timeToSeconds(this.state.selectedHour, this.state.selectedMinute, sec));
    }

    render(): JSX.Element {
        return (
            <SplitTimeInput
                selectedHour={this.state.selectedHour}
                selectedMinute={this.state.selectedMinute}
                selectedSecond={this.state.selectedSecond}
                callBackHour={this.setHour}
                callBackMinute={this.setMinute}
                callBackSecond={this.setSecond} />
        );
    }

}
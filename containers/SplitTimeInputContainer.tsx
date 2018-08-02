import React from 'react';
import SplitTimeInput from '../components/SplitTimeInput';
import { timeToSeconds } from '../misc/utility';

type SplitTimeInputContainerState = {
};

type SplitTimeInputContainerProps = {

};

export default class SplitTimeInputContainer extends React.Component<any, any> {
    constructor(props: any) {
        super(props);

        this.state = {
            selectedHour: 0,
            selectedMinute: 0,
            selectedSecond: 0
        };

    }

    setHour(hour: number): void {
        this.setState(() => ({
            selectedHour: hour
        }));
        this.props.expectedTimeCallback(timeToSeconds(hour, this.state.selectedMinute, this.state.selectedSecond));
    }

    setMinute(minute: number): void {
        this.setState(() => ({
            selectedMinute: minute
        }));
        this.props.expectedTimeCallback(timeToSeconds(this.state.selectedHour, minute, this.state.selectedSecond));
    }

    setSecond(sec: number): void {
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
                callBackHour={this.setHour.bind(this)}
                callBackMinute={this.setMinute.bind(this)}
                callBackSecond={this.setSecond.bind(this)} />
        );
    }

}
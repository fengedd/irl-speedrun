import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { secondsToDisplayedTime } from '../misc/utility';

type DisplayedTime = {
    hours: number,
    minutes: number,
    seconds: number
};

type Props = {
    time: number
};
type State = {
    displayedTime: DisplayedTime,
    time: number
};

export default class TotalTimer extends React.Component<Props, State> {
    static getDerivedStateFromProps(nextProps: Props, prevState: State) {
        const shouldUpdateDisplayTime: boolean = nextProps.time !== prevState.time;
        if (shouldUpdateDisplayTime) {
            let newDisplayTime: DisplayedTime = secondsToDisplayedTime(nextProps.time, true);
            return {
                displayedTime: newDisplayTime
            };
        } else {
            return null;
        }
    }

    constructor(props: Props) {
        super(props);
        this.state = {
            displayedTime: secondsToDisplayedTime(this.props.time, true),
            time: 0
        };
    }
    public render() {
        return (
            <View style={styles.main} >
                <Text style={styles.nameText}>
                    Total:
                </Text>
                <Text style={styles.timeText}>
                    {this.state.displayedTime.hours}:
                  {this.state.displayedTime.minutes}:
                  {this.state.displayedTime.seconds}
                </Text>
            </View>
        );
    }
}

const styles: any = StyleSheet.create({
    main: {
        borderTopWidth: 2,
        borderBottomWidth: 2,
        borderColor: '#232323',
        flexDirection: 'column',
        alignItems: 'flex-end'
    },

    nameText: {
        fontWeight: 'bold',
        color: 'white'
    },

    timeText: {
        fontSize: 50,
        fontWeight: 'bold',
        color: 'white'
    }

});
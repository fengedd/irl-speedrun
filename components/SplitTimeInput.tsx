import { StyleSheet, Text, View, Picker } from 'react-native';
import React from 'react';

type Props = {
    callBackHour: (time: number) => void,
    callBackMinute: (time: number) => void,
    callBackSecond: (time: number) => void,
    selectedHour: number,
    selectedMinute: number,
    selectedSecond: number
};

export default class SplitTimeInput extends React.PureComponent<Props> {
    constructor(props: Props) {
        super(props);
    }

    public render(): JSX.Element {
        let pickerHours: JSX.Element[] = [];
        let pickerMinutes: JSX.Element[] = [];
        let pickerSeconds: JSX.Element[] = [];
        this._initializePicker(pickerHours, pickerMinutes, pickerSeconds);
        return (

            <View style={styles.timerInput}>
                <Text style={styles.expectedSplitTimeText}>Expected Time</Text>
                <Picker style={styles.picker}
                    selectedValue={this.props.selectedHour}
                    onValueChange={this._setHour}>
                    {pickerHours}
                </Picker>
                <Text style={styles.text}>hr</Text>

                <Picker style={styles.picker}
                    selectedValue={this.props.selectedMinute}
                    onValueChange={this._setMinute}>
                    {pickerMinutes}
                </Picker>
                <Text style={styles.text}>min</Text>

                <Picker style={styles.picker}
                    selectedValue={this.props.selectedSecond}
                    onValueChange={this._setSecond}>
                    {pickerSeconds}
                </Picker>
                <Text style={styles.text}>sec</Text>
            </View>

        );
    }

    private _initializePicker(pickerHours: JSX.Element[], pickerMinutes: JSX.Element[], pickerSeconds: JSX.Element[]): void {
        for (let minSec = 0; minSec < 60; minSec++) {
            pickerMinutes.push(<Picker.Item color={'white'} key={minSec} value={minSec} label={minSec.toString()} />);
            pickerSeconds.push(<Picker.Item color={'white'} key={minSec} value={minSec} label={minSec.toString()} />);
        }
        for (let hour = 0; hour < 24; hour++) {
            pickerHours.push(<Picker.Item color={'white'} key={hour} value={hour} label={hour.toString()} />);
        }
    }

    private _setHour = (hour: number) => {
        this.props.callBackHour(hour);
    }

    private _setMinute = (minute: number) => {
        this.props.callBackMinute(minute);
    }

    private _setSecond = (sec: number) => {
        this.props.callBackSecond(sec);
    }

}

const styles: any = StyleSheet.create({

    timerInput: {
        // marginTop: 20,
        backgroundColor: '#1A1A1A',
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: 180,
        borderBottomWidth: 3,
        borderColor: '#232323'

    },

    text: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        color: 'white',
        fontWeight: 'bold'

    },

    expectedSplitTimeText: {
        flex: 3,
        justifyContent: 'center',
        alignItems: 'center',
        color: 'white',
        fontWeight: 'bold',
        fontSize: 15

    },

    picker: {
        flex: 1
    }
});

import * as React from 'react';
import {
    StyleSheet, Text, View, TouchableOpacity,
    TextStyle
} from 'react-native';

import { Icon } from 'react-native-material-ui';
import SwipeOut from 'react-native-swipeout';

export default class Timer extends React.PureComponent<any> {

    constructor(props: any) {
        super(props);
    }

    public render() {
        const swapButton = { component: this._renderSwapButton(), disabled: this.props.globalActive };
        const deleteButton = { component: this._renderDeleteButton(), disabled: this.props.globalActive };
        const colorStyle = this.props.active ? styles.mainBlue :
            (this.props.index % 2 === 0 ? styles.mainBlack : styles.mainGrey);

        return (

            <SwipeOut right={[deleteButton]} left={[swapButton]} disabled={this.props.globalActive}  >
                <TouchableOpacity style={colorStyle}>
                    {this._renderNameText()}
                    {this._renderDiffTimeText()}
                    {this._renderCompTimeText()}
                </TouchableOpacity>
            </SwipeOut >

        );
    }

    private _renderSwapButton(): JSX.Element {
        return (
            <View style={styles.splitName}>
                <TouchableOpacity onPress={this.props.swapUp}><Icon name='arrow-drop-up' />></TouchableOpacity>
                <TouchableOpacity onPress={this.props.swapDown}><Icon name='arrow-drop-down' /></TouchableOpacity>
            </View >
        );
    }

    private _renderDeleteButton(): JSX.Element {
        return (
            <TouchableOpacity onPress={this.props.delete}>
                <Icon name='delete' />
            </TouchableOpacity>
        );
    }

    private _renderNameText(): JSX.Element {
        return (
            <View style={styles.splitName}>
                <Text style={styles.nameText}> {this.props.id} </Text>
            </View>
        );
    }

    private _renderCompTimeText(): JSX.Element | null {
        return (
            <View style={styles.time}>
                <Text style={styles.compTimeText}>
                    {this.props.displayedComparisonTime.hours}:
                    {this.props.displayedComparisonTime.minutes}:
                    {this.props.displayedComparisonTime.seconds}
                </Text>
            </View>
        );
    }

    private _renderDiffTimeStyle: () => TextStyle = () => {
        const isGreenSplit = this.props.greenSplit;
        if (isGreenSplit) {
            return styles.greenSplitText;
        } else {
            return styles.redSplitText;
        }
    }

    private _renderDiffTimeText(): JSX.Element | null {
        const isActivated: boolean = this.props.activated;
        if (isActivated) {
            return (
                <View style={styles.time}>
                    <Text style={this._renderDiffTimeStyle()}>
                        {this.props.displayedDifferenceTime.hours}:
                    {this.props.displayedDifferenceTime.minutes}:
                    {this.props.displayedDifferenceTime.seconds}
                    </Text>
                </View>
            );
        } else {
            return (
                <View style={styles.time} />
            );
        }

    }

}

const styles = StyleSheet.create({
    mainGrey: {
        flexDirection: 'row',
        backgroundColor: '#171717',
        height: 50
    },
    mainBlack: {
        flexDirection: 'row',
        backgroundColor: '#0F0F0F',
        height: 50
    },
    mainBlue: {
        flexDirection: 'row',
        backgroundColor: '#1F4A9F',
        height: 50
    },
    splitName: {
        flex: 3,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 5
    },
    time: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center'
    },
    nameText: {
        color: 'white',
        fontSize: 25,
        fontWeight: 'bold'
    },
    goldSplitText: {
        color: 'gold',
        fontWeight: 'bold',
        fontSize: 15
    },
    redSplitText: {
        color: 'red',
        fontWeight: 'bold',
        fontSize: 15
    },
    greenSplitText: {
        color: 'green',
        fontWeight: 'bold',
        fontSize: 15
    },
    compTimeText: {
        color: 'white',
        fontSize: 15,
        fontWeight: 'bold'
    }
});
